import React from 'react'

import Viewer from './Viewer'

import SimpleSelect from '../simple-select/SimpleSelect'

require('./swagger-view.styl')

export default class SwaggerViewer extends Viewer {
    static versions = [
        {
            value: 'v2.0',
            name: 'Swagger v2.0'
        }
    ]

    constructor(props) {
        super(props)

        this.viewClass = 'oic-swagger-view'
        this.contentClass = 'oic-swagger-preview'
        this.extension = 'swagger.json'
    }

    renderActionBar() {
        let buttonStyle = {}
        if (this.props.theme) {
            buttonStyle = {
                backgroundColor: this.props.theme
            }
        }

        return <div className="oic-action-bar">
            <div className="oic-select-container">
                <SimpleSelect
                    title="formats available"
                    default={SwaggerViewer.versions[0]}
                    options={SwaggerViewer.versions}/>
            </div>
            <div className="oic-action-button"
                style={buttonStyle}
                onClick={::this.download}>
                Download Swagger file
            </div>
        </div>
    }
}
