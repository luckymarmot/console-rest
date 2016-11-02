import React, { Component } from 'react'
import Immutable from 'immutable'

import Landing from 'crest/templates/landing/Landing'
import StatusBar from 'crest/components/status-bar/StatusBar'
import FlowPreview from 'crest/components/flow-preview/FlowPreview'
import FlowWarning from 'crest/components/flow-warning/FlowWarning'
import
    ButtonCustomization
from 'crest/components/button-customization/ButtonCustomization'
import FlowSnippet from 'crest/components/flow-snippet/FlowSnippet'

import Notifier from 'crest/components/notifier/Notifier'

require('./converter.styl')

export default class Converter extends Component {
    constructor(props) {
        super(props)

        this.noFile = new Immutable.Map({
            uri: null,
            name: null,
            content: null,
            format: null,
            version: null
        })
        this.noStatus = new Immutable.Map({
            code: null,
            target: null,
            message: null,
            open: false,
            byPass: false
        })

        this.state = {
            file: this.noFile,
            status: this.noStatus,
            theme: '#E13046',
            text: 'Open In Console'
        }
    }

    updateFile(props) {
        let { uri, name, content, format, version } = props
        this.setState({
            file: this.noFile.merge({ uri, name, content, format, version })
        })
    }

    updateStatus(props) {
        let { code, target, message } = props

        let byPass = false
        if (code === 0) {
            code = 400
            byPass = true
        }

        this.setState({
            file: this.noFile,
            status: this.noFile.merge({ code, target, message, byPass })
        })
    }

    updateFileAndStatus(props) {
        let {
            uri, name, content, format, version, code, target, message, open
        } = props

        let byPass = false
        if (code === 0) {
            code = 400
            byPass = true
        }

        this.setState({
            file: this.noFile.merge({ uri, name, content, format, version }),
            status: this.noStatus.merge({ code, target, message, open, byPass })
        })
    }

    updateFormat(format, version) {
        let file = this.state.file
        this.setState({
            file: file.set('format', format).set('version', version),
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
            status: this.noStatus.merge({
                byPass: this.state.status.get('byPass')
            })
        })
    }

    updateText(text) {
        this.setState({
            text: text,
            status: this.noStatus
        })
    }

    renderPreviewOrWarning() {
        if (this.state.status.get('byPass')) {
            return <div className="section">
                <FlowWarning uri={this.state.file.get('uri')}
                    theme={this.state.theme}/>
            </div>
        }

        return <div className="section">
            <h2>You&#39;re Ready to Go</h2>
            <FlowPreview
                className="preview"
                open={this.state.status.get('open')}
                content={this.state.file.get('content')}
                format={this.state.file.get('format')}
                version={this.state.file.get('version')}
                name={this.state.file.get('name')}
                theme={this.state.theme}/>
        </div>
    }

    render() {
        let classes = 'converter'
        if (this.props.classes) {
            classes += ' ' + this.props.classes
        }

        let mainClass = 'main'
        if (this.state.file.get('content') || this.state.status.get('byPass')) {
            mainClass += ' active'
        }

        return <div className={classes}>
            <Landing
                onFileChange={::this.updateFile}
                onStatusChange={::this.updateStatus}
                onFileAndStatusChange={::this.updateFileAndStatus}/>
            <StatusBar
                name={this.state.file.get('name')}
                uri={this.state.file.get('uri')}
                content={this.state.file.get('content')}
                format={this.state.file.get('format')}
                version={this.state.file.get('version')}
                byPass={this.state.status.get('byPass')}
                open={this.state.status.get('open')}
                onFileChange={::this.updateFile}
                onStatusChange={::this.updateStatus}
                onFileAndStatusChange={::this.updateFileAndStatus}/>
            <hr/>
            <div className={mainClass}>
                {this.renderPreviewOrWarning()}
                <hr/>
                <div className="section">
                    <h2>Add this button to your API docs</h2>
                    <ButtonCustomization
                        className="customization"
                        onTextChange={::this.updateText}
                        onThemeChange={::this.updateTheme}/>
                    <FlowSnippet
                        name={this.state.file.get('name')}
                        content={this.state.file.get('content')}
                        uri={this.state.file.get('uri')}
                        format={this.state.file.get('format')}
                        version={this.state.file.get('version')}
                        theme={this.state.theme}
                        text={this.state.text}/>
                </div>
            </div>
            <Notifier notification={this.state.status}/>
        </div>
    }
}
