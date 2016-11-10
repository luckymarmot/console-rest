/* eslint-disable no-console */
const http = require('http')
const https = require('https')
const URL = require('url')
const fs = require('fs')
const $path = require('path')

const getUrl = (options) => {
    return new Promise((resolve, reject) => {
        https.get(options, res => {
            let data = ''
            res.on('data', chunk => {
                data += chunk
            })

            res.on('end', () => {
                resolve(data)
            })
        }).on('error', e => {
            console.log('e', e)
            reject(e)
        })
    })
}

const checkUrl = (url) => {
    if (url.match('developers.vestorly.com')) {
        return new Promise((resolve) => {
            resolve(url)
        })
    }

    return new Promise((resolve, reject) => {
        const manageResponse = (response) => {
            if (
                response.statusCode >= 300 &&
                response.statusCode < 400 &&
                response.headers.location
            ) {
                checkUrl(
                    URL.resolve(url, response.headers.location)
                ).then(_url => {
                    resolve(_url)
                }, (e) => {
                    reject(e)
                })
            } else {
                resolve(url)
            }
        }

        let lib = null
        if (url.startsWith('https:')) {
            lib = https
        } else {
            lib = http
        }

        lib.get(url, manageResponse).on('error', e => {
            console.log('e', e, url)
            resolve(url)
        })
    })
}

console.log('getting api list from apis.guru...')
getUrl({
    host: 'api.apis.guru',
    path: '/v2/list.json'
}).then(data => {
    try {
        const apis = JSON.parse(data)
        const names = Object.keys(apis)

        const redirects = []
        console.log(names.length)
        const parsed = names.map(name => {
            const api = apis[name]
            const activeVersion = api.versions[api.preferred]

            let docs = null
            let redirect = null
            let swagger = activeVersion.swaggerUrl
            if (activeVersion.externalDocs && activeVersion.externalDocs.url) {
                docs = activeVersion.externalDocs.url
                redirect = checkUrl(docs)
                redirects.push(redirect)
            }

            return {
                name,
                docs,
                swagger,
                redirect
            }
        })

        console.log('looking for redirects...', redirects.length)

        const apiMap = {}

        console.log('fetching host urls...')
        const promises = parsed.map(apiProps => {
            const url = URL.parse(apiProps.swagger)
            const { host, path } = url
            return getUrl({
                host, path
            }).then(swag => {
                return { apiProps, swag }
            }).catch(err => console.log('err', err))
        })

        return Promise.all([
            Promise.all(promises).then(swags => {
                console.log('swags ready')
                return swags
            }),
            Promise.all(redirects).then(redirs => {
                console.log('redirs ready')
                return redirs
            })
        ]).then(([ swags ]) => {
            const mapRedirPromises = []
            swags.forEach(({ apiProps, swag }) => {
                try {
                    const model = JSON.parse(swag)
                    const apiHost = model.host + (model.basePath || '/')

                    apiMap[apiHost] = apiProps.swagger
                    apiMap[apiProps.swagger] = apiProps.swagger
                    if (apiProps.docs) {
                        const { host, path } = URL.parse(apiProps.docs)
                        const docs = host + path
                        apiMap[docs] = apiProps.swagger
                    }
                    if (apiProps.redirect) {
                        mapRedirPromises.push(apiProps.redirect.then(
                            ((swaggerUrl) => {
                                return redir => {
                                    const { host, path } = URL.parse(redir)
                                    apiMap[host + path] = swaggerUrl
                                    return true
                                }
                            })(apiProps.swagger)
                        ))
                    }
                } catch (e) {
                    return null
                }
            })

            Promise.all(mapRedirPromises).then(() => {
                console.log('writing min file...')
                fs.writeFileSync(
                    $path.join(__dirname, 'api-urls.min.json'),
                    JSON.stringify(apiMap)
                )
                console.log('writing human readable file...')
                fs.writeFileSync(
                    $path.join(__dirname, 'api-urls.json'),
                    JSON.stringify(apiMap, null, 2)
                )
                console.log('done')
            })

            return
        })
    } catch (e) {
        console.log('failed with error', e)
        return null
    }
})
