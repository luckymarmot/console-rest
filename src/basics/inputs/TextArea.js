import React, { Component, PropTypes } from 'react'

export default class TextArea extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    constructor() {
        super()
        this.state = {
            size: 0
        }
    }

    resizeArea() {
        let lines = this.refs.inputText.value.split('\n').length
        this.setState({
            size: Math.min(Math.floor((lines + 4) / 6), 2)
        })
    }

    getTextAreaClassName() {
        let suffixes = [ 'small', 'medium', 'large' ]
        let suffix = suffixes[this.state.size]
        return [ 'textarea', suffix ].join(' ')
    }

    keyPressed(ev) {
        this.props.onKeyDown(ev, this.refs.inputText.value)
    }

    submit(ev) {
        this.props.onSubmit(ev, this.refs.inputText.value)
    }

    render() {
        let classes = this.getTextAreaClassName()
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <div className="input-field">
            <textArea
                className={classes}
                ref="inputText"
                onChange={::this.resizeArea}
                placeholder={this.props.placeholder}
                tabIndex="1" onKeyDown={::this.keyPressed}/>
            <button className="input-button"
                onClick={::this.submit}
                tabIndex="1">{this.props.children}</button>
        </div>
    }
}
