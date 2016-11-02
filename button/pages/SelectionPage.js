import React, { Component } from 'react'

import PawLogo from '../logos/Paw'
import PawMiniLogo from '../logos/PawMini'
import PostmanLogo from '../logos/Postman'
import OpenAPILogo from '../logos/OpenAPI'
import RAMLLogo from '../logos/RAML'
import CurlLogo from '../logos/Curl'

require('./pages.styl')
require('./selection.styl')

export default class SelectionPage extends Component {
    openTab(target) {
        return () => {
            if (typeof this.props.onPageClick === 'function') {
                this.props.onPageClick(target)
            }
        }
    }

    render() {
        let classes = this.props.className || ''
        classes += ' oic-selection'

        return <div className={classes}>
            <div className="oic-container">
                <div className="oic-selection-wrapper">
                    <div className="oic-selection-header">
                        VISUAL API CLIENTS
                    </div>
                    <div className="oic-block">
                        <div className="oic-target-block"
                            onClick={::this.openTab('paw')}>
                            <PawLogo className="oic-logo"/>
                            <div className="oic-brand">
                                Native HTTP Client for Mac
                            </div>
                        </div>
                        <div className="oic-target-block"
                            onClick={::this.openTab('postman')}>
                            <PostmanLogo className="oic-logo"/>
                            <div className="oic-brand">
                                HTTP client
                            </div>
                        </div>
                    </div>
                    <div className="oic-selection-header">
                        API SPECIFICATION FILES
                    </div>
                    <div className="oic-block">
                        <div className="oic-target-block"
                            onClick={::this.openTab('swagger')}>
                            <OpenAPILogo className="oic-logo"/>
                            <div className="oic-brand">
                                OAI aka. Swagger
                            </div>
                        </div>
                        <div className="oic-target-block"
                            onClick={::this.openTab('raml')}>
                            <RAMLLogo className="oic-logo"/>
                            <div className="oic-brand">
                                RAML API definition file
                            </div>
                        </div>
                    </div>
                    <div className="oic-selection-header">
                        COMMAND LINE TOOLS
                    </div>
                    <div className="oic-block">
                        <div className="oic-target-block"
                            onClick={::this.openTab('curl')}>
                            <CurlLogo className="oic-logo"/>
                            <div className="oic-brand">
                                cURL with Markdown formatting
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="oic-page-footer">
                <span>console.rest is a community project by Paw</span>
                <PawMiniLogo className="oic-footer-icon"/>
                <span className="oic-button-light">
                    <a href="#console.rest">
                        Add this "Open in Console" button to your API
                    </a>
                </span>
            </div>
        </div>
    }
}
