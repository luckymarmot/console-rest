import React, { Component } from 'react'

import Converter from 'crest/app/converter/Converter'

export default class Root extends Component {
    render() {
        return <div className="col fill">
            <Converter/>
        </div>
    }
}
