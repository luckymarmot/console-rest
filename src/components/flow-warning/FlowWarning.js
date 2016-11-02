import React, { Component } from 'react'

import Colors from 'crest/principles/Colors'
import WarnImg from 'crest/basics/media/status/WarnImg'
require('./warning.styl')

export default class FlowWarning extends Component {
    static colorMap = Colors.colorMap

    constructor(props) {
        super(props)
    }

    renderMessage() {
        if (this.props.uri.indexOf('http://') === 0) {
            return <div className="error-message">
                The URI you tried to request could not be loaded from
                Console.REST, because it is using the unsafe HTTP protocol. Use
                HTTPS instead. If you are the resource owner, the snippets below
                should still work when injected at the failing URI.
            </div>
        } else {
            return <div className="error-message">
                The URI you tried to request could not be loaded from
                Console.REST, because the resource owner does not
                allow Cross-Origin requests. If you are the resource owner,
                the snippets below should still work when injected at the
                failing URI.
            </div>
        }
    }

    render() {
        let classes = 'flow-warning'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        const colorName = FlowWarning.colorMap[this.props.theme] || 'red'
        const buttonUrl =
            'https://console.rest/github.io/assets/buttons/run_with_' +
            colorName + '.svg'

        return <section className={classes}>
            <div className="warning-header">
                <WarnImg className="white" width="64"/>
                <div className="warning-content">
                    <b>Warning: No Preview available</b>
                    {this.renderMessage()}
                </div>
            </div>
            <div className="warning-button">
                <img src={buttonUrl} width="200px"/>
            </div>
        </section>
    }
}
