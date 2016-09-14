import React, { Component } from 'react'

import TextField from 'crest/basics/inputs/TextField'
import SelectField from 'crest/basics/inputs/SelectField'

import SuccessImg from 'crest/basics/media/SuccessImg'
import FailureImg from 'crest/basics/media/FailureImg'
import WarnImg from 'crest/basics/media/WarnImg'
import EmptyButton from 'crest/basics/buttons/EmptyButton'

export default class MetadataEditor extends Component {
    constructor(props) {
        super(props)

        if (props.file) {
            this.state = {
                ...props.file
            }
        } else {
            this.state = {
                name: null,
                format: null
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps.file
        })
    }

    updateFormat(ev, format) {
        this.setState({
            format: format
        })

        if (format && this.state.content) {
            this.props.onFileAndStatusChange(
                this.state.name,
                this.state.content,
                this.state.uri,
                null,
                null,
                null,
                format
            )
        } else {
            this.props.onStatusChange(
                800,
                this.state.name,
                {
                    message: 'No applicable file.'
                }
            )
        }
    }

    updateFilename(ev, name) {
        this.setState({
            name: name
        })

        if (name === '' && this.state.content) {
            this.props.onFileAndStatusChange(
                name,
                this.state.content,
                this.state.uri,
                400,
                null,
                {
                    message: 'A filename is required'
                },
                this.state.format
            )
        } else {
            this.props.onFileAndStatusChange(
                name,
                this.state.content,
                this.state.uri,
                null,
                null,
                null,
                this.state.format
            )
        }
    }

    updateFilenameStatus() {
        if (this.state.name && !this.state.content) {
            this.props.onStatusChange(
                800,
                this.state.name,
                {
                    message: 'No file to name.'
                }
            )
        }
    }

    getFilenameStatus() {
        let name = this.state.name
        let content = this.state.content
        /* eslint-disable no-extra-parens */
        if (typeof name === 'undefined' ||
            name === null ||
            (name === '' && !content)
        ) {
            return 100
        }
        /* eslint-enable no-extra-parens */
        if (name && !content) {
            return 800
        }

        if (name === '') {
            return 400
        }

        return 200
    }

    renderFilenameStatus() {
        let status = this.getFilenameStatus()
        if (status === 200) {
            return <SuccessImg title="Filename is present"/>
        } else if (status === 400) {
            return <FailureImg title="Missing filename"/>
        } else if (status === 800) {
            return <WarnImg title="No File To Name"/>
        }
        return <EmptyButton title="No File Yet"/>
    }

    getFormatStatus() {
        let format = this.state.format
        let content = this.state.content
        /* eslint-disable no-extra-parens */
        if (
            (!format && content) || (format && !content)
        ) {
            return 800
        }

        if (!content) {
            return 100
        }
        /* eslint-enable no-extra-parens */

        return 200
    }

    renderFileFormatStatus() {
        let status = this.getFormatStatus()
        if (status === 200) {
            return <SuccessImg title="Format Selected"/>
        } else if (status === 800) {
            return <WarnImg title="No File To Name"/>
        }
        return <EmptyButton title="No File Yet"/>
    }

    render() {
        let classes = ''
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <div className={classes}>
            <h2>About Your File</h2>
            <div className="row">
                <div className="row-item">
                    <TextField
                        value={this.props.file.name}
                        placeholder="Enter a filename"
                        onChange={::this.updateFilename}
                        onSubmit={::this.updateFilenameStatus}>
                        {this.renderFilenameStatus()}
                    </TextField>
                </div>
                <div className="row-item">
                    <SelectField
                        value={this.props.file.format}
                        options={[ 'Swagger', 'RAML', 'Curl', 'Postman' ]}
                        placeholder="File format"
                        onSubmit={::this.updateFormat}>
                        {this.renderFileFormatStatus()}
                    </SelectField>
                </div>
            </div>
        </div>
    }
}
