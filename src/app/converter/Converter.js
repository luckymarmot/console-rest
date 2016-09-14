import React, { Component } from 'react'

import Notifier from 'crest/components/notifications/Notifier'
import Uploader from 'crest/templates/uploader/Uploader'
import MetadataEditor from 'crest/templates/metadata-editor/MetadataEditor'
import Helper from 'crest/templates/helper/Helper'
import FlowPreview from 'crest/templates/flow-preview/FlowPreview'
import
    ButtonCustomization
from 'crest/templates/button-customization/ButtonCustomization'

require('../../basics/layout/content.styl')

export default class Converter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: {
                uri: null,
                name: null,
                content: null,
                format: null
            },
            status: {
                code: null,
                target: null,
                message: null
            },
            theme: null
        }
    }

    updateFile(name, content, uri, format) {
        this.setState({
            file: {
                uri: uri,
                name: name,
                content: content,
                format: format || null
            }
        })
    }

    updateStatus(status, filename, _error) {
        let error = _error || {}
        if (typeof error === 'string') {
            error = {
                message: error
            }
        }
        this.setState({
            status: {
                code: status,
                target: filename,
                message: error.message || error.name || null
            }
        })
    }

    /* eslint-disable max-params */
    updateFileAndStatus(name, content, uri, status, filename, _error, format) {
    /* eslint-enable max-params */
        let error = _error || {}
        if (typeof error === 'string') {
            error = {
                message: error
            }
        }

        this.setState({
            file: {
                uri: uri,
                name: name,
                content: content,
                format: format || null
            },
            status: {
                code: status,
                target: filename,
                message: error.message || error.name || null
            }
        })
    }

    updateFormat(format) {
        let file = this.state.file
        this.setState({
            file: {
                ...file,
                format: format
            },
            status: {
                code: null,
                target: null,
                message: null
            }
        })
    }

    updateFilename(name) {
        let file = this.state.file
        file.name = name
        if (name.length || !this.state.file.content) {
            this.setState({
                file: file,
                status: {
                    code: null,
                    target: null,
                    message: null
                }
            })
        } else {
            this.setState({
                file: file,
                status: {
                    code: 400,
                    target: null,
                    message: 'Name cannot be empty'
                }
            })
        }
    }

    updateTheme(color) {
        this.setState({
            theme: color
        })
    }

    render() {
        return <div className="container">
            <Notifier
                className="aside"
                status={this.state.status.code}
                message={this.state.status.message}/>
            <div className="content">
                <div className="section">
                    <h1>Run any API anywhere</h1>
                </div>
                <Uploader
                    className="section"
                    onFileChange={::this.updateFile}
                    onStatusChange={::this.updateStatus}
                    onFileAndStatusChange={::this.updateFileAndStatus}/>
                <MetadataEditor
                    file={this.state.file}
                    className="section"
                    onFileChange={::this.updateFile}
                    onStatusChange={::this.updateStatus}
                    onFileAndStatusChange={::this.updateFileAndStatus}/>
                <FlowPreview
                    className="section"
                    content={this.state.file.content}
                    format={this.state.file.format}
                    name={this.state.file.name}
                    theme={this.state.theme}/>
                <div data-future="FileConverter" className="section"/>
                <ButtonCustomization
                    className="section"
                    onThemeChange={::this.updateTheme}/>
            </div>
            <Helper className="aside"/>
        </div>
    }
}
