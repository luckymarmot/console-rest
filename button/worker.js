/* eslint-disable */
function FlowInterface(apiFlowURL) {
    const self = this;

    const _apiFlowURL = apiFlowURL;
    const _callbacks = {};
    const _queue = [];

    const _useCallback = function(ev) {
        if (
            ev &&
            ev.data &&
            ev.data.extraneous &&
            ev.data.extraneous.uuid &&
            typeof _callbacks[ev.data.extraneous.uuid] === 'function'
        ) {
            _callbacks[ev.data.extraneous.uuid](ev.data.error || !ev.data.success || null, ev.data.result || null);
        }
        delete _callbacks[ev.data.extraneous.uuid];
    }

    let _worker = null;
    let _blobURL = null;
    this.apiFlowPromise = null;
    this.$worker = _worker;

    /* begin internals */
    const _uuid = function() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
            });
        return uuid;
    }

    const _initializeApiFlowWorker = function(ev) {
        let _blob = new Blob([ ev.target.responseText ], { type: 'text/javascript' });
        _blobURL = window.URL.createObjectURL(_blob);

        _worker = new Worker(_blobURL);
        _worker.addEventListener('message', _useCallback);

        self.apiFlowPromise.then(function() {
            _processQueue();
        })
    }

    const _processQueue = function() {
        while (_queue.length > 0) {
            var query = _queue.shift();
            _worker.postMessage(query);
        }
    }

    const _validateConversion = function(params) {
        // TODO
    }
    /* end internals */

    this.apiFlowProgress = 0

    this.start = function(_url) {
        if (_worker || _blobURL) {
            self.close()
        }

        let url = _url
        if (!_url) {
            url = _apiFlowURL
        }

        self.apiFlowPromise = new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            var loadProgress = function(ev) {
                if (ev.lengthComputable) {
                    self.apiFlowProgress = ev.loaded / ev.total
                }
            }
            var loadAction = function(ev) {
                if (!ev.target || !ev.target.responseText) {
                    reject(new Error('ApiFlow could not be loaded'))
                }
                else {
                    _initializeApiFlowWorker(ev)
                    resolve(true)
                }

                self.apiFlowProgress = 1
                req.removeEventListener('load', loadAction);
                req.removeEventListener('progress', loadProgress)
                loadAction = null;
                loadProgress = null;
                req = null;
            }
            req.addEventListener('load', loadAction);
            req.addEventListener('progress', loadProgress);
            req.open('GET', url);
            req.send();

            url = null
        });

        return self.apiFlowPromise;
    }

    this.close = function() {
        if (_worker) {
            _worker.removeEventListener('message', _useCallback);
            _worker.terminate();
            _worker = null;
        }

        if (_blobURL) {
            window.URL.revokeObjectURL(_blobURL);
            _blobURL = null;
        }

        self.apiFlowPromise = null;
    }

    this.reset = function(url) {
        self.close()
        self.start(url)
    }

    /*
        params = {
            content: 'curl ...',
            source: { format: 'swagger', version: '2.0' },
            target: { format: 'postman', version: '1.0', subFormat: 'dump' },
        }
    */
    this.convert = function(params) {
        try {
            _validateConversion(params)
        }
        catch (e) {
            return new Promise(function(_, reject) {
                reject(e)
            })
        }

        const resolutionOptions = {
            remote: false,
            local: false
        };

        const promise = new Promise(function(resolve, reject) {
            const uuid = _uuid();

            _callbacks[uuid] = function(error, data) {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(data)
                }
            };

            _queue.push({
                action: 'transform',
                content: params.content,
                mode: 'raw',
                source: params.source,
                target: JSON.parse(JSON.stringify(params.target)),
                resolutionOptions: resolutionOptions,
                uuid: uuid
            });

            self.apiFlowPromise.then(function(){
                _processQueue()
            })
        })


        return promise
    }

    this.detectFormat = function(content) {
        const promise = new Promise(function(resolve, reject) {
            const uuid = _uuid();
            _callbacks[uuid] = function(error, data) {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(data)
                }
            };

            _queue.push({
                action: 'detectFormat',
                content: content,
                uuid: uuid
            });

            self.apiFlowPromise.then(function() {
                _processQueue()
            })
        })

        return promise
    }

    this.detectName = function(content) {
        const promise = new Promise(function(resolve, reject) {
            const uuid = _uuid();
            _callbacks[uuid] = function(error, data) {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(data)
                }
            };

            _queue.push({
                action: 'detectName',
                content: content,
                uuid: uuid
            });

            self.apiFlowPromise.then(function(){
                _processQueue()
            })
        })

        return promise
    }

    self.reset()
}

module.exports = FlowInterface
/* eslint-enable */
