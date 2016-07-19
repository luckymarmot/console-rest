import React, { Component } from 'react'

require('styles/molecules/forms/text-area-with-suffix.styl')

export default class TextBox extends Component {
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
        return [ 'minified-text-area', suffix ]
    }

    getFile() {
        this.props.onQuery(this.refs.inputText.value)
    }

    checkURL(ev) {
        if (ev.keyCode === 13) {
            try {
                let url = new URL(this.refs.inputText.value)
                this.getFile()
                ev.preventDefault()
            } catch (e) {
                console.log(e)
                return
            }
        }
    }

    render() {
        let classNames = this.getTextAreaClassName()

        return <div className="text-area-with-suffix">
            <textarea
                className={classNames.join(' ')}
                onChange={::this.resizeArea}
                ref="inputText"
                placeholder="or a URL or text..."
                tabIndex="1" onKeyDown={::this.checkURL}/>
            <button className="button-small"
                onClick={::this.getFile}
                tabIndex="1">GO</button>
        </div>
    }
}
