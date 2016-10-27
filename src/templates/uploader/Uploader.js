import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'

import DropArea from 'crest/basics/dragdrop/DropArea'
import FilePicker from 'crest/basics/filepicker/FilePicker'
import TextField from 'crest/basics/inputs/TextField'
import GenericButton from 'crest/basics/buttons/GenericButton'

import SuccessImg from 'crest/basics/media/status/SuccessImg'
import FailureImg from 'crest/basics/media/status/FailureImg'

require('./uploader.styl')

export default class Uploader extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    constructor(props) {
        super(props)

        this.state = {
            local: new Immutable.Map({
                name: null,
                content: null,
                status: null
            }),
            query: new Immutable.Map({
                url: null,
                name: null,
                content: null,
                status: null
            }),
            location: this.loadHashData(),
            current: null,
            enterURL: false
        }
    }

    loadHashData() {
        let setup = {}
        let hash = window.location.hash.slice(2)
        let kvPairs = hash.split('&')
        kvPairs.forEach(kv => {
            let [ key, value ] = kv.split('=')
            let cleanKey = decodeURIComponent(key).toLowerCase()
            setup[cleanKey] = decodeURIComponent(value)
        })

        if (setup.content) {
            setup.content = atob(setup.content)
        }

        if (setup.name) {
            // remove extension
            setup.name = this.removeExtension(setup.name)
        }

        let { uri, name, content, format } = setup

        let status = {}
        if (content) {
            status = {
                code: 200,
                message: 'file was successfully loaded from hash'
            }
        }
        setTimeout(() => {
            this.props.onFileAndStatusChange({
                // file
                uri, name, content, format,
                // status
                ...status
            })
        }, 100)
        return new Immutable.Map({ uri, name, content, format })
    }

    uploadFile(file) {
        let reader = new FileReader()
        reader.onload = () => {
            let content = reader.result
            let name = this.removeExtension(file.name)

            this.setState({
                local: new Immutable.Map({
                    name: name,
                    content: content,
                    status: 200
                }),
                current: 'local'
            })

            let props = {
                name: name,
                content: content,
                code: 200,
                target: name,
                message: 'file was successfully loaded'
            }

            this.props.onFileAndStatusChange(props)
        }

        reader.onerror = (ev) => {
            let name = this.removeExtension(file.name)
            this.setState({
                local: new Immutable.Map({
                    name: name,
                    content: null,
                    status: 400
                })
            })

            let props = {
                code: 400,
                target: name,
                message: ev.target.error.message || ev.target.error.name || null
            }

            this.props.onStatusChange(props)
        }

        reader.onabort = (ev) => {
            let name = this.removeExtension(file.name)

            this.setState({
                local: new Immutable.Map({
                    name: name,
                    content: null,
                    status: 600
                })
            })

            let props = {
                code: 600,
                target: name,
                message: ev.target.error.message || ev.target.error.name
            }

            this.props.onStatusChange(props)
        }

        reader.readAsText(file)
    }

    deleteFile() {
        if (this.state.current === 'local') {
            this.props.onFileChange({})
            this.setState({
                current: null
            })
        }

        this.setState({
            local: new Immutable.Map({
                name: null,
                content: null,
                status: null
            })
        })
    }

    renderQueryStatus() {
        let status = this.state.query.get('status')
        if (status === 200) {
            return <SuccessImg title="Request completed"/>
        } else if (status === 400) {
            return <FailureImg title="Request Failed"/>
        } else if (status === 600) {
            return <FailureImg title="Request Aborted"/>
        }

        return 'GO'
    }

    resetQueryStatus(url) {
        this.setState({
            query: new Immutable.Map({
                status: null,
                url: url,
                content: null
            })
        })
    }

    checkURLonKeyDown(ev, content) {
        if (ev.keyCode === 13) {
            this.checkURL(ev, content)
        } else {
            this.resetQueryStatus()
        }
    }

    checkURL(ev, content) {
        this.resetQueryStatus()
        try {
            let url = new URL(content)
            if (this.request instanceof XMLHttpRequest) {
                this.request.abort()
            }
            this.request = new XMLHttpRequest()

            this.request.addEventListener('load', ::this.onFileLoaded)
            this.request.addEventListener('error', ::this.onFileErrored)
            this.request.addEventListener('abort', ::this.onFileAborted)
            this.request.open('GET', url)
            this.request.send()
            ev.preventDefault()
        } catch (e) {
            this.setState({
                query: this.state.query
                    .set('status', 400)
                    .set('content', null)
            })

            let props = {
                code: 400,
                message: 'URL could not be parsed'
            }

            this.props.onStatusChange(props)
        }
    }

    parseURLForName(url) {
        let name = url.split('/').slice(-1)[0].split('?')[0].split('#')[0]
        return this.removeExtension(name) || null
    }

    removeExtension(name) {
        return name.split('.', 1)[0]
    }

    onFileLoaded(ev) {
        this.request = null
        let url = ev.target.responseURL
        let name = this.parseURLForName(url)
        if (ev.target.status >= 200 && ev.target.status < 400) {
            let content = ev.target.responseText
            this.setState({
                query: new Immutable.Map({
                    url,
                    name,
                    content,
                    status: 200
                }),
                current: 'query'
            })

            let props = {
                name,
                content,
                url,
                code: 200,
                target: name,
                message: 'file was successfully downloaded'
            }
            this.props.onFileAndStatusChange(props)
        } else if (ev.target.status >= 400) {
            this.setState({
                query: new Immutable.Map({
                    url: this.state.query.url,
                    status: 400,
                    content: null
                })
            })

            let props = {
                code: 400,
                target: name,
                message: ev.target.statusText
            }

            this.props.onStatusChange(props)
        }
    }

    onFileErrored(ev) {
        let name = this.parseURLForName(this.state.query.url || '')
        this.request = null
        this.setState({
            query: new Immutable.Map({
                url: this.state.query.url,
                status: 400,
                content: null
            })
        })

        let props
        if (ev.target.status === 0 && !ev.target.statusText) {
            props = {
                code: 400,
                target: name,
                message: 'This resource is not accessible from console.rest'
            }
        } else {
            props = {
                code: 400,
                target: name,
                message: 'The request failed for an unknown reason'
            }
            /* eslint-disable no-console */
            console.error(ev)
            /* eslint-enable no-console */
        }

        this.props.onStatusChange(props)
    }

    onFileAborted() {
        this.request = null
        this.setState({
            query: new Immutable.Map({
                status: 600,
                content: null
            })
        })

        let props = {
            code: 600,
            message: 'Request was cancelled by user'
        }

        this.props.onStatusChange(props)
    }

    componentWillUnmount() {
        if (this.request instanceof XMLHttpRequest) {
            this.request.abort()
        }
    }

    displayEnterURL() {
        this.setState({
            enterURL: true
        })
    }

    hideEnterURL() {
        this.setState({
            enterURL: false
        })
    }

    renderAction() {
        if (this.state.enterURL) {
            return <div className="row guttered-row">
                <GenericButton className="button-small"
                    onClick={::this.hideEnterURL}>
                    &#x2573;
                </GenericButton>
                <TextField
                    title="URL"
                    placeholder="Type in a URL"
                    onKeyDown={::this.checkURLonKeyDown}
                    onSubmit={::this.checkURL}>
                    {this.renderQueryStatus()}
                </TextField>
            </div>
        } else {
            return <div className="row equal-split">
                <FilePicker className="button button-primary"
                    onFileUpload={::this.uploadFile}
                    text="Pick a File"/>
                <GenericButton className="button-primary"
                    onClick={::this.displayEnterURL}>
                    Enter URL
                </GenericButton>
            </div>
        }
    }

    render() {
        let classes = 'uploader'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <div className={classes}>
            <DropArea onFileDrop={::this.uploadFile}/>
            <img src="basics/media/fileformats.svg" draggable={false}/>
            <h3 className="drop-instructions">Drop Any API File</h3>
            <div className="support">
                <a>Paw</a>, {' '}
                <a>RAML</a>, {' '}
                <a>Swagger/OAI</a>, {' '}
                <a>Postman</a>, and {' '}
                <a>curl</a>
            </div>
            {this.renderAction()}
        </div>
    }
}
