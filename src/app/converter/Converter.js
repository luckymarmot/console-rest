import React, { Component } from 'react'
import Immutable from 'immutable'

import Landing from 'crest/templates/landing/Landing'
import StatusBar from 'crest/components/status-bar/StatusBar'
import FlowPreview from 'crest/components/flow-preview/FlowPreview'
import
    ButtonCustomization
from 'crest/components/button-customization/ButtonCustomization'
import FlowSnippet from 'crest/components/flow-snippet/FlowSnippet'

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
            message: null
        })

        let file = this.loadHashData()
        this.state = {
            file: file,
            status: this.noStatus,
            theme: '#E13046',
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

        let { uri, name, content, format, version } = setup
        return this.noFile.merge({ uri, name, content, format, version })
    }

    updateFile(props) {
        let { uri, name, content, format, version } = props
        this.setState({
            file: this.noFile.merge({ uri, name, content, format, version })
        })
    }

    updateStatus(props) {
        let { code, target, message } = props
        this.setState({
            status: this.noFile.merge({ code, target, message })
        })
    }

    updateFileAndStatus(props) {
        let {
            uri, name, content, format, version, code, target, message
        } = props

        this.setState({
            file: this.noFile.merge({ uri, name, content, format, version }),
            status: this.noStatus.merge({ code, target, message })
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
        let classes = 'converter'
        if (this.props.classes) {
            classes += ' ' + this.props.classes
        }

        let mainClass = 'main'
        if (this.state.file.get('content')) {
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
                onFileChange={::this.updateFile}
                onStatusChange={::this.updateStatus}
                onFileAndStatusChange={::this.updateFileAndStatus}/>
            <hr/>
            <div className={mainClass}>
                <div className="section">
                    <h2>You&#39;re Ready to Go</h2>
                    <FlowPreview
                        className="preview"
                        content={this.state.file.get('content')}
                        format={this.state.file.get('format')}
                        version={this.state.file.get('version')}
                        name={this.state.file.get('name')}
                        theme={this.state.theme}/>
                </div>
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
                        url={this.state.file.get('url')}
                        format={this.state.file.get('format')}
                        theme={this.state.theme}
                        text={this.state.text}/>
                </div>
            </div>
        </div>
    }
}
