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
        window.ConsoleRest.ready.then(cr => {
            cr.bindModalToButtons()
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

        if (props.content && props.format) {
            let format = formatMap[props.format.toLowerCase()]
            window.ConsoleRest.ready.then(cr => {
                cr.converter.set({
                    source: {
                        format
                    },
                    mode: 'text',
                    text: props.content
                })
            })
            // window.openInConsole.setName(props.name)
            // window.openInConsole.generateContent()
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
            <div id="preview" className="button oic-button"
                data-theme={this.props.theme}
                style={{ backgroundColor: this.props.theme }}>
                Download as ...
            </div>
        </section>
    }
}
