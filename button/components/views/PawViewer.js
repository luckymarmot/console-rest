import React from 'react'

import Viewer from './Viewer'

require('./paw-view.styl')

export default class PawViewer extends Viewer {
    static importerMap = {
        swagger: 'com.luckymarmot.PawExtensions.SwaggerImporter',
        raml: 'com.luckymarmot.PawExtensions.RAMLImporter',
        postman: 'com.luckymarmot.PawExtensions.PostmanImporter',
        curl: 'com.luckymarmot.PawExtensions.cURLImporter'
    }

    constructor(props) {
        super(props)

        this.viewClass = 'oic-paw-view'
        this.displayErrors = false
        this.displayLoading = false
    }

    renderView() {
        return <div className="oic-view-content oic-paw-content">
            <div className="oic-paw-text-panel">
                <h3>The most advanced API tool for Mac</h3>
                <div className="oic-paw-support">
                    Paw is a full-featured HTTP client that lets you test
                    the APIs you build or consume. It has a beautiful
                    native OS X interface to compose requests, inspect server
                    responses and generate client code out-of-the-box.
                </div>
                <div className="oic-paw-video">
                    Watch Video
                </div>
                <a href="https://paw.cloud"
                    target="_blank"
                    className="oic-paw-action-button">
                    Discover Paw
                </a>
            </div>
            <div className="oic-paw-img-panel">
                <img src=""/>
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

        /* eslint-disable no-console */
        let url = 'paw://new.document/open?'
        if (this.props.converter.url) {
            url += 'url=' + encodeURIComponent(this.props.converter.url)
        } else {
            url += 'text=' + encodeURIComponent(this.props.converter.content)
        }

        const format = (this.props.converter.source || {}).format || 'swagger'
        const importer = PawViewer.importerMap[format]

        url += '&importer=' + importer

        return <div className="oic-action-bar">
            <a href={url} className="oic-action-button" style={buttonStyle}>
                Open in Paw
            </a>
        </div>
    }
}
