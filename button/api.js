/* eslint-disable */
'use strict';
const config = require('api-config');
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

        if (obj.mode || obj.url || obj.text || obj.selector) {
            _contentPromise = null
        }

        for (let key in obj) {
            if (obj.hasOwnProperty(key) && _vars.indexOf(key) > -1) {
                this[key] = obj[key]
            }
        }
    }

    const _setKeyValue = function(key, value) {
        if (key === 'mode') {
            _clearModeRelatedValues(value)
        }

        if (['mode', 'url', 'text', 'selector'].indexOf(key) >= 0) {
            _contentPromise = null
        }

        if (_vars.indexOf(key) > -1) {
            this[key] = value
        }
    }

    const _loadContent = function(_settings, saveAsContent) {
        if (saveAsContent) {
            self.content = null;
            _contentPromise = null;
        }

        const settings = _settings || {}
        const mode = settings.mode || self.mode
        const text = settings.text || self.text
        const url = settings.url || self.url
        const selector = settings.selector || self.selector

        let contentPromise = null

        if (mode === 'text' && text) {
            contentPromise = new Promise(function(resolve, reject) {
                if (saveAsContent) {
                    self.content = text
                }
                resolve(text)
            })
        }
        else if (mode === 'url' && url) {
            contentPromise = new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest()

                const onLoad = function () {
                    if (request.status >= 400) {
                        if (saveAsContent) {
                            self.content = null
                        }
                        reject(new Error(request.statusText))
                    }
                    else {
                        if (saveAsContent) {
                            self.content = request.responseText
                        }
                        resolve(request.responseText)
                    }

                    request.removeEventListener('load', onLoad)
                    request = null
                }

                const onError = function () {
                    if (saveAsContent) {
                        self.content = null
                    }
                    reject(new Error(request.statusText || 'Unknown Error'))

                    request.removeEventListener('error', onError)
                    request = null
                }

                const onAbort = function () {
                    if (saveAsContent) {
                        self.content = null
                    }
                    reject(new Error(request.statusText || 'Unknown Error'))

                    request.removeEventListener('abort', onAbort)
                    request = null
                }

                request.addEventListener('load', onLoad)
                request.addEventListener('error', onError)
                request.addEventListener('abort', onAbort)

                request.open('GET', url)
                request.send()
            })
        }
        else if (mode === 'selector' && selector) {
            contentPromise = new Promise(function(resolve, reject) {
                let matches = document.querySelectorAll(selector)
                let content = Array.prototype.slice.call(matches)
                    .map(function(match) {
                        return match.textContent
                    }).join('\n')

                if (saveAsContent) {
                    self.content = content
                }
                resolve(content)
            })
        }

        if (!contentPromise) {
            contentPromise = new Promise(function(_, reject) {
                reject(new Error('unrecognized load mode ' + mode + '. use one of [ text, url, selector ]'))
            })
        }

        if (saveAsContent) {
            _contentPromise = contentPromise
        }

        return contentPromise
    }

    const _detectFormat = function(content) {
        const promise = self.worker.detectFormat(content)
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
            format: null,
            version: null,
            score: -1
        }

        scores.forEach(function(kv) {
            if (kv.score >= best.score) {
                best = kv
            }
        })

        const { format, version } = best
        return { format, version }
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

    this.load = function(settings) {
        try {
            let promise = null
            if (_contentPromise && !settings.mode && !settings.url && !settings.text && !settings.selector) {
                promise = _contentPromise
            }
            else {
                promise = _loadContent(settings, true)
            }
            return promise
        }
        catch (e) {
            e.message = '_loadContent failed with error: "' + e.message + '"'

            return new Promise(function(_, reject) {
                reject(e)
            })
        }
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
                    promise = _loadContent(null, true)
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

    this.convert = function(_settings) {
        const settings = _settings || {}

        let promise = null
        if (_contentPromise && !settings.mode && !settings.url && !settings.text && !settings.selector) {
            promise = _contentPromise
        }
        else {
            promise = _loadContent(settings)
        }

        const source = settings.source || self.source

        return promise.then(function(data) {
            settings.content = data;
            if (!source) {
                return self.detect('format', data).then(function(formats) {
                    let format = _findBestFormat(formats)
                    settings.source = format;
                    return _convert(settings)
                }, function(error) {
                    throw error
                }).catch(function(fail) {
                    throw fail
                })
            }
            else {
                return _convert(settings)
            }
        })
    }
}

module.exports = {
    ApiFlow: ApiFlow
}
/* eslint-enable */
