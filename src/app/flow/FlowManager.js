import React, { Component } from 'react'

import FlowInput from './input/FlowInput'
/*
import FlowFileCheck from './check/FlowFileCheck'
import FlowPreview from './preview/FlowPreview'
import FlowButtonSettings from './button/FlowButtonSettings'
import FlowSnippet from './snippet/FlowSnippet'
*/

require('styles/molecules/layout/row.styl')
require('styles/molecules/layout/container.styl')

export default class FlowManager extends Component {
    render() {
        return <div className="row__centered">
            <div className="container">
                <FlowInput></FlowInput>
                {/*
                    <FlowFileCheck></FlowFileCheck>
                    <FlowPreview></FlowPreview>
                    <FlowButtonSettings></FlowButtonSettings>
                    <FlowSnippet></FlowSnippet>
                */}
            </div>
        </div>
    }
}
