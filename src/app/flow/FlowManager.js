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
            format: null,
            content: null
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
        this.setState({
            file: props.file,
            format: format
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
                <FlowFileCheck file={this.state.file} format={this.state.format}
                    onChangeFileSettings={::this.onFileReady}/>
                <FlowPreview
                    content={this.state.content} format={this.state.format}/>
                <FlowButtonSettings/>
                <FlowSnippet/>
            </div>
        </div>
    }
}
