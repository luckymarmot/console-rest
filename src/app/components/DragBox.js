import React, { Component } from 'react'

require('styles/molecules/forms/drag-box.styl')

export default class DragBox extends Component {
    render() {
        return <div className="drag-box">{this.props.children}</div>
    }
}
