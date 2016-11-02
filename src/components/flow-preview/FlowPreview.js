import React, { Component } from 'react'

import Colors from 'crest/principles/Colors'

require('./preview.styl')

export default class FlowPreview extends Component {
    static colorMap = Colors.colorMap

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
        if (props.content && props.format) {
            const format = props.format
            const version = props.version

            window.ConsoleRest.ready.then(cr => {
                cr.converter.set({
                    source: {
                        format,
                        version
                    },
                    mode: 'text',
                    text: props.content
                })
                if (props.open) {
                    this.refs.preview.click()
                }
            })
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

        const colorName = FlowPreview.colorMap[this.props.theme] || 'red'
        const buttonUrl =
            'https://console.rest/github.io/assets/buttons/run_with_' +
            colorName + '.svg'

        return <section className={classes}>
            <div ref="preview" id="preview" className="button oic-button"
                data-theme={this.props.theme}>
                <img src={buttonUrl} width="200px"/>
            </div>
        </section>
    }
}
