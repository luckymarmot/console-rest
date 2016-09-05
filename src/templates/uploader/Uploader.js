import React, { Component, PropTypes } from 'react'

import DropArea from 'crest/basics/dragdrop/DropArea'
import DropImg from 'crest/basics/media/DropImg'

require('../../basics/layout/content.styl')

export default class Uploader extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    constructor(props) {
        super(props)
    }

    uploadFile(file) {
        console.log('got file', file)
    }

    render() {
        let classes = ''
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <div className={classes}>
            <h2>Import Your File</h2>
            <DropArea onFileDrop={::this.uploadFile}>
                <img src="basics/media/drop-area-img.svg"/>
            </DropArea>
            <div data-future="SearchField"/>
            <div data-future="TextArea"/>
        </div>
    }
}
