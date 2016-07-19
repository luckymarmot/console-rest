import React, { Component } from 'react'

require('styles/molecules/forms/drag-box.styl')
require('styles/molecules/layout/bottom-sheet-container.styl')

export default class DragBox extends Component {
    cancel(ev) {
        ev.stopPropagation()
        ev.preventDefault()
    }

    onDrop(ev) {
        let file = ev.dataTransfer.files[0]
        this.props.onFileDrop(file)

        ev.stopPropagation()
        ev.preventDefault()
    }

    render() {
        return <div className="drag-box bottom-sheet-container"
            onDragEnter={::this.cancel}
            onDragOver={::this.cancel}
            onDrop={::this.onDrop}>
            {this.props.children}
        </div>
    }
}
