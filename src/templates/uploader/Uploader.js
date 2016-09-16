import React, { Component, PropTypes } from 'react'

import DropArea from 'crest/basics/dragdrop/DropArea'
import FilePicker from 'crest/basics/filepicker/FilePicker'
import FileInfo from 'crest/basics/fileinfo/FileInfo'
import TextField from 'crest/basics/inputs/TextField'
import TextArea from 'crest/basics/inputs/TextArea'

import SuccessImg from 'crest/basics/media/SuccessImg'
import FailureImg from 'crest/basics/media/FailureImg'

require('../../basics/layout/content.styl')
require('./uploader.styl')

export default class Uploader extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    constructor(props) {
        super(props)

        this.state = {
            local: {
                name: null,
                content: null,
                status: null
            },
            query: {
                url: null,
                name: null,
                content: null,
                status: null
            },
            paste: {
                content: null
            },
            current: null
        }
    }

    uploadFile(file) {
        let reader = new FileReader()
        reader.onload = () => {
            let content = reader.result
            this.setState({
                local: {
                    name: this.removeExtension(file.name),
                    content: content,
                    status: 200
                },
                current: 'local'
            })

            this.props.onFileAndStatusChange(
                this.removeExtension(file.name), content, null,
                200, file.name, {
                    message: 'file was successfully loaded'
                }
            )
        }

        reader.onerror = (ev) => {
            this.setState({
                local: {
                    name: this.removeExtension(file.name),
                    content: null,
                    status: 400
                }
            })

            this.props.onStatusChange(400, file.name, ev.target.error)
        }

        reader.onabort = (ev) => {
            this.setState({
                local: {
                    name: this.removeExtension(file.name),
                    content: null,
                    status: 600
                }
            })

            this.props.onStatusChange(600, file.name, ev.target.error)
        }

        reader.readAsText(file)
    }

    deleteFile() {
        if (this.state.current === 'local') {
            this.props.onFileChange(null, null, null)
            this.setState({
                current: null
            })
        }

        this.setState({
            local: {
                name: null,
                content: null,
                status: null
            }
        })
    }

    // TODO Support state.local.status to trigger status information in FileInfo
    renderDropHelper() {
        if (!this.state.local.name) {
            return <div className="drop-helper">
                    <h4>Drag &amp; Drop your file here</h4>
                    <FilePicker onFileUpload={::this.uploadFile}
                    text="or browse"/>
                </div>
        } else {
            // return <FileInfo file={this.state.file}/>
            return <div className="drop-helper">
                <FileInfo
                    file={this.state.local.name}
                    className="row"
                    onDeleteFile={::this.deleteFile}/>
            </div>
        }
    }

    renderQueryStatus() {
        if (this.state.query.status === 200) {
            return <SuccessImg title="Request completed"/>
        } else if (this.state.query.status === 400) {
            return <FailureImg title="Request Failed"/>
        } else if (this.state.query.status === 600) {
            return <FailureImg title="Request Aborted"/>
        }

        return 'GO'
    }

    resetQueryStatus(url) {
        this.setState({
            query: {
                status: null,
                url: url,
                content: null
            }
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
                query: {
                    url: this.state.query.url,
                    status: 400,
                    content: null
                }
            })

            this.props.onStatusChange(400, null, {
                name: 'Invalid URL',
                message: 'URL could not be parsed'
            })
        }
    }

    checkContent(ev, content) {
        this.setState({
            paste: {
                content: content
            },
            current: 'paste'
        })

        this.props.onFileChange(null, content, null)
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
            this.setState({
                query: {
                    url: url,
                    name: name,
                    status: 200,
                    content: ev.target.responseText
                },
                current: 'query'
            })

            this.props.onFileAndStatusChange(
                name, ev.target.responseText, url,
                200, name, {
                    message: 'file was successfully downloaded'
                }
            )
        } else if (ev.target.status >= 400) {
            this.setState({
                query: {
                    url: this.state.query.url,
                    status: 400,
                    content: null
                }
            })

            this.props.onStatusChange(
                ev.target.status, name, {
                    name: ev.target.statusText
                }
            )
        }
    }

    onFileErrored(ev) {
        let name = this.parseURLForName(this.state.query.url || '')
        this.request = null
        this.setState({
            query: {
                url: this.state.query.url,
                status: 400,
                content: null
            }
        })

        let status = null
        if (ev.target.status === 0 && !ev.target.statusText) {
            status = {
                name: 'Access-Control-Allow-Origin',
                message: 'This resource is not accessible from console.rest'
            }
        } else {
            status = {
                name: ev.target.statusText,
                message: 'The request failed for an unknown reason'
            }
            /* eslint-disable no-console */
            console.error(ev)
            /* eslint-enable no-console */
        }

        this.props.onStatusChange(400, name, status)
    }

    onFileAborted() {
        this.request = null
        this.setState({
            query: {
                status: 600,
                content: null
            }
        })

        let status = {
            name: 'Abort',
            message: 'Request was cancelled by user'
        }

        this.props.onStatusChange(600, name, status)
    }

    componentWillUnmount() {
        if (this.request instanceof XMLHttpRequest) {
            this.request.abort()
        }
    }

    render() {
        let classes = 'uploader'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <div className={classes}>
            <h2>Import Your File</h2>
            <DropArea onFileDrop={::this.uploadFile}>
                <img src="basics/media/drop-area-img.svg"/>
                {this.renderDropHelper()}
            </DropArea>
            <div className="row">
                console.rest supports file from the following formats:&nbsp;
                <a>Paw</a>,&nbsp;
                <a>RAML</a>,&nbsp;
                <a>Swagger/OAI</a>,&nbsp;
                <a>Postman</a>,&nbsp;and&nbsp;
                <a>curl</a>
            </div>
            <TextField
                placeholder="or type in a URL"
                onKeyDown={::this.checkURLonKeyDown}
                onSubmit={::this.checkURL}>
                {this.renderQueryStatus()}
            </TextField>
            <TextArea
                placeholder="or simply paste the content"
                onSubmit={::this.checkContent}>
                GO
            </TextArea>
            <div data-future="SearchField"/>
            <div data-future="TextArea"/>
        </div>
    }
}
