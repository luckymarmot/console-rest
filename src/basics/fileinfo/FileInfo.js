import React, { Component, PropTypes } from 'react'

import EmptyButton from 'crest/basics/buttons/EmptyButton'
import DeleteButton from 'crest/basics/buttons/DeleteButton'

require('./file-info.styl')

export default class FileInfo extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    deleteFile() {
        this.props.onDeleteFile(this.props.file)
    }

    render() {
        let classes = 'file-info '
        if (this.props.className) {
            classes += this.props.className
        }

        return <div className={classes}>
            <EmptyButton/>
            {this.props.file}
            <DeleteButton onClick={::this.deleteFile} title="Delete File"/>
        </div>
    }
}
