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

        this.formats = [ 'Swagger', 'RAML', 'Curl', 'Postman v1', 'Postman v2' ]
        this.formatMap = {
            'postman-1': 'Postman v1',
            'postman-2': 'Postman v2',
            swagger: 'Swagger',
            curl: 'Curl',
            raml: 'RAML'
        }

        if (props.file) {
            this.state = {
                ...props.file.toJS()
            }
        } else {
            this.state = {
                name: null,
                format: null,
                isFormatOk: null
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps &&
            nextProps.file &&
            nextProps.file.get('content') &&
            !nextProps.file.get('format')
        ) {
            window.openInConsole.detect(
                nextProps.file.get('content'), ::this.updateFormatFromScores
            )
        }
        this.setState({
            ...nextProps.file.toJS()
        })
    }

    updateFormatFromScores(error, scores) {
        if (error) {
            this.updateFormat(null, null)
        }

        let best = null
        let bestScore = -1
        let conflictingFormat = null

        Object.keys(scores).forEach(format => {
            if (scores[format] === bestScore) {
                conflictingFormat = format
            }
            if (scores[format] > bestScore) {
                best = format
                bestScore = scores[format]
            }
        })

        if (conflictingFormat && scores[conflictingFormat] === bestScore) {
            // TODO conflicting formats
            let message = 'Multiple formats were detected as valid. ' +
                'Check that the format is correct'
            this.updateFormat(null, best, { code: 800, message })
        } else if (bestScore < 1) {
            // TODO not super confident
            let message = 'Detection score is too low. ' +
                'Check that the format is correct'
            this.updateFormat(null, best, { code: 800, message })
        } else {
            this.updateFormat(null, best)
        }
    }

    updateFormat(ev, format, _status) {
        this.setState({
            format: format,
            isFormatOk: !_status
        })

        let status = _status ? _status : {}

        if (format && this.state.content) {
            let { name, content, uri } = this.state
            this.props.onFileAndStatusChange({
                name, content, uri, format,
                ...status
            })
        } else {
            let props = {
                code: 800,
                target: this.state.name,
                message: 'No applicable file.'
            }
            this.props.onStatusChange(props)
        }
    }

    updateFilename(ev, name) {
        this.setState({
            name: name
        })

        if (name === '' && this.state.content) {
            let { content, uri, format } = this.state
            let props = {
                // file
                name, content, uri, format,
                // status
                code: 400, message: 'A filename is required'
            }

            this.props.onFileAndStatusChange(props)
        } else {
            let { content, uri, format } = this.state
            let props = { name, content, uri, format }
            this.props.onFileAndStatusChange(props)
        }
    }

    updateFilenameStatus() {
        if (this.state.name && !this.state.content) {
            let props = {
                code: 800,
                target: this.state.name,
                message: 'No file to name.'
            }
            this.props.onStatusChange(props)
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
        if (this.state.isFormatOk === false) {
            return 800
        }
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
        return null
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
                        value={this.state.name || ''}
                        placeholder="Enter a filename"
                        onChange={::this.updateFilename}
                        onSubmit={::this.updateFilenameStatus}>
                        {this.renderFilenameStatus()}
                    </TextField>
                </div>
                <div className="row-item">
                    <SelectField
                        value={this.formatMap[this.state.format]}
                        options={this.formats}
                        placeholder="File format"
                        onSubmit={::this.updateFormat}>
                        {this.renderFileFormatStatus()}
                    </SelectField>
                </div>
            </div>
        </div>
    }
}
