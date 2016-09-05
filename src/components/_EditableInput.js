import React, { Component } from 'react'
import ReactDOM from 'react-dom'

require('styles/molecules/layout/padding.styl')
require('styles/molecules/forms/editable-input.styl')

export default class EditableInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            value: ''
        }
    }

    startEdit() {
        this.setState({
            editing: true
        })
        ReactDOM.findDOMNode(this.refs.input).focus()
    }

    stopEdit() {
        this.setState({
            editing: false
        })
        this.props.onSave(this.state.value)
    }

    renderLabel() {
        let label = this.props.children[0]
        return label
    }

    updateValue() {
        let value = this.refs.input.value
        this.setState({
            value: value
        })
    }

    renderInput() {
        let value
        if (this.state.editing) {
            if (
                typeof this.state.value === 'undefined' ||
                this.state.value === null
            ) {
                value = this.props.children[1].props.value
            } else {
                value = this.state.value
            }
        } else {
            value = this.props.children[1].props.value
        }
        let input = React.cloneElement(this.props.children[1],
            {
                disabled: !this.state.editing,
                onChange: ::this.updateValue,
                onClick: ::this.startEdit,
                onBlur: ::this.stopEdit,
                ref: 'input',
                value: value
            }
        )
        return input
    }

    render() {
        let classes = 'row padding editable '
        if (this.props.className) {
            classes += this.props.className
        }

        return <label className={classes}>
            <span>{this.renderLabel()}</span>
            <span>
                {this.renderInput()}
            </span>
        </label>
    }
}
