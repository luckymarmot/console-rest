import React, { Component } from 'react'

require('./preview.styl')

export default class FlowPreview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
    }

    updateState(err) {
        this.setState({
            error: err
        })
    }

    componentDidMount() {
        window.openInConsole.generateDOM('preview', 'paw')
        window.openInConsole.setGlobalCallback((error) => {
            this.updateState(error)
        })
    }

    componentWillReceiveProps(props) {
        let formatMap = {
            'postman v2': 'postman-2',
            'postman v1': 'postman-1',
            'postman-1': 'postman-1',
            'postman-2': 'postman-2',
            swagger: 'swagger',
            raml: 'raml',
            curl: 'curl',
            paw: 'paw'
        }

        if (props.theme) {
            window.openInConsole.setTheme(props.theme)
        }

        if (props.content && props.format) {
            let format = formatMap[props.format.toLowerCase()]
            window.openInConsole.setSource(
                props.content,
                format,
                'text'
            )
            window.openInConsole.setName(props.name)
            window.openInConsole.generateContent()
            this.dismissError()
        }
    }

    dismissError() {
        this.setState({
            error: null
        })
    }

    render() {
        let classes = ''
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <section className={classes}>
            <h2>Your Preview</h2>
            <div id="preview"></div>
        </section>
    }
}
