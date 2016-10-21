import React, { Component } from 'react'

import TextField from 'crest/basics/inputs/TextField'
import SelectField from 'crest/basics/inputs/SelectField'

import SuccessImg from 'crest/basics/media/status/SuccessImg'
import FailureImg from 'crest/basics/media/status/FailureImg'
import WarnImg from 'crest/basics/media/status/WarnImg'

import EmptyButton from 'crest/basics/buttons/EmptyButton'

require('./editor.styl')

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

        if (props.name || props.content) {
            let { uri, name, content, format } = this.props
            this.state = {
                uri, name, content, format
            }
            let promise = window.ConsoleRest.ready.then(cr => {
                return cr.converter.detect('format', this.props.content)
            })
            promise.then(::this.updateFormatFromScores)
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
            nextProps.content &&
            !nextProps.format
        ) {
            let promise = window.ConsoleRest.ready.then(cr => {
                return cr.converter.detect('format', nextProps.content)
            })
            promise.then(::this.updateFormatFromScores)
        }
        let { uri, name, content, format } = nextProps
        this.setState({
            uri, name, content, format
        })
    }

    updateFormatFromScores(scores) {
        /*
        if (error) {
            this.updateFormat(null, null)
        }
        */

        let best = null
        let bestScore = -1
        let conflictingFormat = null

        scores.forEach(format => {
            if (format.score === bestScore) {
                conflictingFormat = format
            }
            if (format.score > bestScore) {
                best = format
                bestScore = format.score
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
        let _format = (format || {}).format || null
        this.setState({
            format: _format,
            isFormatOk: !_status
        })

        let status = _status ? _status : {}

        if (_format && this.state.content) {
            let { name, content, uri } = this.state
            this.props.onFileAndStatusChange({
                name, content, uri,
                format: _format,
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
        let classes = 'editor'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <div className={classes}>
            <SelectField
                className="discreet-select"
                value={this.formatMap[this.state.format]}
                options={this.formats}
                placeholder="File format"
                onSubmit={::this.updateFormat}>
            {this.renderFileFormatStatus()}
            </SelectField>
            <TextField
                className="discreet"
                value={this.state.name || ''}
                placeholder="Enter a filename"
                onChange={::this.updateFilename}
                onSubmit={::this.updateFilenameStatus}>
            {this.renderFilenameStatus()}
            </TextField>
        </div>
    }
}
