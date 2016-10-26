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

        return <section className={classes}>
            <div id="preview" className="button oic-button"
                data-theme={this.props.theme}
                style={{ backgroundColor: this.props.theme }}>
                Download as ...
            </div>
        </section>
    }
}
