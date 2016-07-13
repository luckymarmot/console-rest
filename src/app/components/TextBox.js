import React, { Component } from 'react'

require('styles/molecules/forms/text-area-with-suffix.styl')

export default class TextBox extends Component {
    constructor() {
        super()
        this.state = {
            size: 0
        }
    }

    someFunc() {
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

    render() {
        let classNames = this.getTextAreaClassName()

        return <div className="text-area-with-suffix">
            <textarea className={classNames.join(' ')} onChange={::this.someFunc} ref="inputText"/>
            <div className="button-small">GO</div>
        </div>
    }
}
