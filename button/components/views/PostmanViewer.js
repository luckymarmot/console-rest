import React from 'react'

import Viewer from './Viewer'

require('./postman-view.styl')

export default class PostmanViewer extends Viewer {
    static versions = [
        {
            value: 'v1.0',
            name: 'Postman v1.0'
        }
    ]

    constructor(props) {
        super(props)

        this.viewClass = 'oic-postman-view'
        this.extension = '.postman_dump.json'
    }

    renderView() {
        return <div className="oic-view-content oic-postman-content">
            <h3>Run In Postman</h3>
            <div className="oic-postman-support">
                <div className="oic-postman-step">
                    Download File
                </div>
                <div className="oic-postman-step">
                    Open Postman
                </div>
                <div className="oic-postman-step">
                    Import File
                </div>
            </div>
            <div className="oic-postman-video">
                <iframe
                    src="https://www.youtube.com/embed/8veXJ9YGlFI"
                    frameBorder="0" allowFullScreen/>
            </div>
        </div>
    }

    renderActionBar() {
        let buttonStyle = {}
        if (this.props.theme) {
            buttonStyle = {
                backgroundColor: this.props.theme
            }
        }

        return <div className="oic-action-bar">
            <div className="oic-action-button"
                style={buttonStyle}
                onClick={::this.download}>
                Download Postman File
            </div>
        </div>
    }
}
