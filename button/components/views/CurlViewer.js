import React from 'react'

import Viewer from './Viewer'

require('./curl-view.styl')

export default class CurlViewer extends Viewer {
    constructor(props) {
        super(props)

        this.viewClass = 'oic-curl-view'
        this.contentClass = 'oic-curl-preview'
        this.extension = 'md'
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
                onClick={::this.download}
                style={buttonStyle}>
                Download file
            </div>
        </div>
    }
}
