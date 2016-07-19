import React, { Component } from 'react'

export default class FlowFileCheck extends Component {
    constructor(props){
        super(props)
        this.state = {
            editing: false
        }
    }

    edit() {
        this.setState({
            editing: true
        })
    }

    detectFormat(file) {
        if (!file) {
            return ''
        }

        let types = [
            'Paw',
            'Postman',
            'Curl',
            'Raml',
            'Swagger'
        ]
        let index = Math.floor(Math.random() * types.length)
        return types[index]
    }

    render() {
        let name = (this.props.file || {}).name || ''
        let type = this.detectFormat(this.props.file)
        return <div className="content-block">
            <h3>Your File</h3>
            <label>
                <span>Name: </span>
                <input type="text" disabled={!this.state.editing} value={name}/>
            </label>
            <label>
                <span>Detected format: </span>
                <select type="text" disabled={!this.state.editing} value={type}>
                    <option value="Paw">Paw</option>
                    <option value="Postman">Postman</option>
                    <option value="Swagger">Swagger</option>
                    <option value="Raml">RAML</option>
                    <option value="Curl">CURL</option>
                </select>
            </label>
        </div>
    }
}
