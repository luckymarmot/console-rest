import React, { Component, PropTypes } from 'react'

require('./droparea.styl')

export default class DropArea extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    constructor(props) {
        super(props)

        this.state = {
            dragging: false
        }
    }

    cancel(ev) {
        this.setState({
            dragging: true
        })
        ev.stopPropagation()
        ev.preventDefault()
    }

    reset() {
        this.setState({
            dragging: false
        })
    }

    onDrop(ev) {
        this.setState({
            dragging: false
        })
        let file = ev.dataTransfer.files[0]
        this.props.onFileDrop(file)

        ev.stopPropagation()
        ev.preventDefault()
    }

    render() {
        let classes = 'drop-area'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }
        if (this.state.dragging) {
            classes += ' active'
        }

        return <div className={classes} ref="dropBox"
            onDragEnter={::this.cancel}
            onDragOver={::this.cancel}
            onDragLeave={::this.reset}
            onDrop={::this.onDrop}>
            {this.props.children}
        </div>
    }
}
