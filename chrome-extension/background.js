chrome.runtime.onInstalled.addListener(() => {
    const apiMapUrl = chrome.extension.getURL('local/api-urls.min.json')
    const apiMapPromise = fetch(apiMapUrl).then(res => {
        return res.json()
    })

    chrome.declarativeContent.onPageChanged.removeRules(null, () => {
        apiMapPromise.then(apiMap => {
            const apiUrls = Object.keys(apiMap)
            return apiUrls
        }).then(apiUrls => {
            const conditions = apiUrls.map(url => {
                return new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        urlContains: url
                    }
                })
            })

            chrome.declarativeContent.onPageChanged.addRules([ {
                conditions: conditions,
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            } ])
        })

    })
})
