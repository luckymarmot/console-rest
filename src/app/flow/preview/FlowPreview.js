import React, { Component } from 'react'

export default class FlowPreview extends Component {

    constructor(props) {
        super(props)
        let type = this.detectFormat(props.file)
        let name = (props.file || {}).name || null
        this.state = {
            name: name,
            type: type
        }
    }

    detectFormat() {
        return null
    }

    render() {
        return <div className="content-block">
            <h3>Your Preview</h3>
            <div className="row">This is the preview</div>
        </div>
    }
}
