import React, { Component } from 'react'

require('styles/atoms/forms/text-field.styl')

export default class FlowFileCheck extends Component {
    constructor(props) {
        super(props)
    }

    updateFileName(ev) {
        let name = ev.target.value
        let blob

        if (this.props.file) {
            blob = this.props.file.slice(0)
        } else {
            blob = ''
        }
        this.props.onChangeFileSettings({
            file: new File([ blob ], name),
            format: this.props.format,
            url: this.props.url
        })
    }

    updateFileFormat(ev) {
        let format = ev.target.value
        this.props.onChangeFileSettings({
            file: this.props.file,
            format: format,
            url: this.props.url
        })
    }

    render() {
        let name = (this.props.file || {}).name || ''
        let type = this.props.format || ''
        return <section className="content-block">
            <h3>Your File</h3>
            <div className="row">
                <div className="block-50">
                    <span>Name:</span>
                    <input
                        className="text-field"
                        type="text"
                        ref="nameInput"
                        value={name}
                        onChange={::this.updateFileName}/>
                </div>
                <div className="block-50 no-wrap">
                    <span>Detected format:</span>
                    <select
                        className="text-field"
                        type="text"
                        ref="formatInput"
                        value={type}
                        onChange={::this.updateFileFormat}>
                        <option value="Paw">Paw</option>
                        <option value="Postman">Postman</option>
                        <option value="Swagger">Swagger</option>
                        <option value="Raml">RAML</option>
                        <option value="Curl">CURL</option>
                    </select>
                </div>
            </div>
        </section>
    }
}
