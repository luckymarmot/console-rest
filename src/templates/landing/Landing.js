import React, { Component } from 'react'

import Rocket from 'crest/basics/media/Rocket'
import Uploader from 'crest/templates/uploader/Uploader'
import Helper from 'crest/templates/helper/Helper'

require('./landing.styl')

export default class Converter extends Component {

    updateFile() {
        if (typeof this.props.onFileChange === 'function') {
            this.props.onFileChange(...arguments)
        }
    }

    updateStatus() {
        if (typeof this.props.onStatusChange === 'function') {
            this.props.onStatusChange(...arguments)
        }
    }

    updateFileAndStatus() {
        if (typeof this.props.onFileAndStatusChange === 'function') {
            this.props.onFileAndStatusChange(...arguments)
        }
    }

    render() {
        let classes = 'landing'
        if (this.props.classes) {
            classes += ' ' + this.props.classes
        }

        return <div className={classes}>
            <div className="left"></div>
            <div className="center">
                <Rocket className="rocket"/>
                <div className="value-prop">
                    <h1>Make APIs Universal</h1>
                    <h3>The ultimate API format converter.</h3>
                    <h3>One button to open every API.</h3>
                    <h2>Watch demo</h2>
                </div>
                <Uploader
                    onFileChange={::this.updateFile}
                    onStatusChange={::this.updateStatus}
                    onFileAndStatusChange={::this.updateFileAndStatus} />
            </div>
            <div className="right">
                <Helper/>
            </div>
        </div>
    }
}
