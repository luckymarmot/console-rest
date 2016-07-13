import React, { Component } from 'react'

import Header from 'app/header/Header'
import ValueProposition from 'app/flow/ValueProposition'
import FlowManager from 'app/flow/FlowManager'

require('styles/molecules/body.styl')

export default class Root extends Component {
    render() {
        return <div className="col">
            <Header/>
            <ValueProposition/>
            <FlowManager/>
        </div>
    }
}
