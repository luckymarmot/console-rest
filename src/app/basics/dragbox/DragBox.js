import React, { Component } from 'react'

require('./drag-box.styl')

export default class DragBox extends Component {

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
        let classes = 'drag-box'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }
        if (this.state.dragging) {
            classes += ' active'
        }
        return <div className={classes} ref="dragBox"
            onDragEnter={::this.cancel}
            onDragOver={::this.cancel}
            onDragLeave={::this.reset}
            onDrop={::this.onDrop}>
            {this.props.children}
        </div>
    }
}
