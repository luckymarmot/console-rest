import React, { Component } from 'react'

import Notifier from 'crest/components/notifications/Notifier'
import Uploader from 'crest/templates/uploader/Uploader'

require('../../basics/layout/content.styl')

export default class Converter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notifying: false,
            file: {
                url: null,
                path: null,
                content: null
            }
        }
    }

    render() {
        return <div className="container">
            <Notifier className="aside"/>
            <div className="content">
                <div className="section">
                    <h1>Run Any API anywhere</h1>
                </div>
                <Uploader className="section"/>
                <div data-future="MetadataEditor" className="section"/>
                <div data-future="FileConverter" className="section"/>
            </div>
            <div data-future="Helper" className="aside"/>
        </div>
    }
}
