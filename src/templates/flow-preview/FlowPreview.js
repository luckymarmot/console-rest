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
            console.log('@@@error', error)
            this.updateState(error)
        })
    }

    componentWillReceiveProps(props) {
        let formatMap = {
            postman: 'postman-1',
            swagger: 'swagger',
            raml: 'raml',
            curl: 'curl',
            paw: 'paw'
        }

        window.openInConsole.setTheme(props.theme)
        if (props.content && props.format) {
            let format = formatMap[props.format.toLowerCase()]
            window.openInConsole.setSource(
                props.content,
                format,
                true
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

    renderError() {
        if (!this.state.error) {
            return null
        }

        if (this.state.error === '"generated file of poor quality"') {
            return <div className="error">
                <div className="msg"><strong>Warning:</strong>
                    The generated file was recognized as being of poor quality.
                    This may be due to a wrong source format.
                </div>
                <div className="close" onClick={::this.dismissError}>
                    &times;
                </div>
            </div>
        }

        return <div className="error">
                <div className="msg"><strong>Warning:</strong>
                    The source file could not be parsed.
                    This may be due to a corrupted source file, a wrong source
                    format, or invalid format type.
                </div>
                <div className="close" onClick={::this.dismissError}>
                    &times;
                </div>
            </div>
    }

    render() {
        let classes = ''
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <section className={classes}>
            <h2>Your Preview</h2>
            {this.renderError()}
            <div id="preview"></div>
        </section>
    }
}
