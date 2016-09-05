import React, { Component } from 'react'

import Header from 'crest/components/header/Header'
import Converter from 'crest/app/converter/Converter'

export default class Root extends Component {
    render() {
        return <div className="col">
            <Header/>
            <Converter/>
        </div>
    }
}
