window.chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'event:open-in-paw') {
        const url = message.url
        const link = document.createElement('a')
        link.href = url
        link.click()
    }
})
