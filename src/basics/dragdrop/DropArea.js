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

    componentDidMount() {
        this.onDragEnter = ::this.cancel
        this.onDragOver = ::this.cancel
        this.onDragLeave = ::this.reset
        this.onDrop = ::this.drop

        document.body.addEventListener('dragenter', this.onDragEnter)
        document.body.addEventListener('dragover', this.onDragOver)
        document.body.addEventListener('dragleave', this.onDragLeave)
        document.body.addEventListener('drop', this.onDrop)
    }

    componentWillUnmount() {
        document.body.removeEventListener('dragenter', this.onDragEnter)
        document.body.removeEventListener('dragover', this.onDragOver)
        document.body.removeEventListener('dragleave', this.onDragLeave)
        document.body.removeEventListener('drop', this.onDrop)
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

    drop(ev) {
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

        return <div className={classes}></div>
    }
}
