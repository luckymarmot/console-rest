import React, { Component } from 'react'

import FlowInput from './input/FlowInput'
import FlowFileCheck from './check/FlowFileCheck'
import FlowPreview from './preview/FlowPreview'
import FlowButtonSettings from './button/FlowButtonSettings'
import FlowSnippet from './snippet/FlowSnippet'

require('styles/molecules/layout/row.styl')
require('styles/molecules/layout/container.styl')

export default class FlowManager extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            url: null,
            format: null,
            content: null,
            theme: '#00AAFF',
            text: 'Open In Console'
        }
    }

    onFileReady(props) {
        let format = props.format
        if (!props.format) {
            format = this.detectFormat(props.file)
        }

        if (props.file !== this.state.file) {
            let reader = new FileReader()
            reader.onload = (ev) => {
                this.setState({
                    content: ev.target.result
                })
            }
            reader.readAsText(props.file)
        }

        let url = null
        if (props.url) {
            url = props.url
        }
        this.setState({
            file: props.file,
            format: format,
            url: url
        })
    }

    updateTheme(color) {
        this.setState({
            theme: color
        })
    }

    updateText(text) {
        this.setState({
            text: text
        })
    }

    detectFormat(file) {
        if (!file) {
            return ''
        }

        let types = [
            'Paw',
            'Postman',
            'Curl',
            'Raml',
            'Swagger'
        ]
        let index = Math.floor(Math.random() * types.length)
        return types[index]
    }

    render() {
        return <div className="row__centered">
            <div className="container">
                <FlowInput file={this.state.file} format={this.state.format}
                    onFileReady={::this.onFileReady}/>
                <FlowFileCheck
                    file={this.state.file}
                    format={this.state.format}
                    url={this.state.url}
                    onChangeFileSettings={::this.onFileReady}/>
                <FlowPreview
                    content={this.state.content}
                    format={this.state.format}
                    theme={this.state.theme}/>
                <FlowButtonSettings
                    onTextChange={::this.updateText}
                    onThemeChange={::this.updateTheme}/>
                <FlowSnippet
                    url={this.state.url}
                    content={this.state.content}
                    format={this.state.format}
                    theme={this.state.theme}
                    text={this.state.text}/>
            </div>
        </div>
    }
}
