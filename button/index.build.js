let resolve
let reject
let consoleRestApiPromise = new Promise(function(_resolve, _reject) {
    resolve = _resolve
    reject = _reject
})

const loadVisuals = function() {
    const protocol = document.location.protocol === 'https:' ? 'https' : 'http'
    const apiUrl = protocol + '://' +
        'localhost:8888/build/console-rest-visual.js'

    const consoleRestApi = document.createElement('script')
    consoleRestApi.src = apiUrl
    consoleRestApi.type = 'text/javascript'
    consoleRestApi.async = 'true'

    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(consoleRestApi, s)

    consoleRestApi.addEventListener('load', function() {
        resolve(window.ConsoleRest)
    })

    consoleRestApi.addEventListener('error', function() {
        reject(window.ConsoleRest)
    })

    consoleRestApi.addEventListener('abort', function() {
        reject(window.ConsoleRest)
    })
}

document.addEventListener('DOMContentLoaded', loadVisuals)

window.ConsoleRest = {
    ready: consoleRestApiPromise
}
