/* eslint-disable */
'use strict';
const config = require('./config.js');
const FlowWorker = require('./worker.js');

function ApiFlow (worker) {
    const self = this;

    this.worker = worker ? worker: new FlowWorker(config.libURL);

    this.mode = null;
    this.url = null;
    this.selector = null;

    this.source = null;
    this.target = null;
    this.name = null;

    this.content = null;
    let _contentPromise = null;

    const _queue = [];
    const _vars = [
        'mode',
        'url',
        'text',
        'selector',
        'source',
        'target',
        'name'
    ]
    /* begin internals */
    const _clearModeRelatedValues = function(mode) {
        [ 'url', 'selector', 'text', 'content' ].filter(function(_mode) {
            return mode !== _mode
        }).forEach(function(key) {
            self[key] = null
        })
    }

    const _setObject = function(obj) {
        if (obj.mode) {
            _clearModeRelatedValues(obj.mode)
        }

        for (let key in obj) {
            if (obj.hasOwnProperty(key) && _vars.indexOf(key) > -1) {
                self[key] = obj[key]
            }
        }
    }

    const _setKeyValue = function(key, value) {
        if (key === 'mode') {
            _clearModeRelatedValues(value)
        }

        if (_vars.indexOf(key) > -1) {
            self[key] = value
        }
    }

    const _loadContent = function() {
        self.content = null;
        _contentPromise = null;
        if (self.mode === 'text' && self.text) {
            _contentPromise = new Promise(function(resolve, reject) {
                self.content = self.text
                resolve(self.text)
            })
        }
        else if (self.mode === 'url' && self.url) {
            _contentPromise = new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest()

                const onLoad = function () {
                    if (request.status >= 400) {
                        self.content = null
                        reject(new Error(request.statusText))
                    }
                    else {
                        self.content = request.responseText
                        resolve(self.content)
                    }

                    request.removeEventListener('load', onLoad)
                    request = null
                }

                const onError = function () {
                    self.content = null
                    reject(new Error(request.statusText || 'Unknown Error'))

                    request.removeEventListener('error', onError)
                    request = null
                }

                const onAbort = function () {
                    self.content = null
                    reject(new Error(request.statusText || 'Unknown Error'))

                    request.removeEventListener('abort', onAbort)
                    request = null
                }

                request.addEventListener('load', onLoad)
                request.addEventListener('error', onError)
                request.addEventListener('abort', onAbort)

                request.open('GET', self.url)
                request.send()
                // TODO Handle XMLHttpRequest failure
            })
        }
        else if (self.mode === 'selector' && self.selector) {
            _contentPromise = new Promise(function(resolve, reject) {
                let matches = document.querySelectorAll(self.selector)
                let content = Array.prototype.slice.call(matches)
                    .map(function(match) {
                        return match.textContent
                    }).join('\n')

                self.content = content
                resolve(content)
            })
        }

        if (!_contentPromise) {
            _contentPromise = new Promise(function(_, reject) {
                reject(new Error('unrecognized load mode ' + self.mode + '. use one of [ text, url, selector ]'))
            })
        }

        return _contentPromise
    }

    const _detectFormat = function(content) {
        const promise = self.worker.detectFormat(content)

        promise.then(function(format) {
            self.source = format
        })

        return promise
    }

    const _detectName = function(content) {
        return self.worker.detectName(content)
    }

    const _convert = function(params) {
        return self.worker.convert({
            content: params.content || self.content,
            source: params.source || self.source,
            target: params.target || self.target
        })
    }

    const _findBestFormat = function(scores) {
        if (!scores) {
            return null
        }

        let best = {
            source: null,
            score: -1
        }
        scores.forEach(function(kv) {
            if (kv.score >= best.score) {
                let { format, version } = kv
                best = {
                    source: { format, version },
                    score: scores[format]
                }
            }
        })

        return best.source
    }
    /* end internals */

    this.close = function() {
        if (self.worker && typeof self.worker.close === 'function') {
            self.worker.close()
            return true
        }
        return false
    }

    this.start = function(url) {
        if (self.worker && typeof self.worker.start === 'function') {
            return self.worker.start(url)
        }

        return null
    }

    this.set = function() {
        if (arguments.length === 1 && typeof arguments[0] === 'object') {
            _setObject.apply(self, arguments);
        }
        else if (arguments.length === 2 && typeof arguments[0] === 'string') {
            _setKeyValue.apply(self, arguments);
        }

        if (arguments.length < 1 || arguments.length > 2) {
            let errorMessage = 'invalid number of arguments for .set: ' + arguments.length;
            throw new Error(errorMessage)
        }
        else {
            let errorMessage = 'unrecognized arguments for .set: ' + arguments;
        }

        return self
    }

    this.load = function() {
        if (arguments.length) {
            try {
                self.set.apply(self, arguments)
            }
            catch (e) {
                e.message = '.set called by .load raised error: "' + e.message + '"'

                return new Promise(function(_, reject) {
                    reject(e)
                })
            }
        }

        return _loadContent()
    }

    this.detect = function() {
        if (arguments.length === 2) {
            let action = arguments[0]
            let content = arguments[1]

            if (typeof action === 'string' && action === 'format') {
                return _detectFormat(content)
            }

            if (typeof action === 'string' && action === 'name') {
                return _detectName(content)
            }

            return new Promise(function(_, reject) {
                let errorMessage = 'unrecognized detection action: ' + action
                reject(new Error(errorMessage))
            })
        }

        if (arguments.length === 1) {
            let action = arguments[0]
            if (typeof action === 'string' && action === 'format') {
                let promise = null

                if (_contentPromise) {
                    promise = _contentPromise
                }
                else {
                    promise = _loadContent()
                }

                return promise.then(function(content) {
                    return _detectFormat(content)
                })
            }
            else if (typeof action === 'string' && action === 'name') {
                let promise = null

                if (_contentPromise) {
                    promise = _contentPromise
                }
                else {
                    promise = _loadContent()
                }

                return promise.then(function(content) {
                    return _detectName(content)
                })
            }

            return new Promise(function(_, reject) {
                let errorMessage = 'unrecognized detection action: ' + action
                reject(new Error(errorMessage))
            })
        }

        return new Promise(function(_, reject){
            let errorMessage = 'invalid number of arguments for .detect: ' + arguments.length
            reject(new Error(errorMessage))
        })

    }

    this.convert = function() {
        let params = {}
        if (arguments.length) {
            try {
                self.set.apply(self, arguments)
                params = {
                    source: JSON.parse(JSON.stringify(self.source)),
                    target: JSON.parse(JSON.stringify(self.target))
                }
            }
            catch (e) {
                e.message = '.set called by .convert raised error: "' + e.message + '"'
                throw e
            }
        }

        let promise = null
        if (_contentPromise) {
            promise = _contentPromise
        }
        else {
            promise = _loadContent()
        }

        return promise.then(function(data) {
            self.content = data;
            params.content = data;
            if (!params.source) {
                return self.detect('format', data).then(function(formats) {
                    let format = _findBestFormat(formats)
                    self.source = format;
                    params.source = format;
                    return _convert(params)
                }, function(error) {
                    throw error
                }).catch(function(fail) {
                    throw fail
                })
            }
            else {
                return _convert(params)
            }
        })
    }
}

module.exports = {
    ApiFlow: ApiFlow
}
/* eslint-enable */
