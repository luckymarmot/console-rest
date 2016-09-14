import React, { Component, PropTypes } from 'react'

require('./input.styl')

export default class TextField extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    constructor(props) {
        super(props)

        this.state = {
            value: props.value
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            typeof nextProps.value !== 'undefined' &&
            nextProps.value !== null
        ) {
            this.setState({
                value: nextProps.value
            })
        }
    }

    handleChange(ev) {
        this.setState({
            value: this.refs.inputText.value
        })
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(ev, this.refs.inputText.value)
        }
    }

    keyPressed(ev) {
        if (typeof this.props.onKeyDown === 'function') {
            this.props.onKeyDown(ev, this.refs.inputText.value)
        }
    }

    submit(ev) {
        if (typeof this.props.onSubmit === 'function') {
            this.props.onSubmit(ev, this.refs.inputText.value)
        }
    }

    render() {
        let classes = 'input-field'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <div className={classes}>
            <input type="text"
                ref="inputText"
                placeholder={this.props.placeholder}
                value={this.state.value || ''}
                tabIndex="1" onKeyDown={::this.keyPressed}
                onChange={::this.handleChange}/>
            <button className="input-button"
                onClick={::this.submit}
                tabIndex="1">{this.props.children}</button>
        </div>
    }
}
