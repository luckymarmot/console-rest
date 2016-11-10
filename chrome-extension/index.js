((chrome) => {
    let converter = null

    const getCurrentTab = () => {
        return new Promise((resolve) => {
            const queryInfo = {
                active: true,
                currentWindow: true
            }

            chrome.tabs.query(queryInfo, (tabs) => {
                resolve(tabs[0])
            })
        })
    }

    const getCurrentApi = (() => {
        const _apiMapUrl =
            chrome.extension.getURL('local/api-urls.min.json')
        const _apiMapPromise = fetch(_apiMapUrl).then(response => {
            return response.json()
        })

        const _currentTabPromise = getCurrentTab()
        const _currentApiPromise = Promise.all([
            _apiMapPromise,
            _currentTabPromise
        ]).then(([ apiMap, tab ]) => {
            const urls = Object.keys(apiMap)
            let matches = urls.filter((_url) => {
                return tab.url.match(_url)
            })

            if (matches.length) {
                return apiMap[matches[0]]
            }

            return null
        })

        return () => _currentApiPromise
    })()

    const downloadGenerated = (generated, _name, format) => {
        const extensionMap = {
            swagger: 'json',
            raml: 'raml',
            postman: 'postman_dump.json',
            curl: 'md'
        }
        const extension = extensionMap[format] || 'json'

        const link = document.createElement('a')
        let name = (_name || 'api-flow') + '.' + extension
        link.download = name
        link.href = 'data:,' + encodeURIComponent(generated)
        link.click()
    }

    const downloadFile = (format) => {
        getCurrentApi().then(sourceUrl => {
            let apiName = null
            if (!converter) {
                converter = new window.ApiFlow()
            }
            converter.set({
                mode: 'url',
                url: sourceUrl
            }).load()

            converter.detect('name').then(name => {
                apiName = name
                return converter.convert({
                    target: {
                        format
                    }
                })
            })
                .then(generated => {
                    downloadGenerated(generated, apiName, format)
                })
        })
    }

    const openInPaw = () => {
        getCurrentApi().then(sourceUrl => {
            let url = 'paw://new.document/open?'
            if (sourceUrl) {
                url += 'url=' + encodeURIComponent(sourceUrl)
            }

            url += '&importer=' +
                'com.luckymarmot.PawExtensions.SwaggerImporter'

            getCurrentTab().then(tab => {
                chrome.tabs.sendMessage(tab.id, {
                    type: 'event:open-in-paw',
                    url: url
                })
            })
        })
    }

    const doDefaultAction = (format) => {
        if (format === 'paw') {
            return () => {
                openInPaw()
            }
        }

        if (format === 'settings') {
            return (ev) => {
                /* eslint-disable no-console */
                console.log('open settings', ev)
                /* eslint-enable no-console */
            }
        }

        return () => {
            downloadFile(format)
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const formats = document.getElementsByClassName('list-item')
        for (let i = 0; i < formats.length; i += 1) {
            const format = formats[i].getAttribute('data-target')
            formats[i].onclick = doDefaultAction(format)
        }
    })
})(window.chrome)
