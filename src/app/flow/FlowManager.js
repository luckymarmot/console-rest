import React, { Component } from 'react'

import FlowInput from './input/FlowInput'
import FlowFileCheck from './check/FlowFileCheck'
import FlowPreview from './preview/FlowPreview'
/*
import FlowButtonSettings from './button/FlowButtonSettings'
import FlowSnippet from './snippet/FlowSnippet'
*/

require('styles/molecules/layout/row.styl')
require('styles/molecules/layout/container.styl')

export default class FlowManager extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
    }

    onFileReady(file) {
        console.log('got file @', file)
        this.setState({
            file: file
        })
    }

    render() {
        return <div className="row__centered">
            <div className="container">
                <FlowInput onFileReady={::this.onFileReady}/>
                <FlowFileCheck file={this.state.file}
                    onChangeFileSettings={::this.onFileReady}/>
                <FlowPreview file={this.state.file}/>
                {/*
                    <FlowButtonSettings></FlowButtonSettings>
                    <FlowSnippet></FlowSnippet>
                */}
            </div>
        </div>
    }
}
