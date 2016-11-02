import React from 'react'

import Viewer from './Viewer'

import SimpleSelect from '../simple-select/SimpleSelect'

require('./raml-view.styl')

export default class RAMLViewer extends Viewer {
    static versions = [
        {
            value: 'v0.8',
            name: 'RAML v0.8'
        }
    ]

    constructor(props) {
        super(props)

        this.viewClass = 'oic-raml-view'
        this.contentClass = 'oic-raml-preview'
        this.extension = 'raml'
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
                    default={RAMLViewer.versions[0]}
                    options={RAMLViewer.versions}/>
            </div>
            <div className="oic-action-button" style={buttonStyle}
                onClick={::this.download}>
                Download RAML file
            </div>
        </div>
    }
}
