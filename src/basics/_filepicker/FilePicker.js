import React, { Component, PropTypes } from 'react'

require('../button/button.styl')
require('./file-picker.styl')


export default class FilePicker extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    readFile(ev) {
        let file = ev.target.files[0]

        this.props.onFileUpload(file)

        ev.stopPropagation()
        ev.preventDefault()
    }

    clearInputFiles(ev) {
        ev.target.value = ''
    }

    render() {
        let classes = 'button '
        if (this.props.className) {
            classes += this.props.className
        }
        return <label className={classes} htmlFor="file-input">
            <input id="file-input"
                type="file"
                onClick={::this.clearInputFiles}
                onChange={::this.readFile}/>
            <span>Pick a file</span>
        </label>
    }
}
