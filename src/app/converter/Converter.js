import React, { Component } from 'react'
import Immutable from 'immutable'

import Header from 'crest/components/header/Header'
import Logo from 'crest/components/header/Logo'
import Notifier from 'crest/components/notifications/Notifier'
import Uploader from 'crest/templates/uploader/Uploader'
import MetadataEditor from 'crest/templates/metadata-editor/MetadataEditor'
import Helper from 'crest/templates/helper/Helper'
import FlowPreview from 'crest/templates/flow-preview/FlowPreview'
import
    ButtonCustomization
from 'crest/templates/button-customization/ButtonCustomization'
import FlowSnippet from 'crest/templates/flow-snippet/FlowSnippet'

require('../../basics/layout/content.styl')

export default class Converter extends Component {
    constructor(props) {
        super(props)

        this.noFile = new Immutable.Map({
            uri: null,
            name: null,
            content: null,
            format: null
        })
        this.noStatus = new Immutable.Map({
            code: null,
            target: null,
            message: null
        })

        let file = this.loadHashData()
        this.state = {
            file: file,
            status: this.noStatus,
            theme: '#00AAFF',
            text: 'Open In Console'
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
            setup.name = setup.name.split('.', 1)[0]
        }

        let { uri, name, content, format } = setup
        return this.noFile.merge({ uri, name, content, format })
    }

    updateFile(props) {
        let { uri, name, content, format } = props
        this.setState({
            file: this.noFile.merge({ uri, name, content, format })
        })
    }

    updateStatus(props) {
        let { code, target, message } = props

        this.setState({
            status: this.noFile.merge({ code, target, message })
        })
    }

    updateFileAndStatus(props) {
        let { uri, name, content, format, code, target, message } = props

        this.setState({
            file: this.noFile.merge({ uri, name, content, format }),
            status: this.noStatus.merge({ code, target, message })
        })
    }

    updateFormat(format) {
        let file = this.state.file
        this.setState({
            file: file.set('format', format),
            status: this.noStatus
        })
    }

    updateFilename(name) {
        let file = this.state.file
        if (name.length || !this.state.file.get('content')) {
            this.setState({
                file: file.set('name', name),
                status: this.noStatus
            })
        } else {
            this.setState({
                file: file.set('name', name),
                status: this.noStatus
            })
        }
    }

    updateTheme(color) {
        this.setState({
            theme: color,
            status: this.noStatus
        })
    }

    updateText(text) {
        this.setState({
            text: text,
            status: this.noStatus
        })
    }

    render() {
        return <div className="col fill">
            <Header/>
            <div className="container">
                <div className="aside">
                    <Logo/>
                    <Notifier
                        status={this.state.status.get('code')}
                        message={this.state.status.get('message')}/>
                </div>
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
                        content={this.state.file.get('content')}
                        format={this.state.file.get('format')}
                        name={this.state.file.get('name')}
                        theme={this.state.theme}/>
                    <ButtonCustomization
                        className="section"
                        onTextChange={::this.updateText}
                        onThemeChange={::this.updateTheme}/>
                    <FlowSnippet
                        className="section"
                        name={this.state.file.get('name')}
                        content={this.state.file.get('content')}
                        url={this.state.file.get('url')}
                        format={this.state.file.get('format')}
                        theme={this.state.theme}
                        text={this.state.text}/>
                </div>
                <div className="aside">
                    <Helper/>
                </div>
            </div>
        </div>
    }
}
