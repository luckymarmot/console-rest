import React, { Component } from 'react'

export default class FlowPreview extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        window.openInConsole.generateDOM('preview', 'paw')
    }

    componentWillReceiveProps(props) {
        if (this.props.content && this.props.format) {
            window.openInConsole.setSource(
                props.content,
                props.format.toLowerCase(), true
            )
            window.openInConsole.generateContent()
        }
    }

    render() {
        return <section className="content-block">
            <h3>Your Preview</h3>
            <div id="preview"></div>
        </section>
    }
}
