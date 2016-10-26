import React, { Component } from 'react'

import TextField from 'crest/basics/inputs/TextField'
import NestedSelect from 'crest/basics/inputs/NestedSelect'

import SuccessImg from 'crest/basics/media/status/SuccessImg'
import FailureImg from 'crest/basics/media/status/FailureImg'
import WarnImg from 'crest/basics/media/status/WarnImg'

import EmptyButton from 'crest/basics/buttons/EmptyButton'

require('./editor.styl')

export default class MetadataEditor extends Component {
    static versions = [
        {
            value: { format: 'swagger', version: 'v2.0' },
            name: 'Swagger v2.0'
        },
        {
            value: { format: 'raml', version: 'v0.8' },
            name: 'RAML v0.8'
        },
        {
            value: { format: 'postman', version: 'v1.0' },
            name: 'Postman v1.0'
        },
        {
            value: { format: 'postman', version: 'v2.0' },
            name: 'Postman v2.0'
        }
    ]

    static versionMap = [
        'swagger v2.0',
        'raml v0.8',
        'postman v1.0',
        'postman v2.0'
    ]

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
            let { uri, name, content, format, version } = this.props
            this.state = {
                uri, name, content, format, version
            }
            let promise = window.ConsoleRest.ready.then(cr => {
                return cr.converter.detect('format', this.props.content)
            })
            promise.then(::this.updateFormatFromScores)
        } else {
            this.state = {
                name: null,
                format: null,
                version: null,
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
        let { uri, name, content, format, version } = nextProps
        this.setState({
            uri, name, content, format, version
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
        let _version = (format || {}).version || null
        this.setState({
            format: _format,
            version: _version,
            isFormatOk: !_status
        })

        let status = _status ? _status : {}

        if (_format && this.state.content) {
            let { name, content, uri } = this.state
            this.props.onFileAndStatusChange({
                name, content, uri,
                format: _format,
                version: _version,
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

    updateFormatFromValue(option) {
        let _format = (option.value || {}).format || null
        let _version = (option.value || {}).version || null
        this.setState({
            format: _format,
            version: _version,
            isFormatOk: true
        })

        if (_format && this.state.content) {
            let { name, content, uri } = this.state
            this.props.onFileAndStatusChange({
                name, content, uri,
                format: _format,
                version: _version
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
            let { content, uri, format, version } = this.state
            let props = {
                // file
                name, content, uri, format, version,
                // status
                code: 400, message: 'A filename is required'
            }

            this.props.onFileAndStatusChange(props)
        } else {
            let { content, uri, format, version } = this.state
            let props = { name, content, uri, format, version }
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
        const status = this.getFormatStatus()
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

        const index = MetadataEditor.versionMap.indexOf(
            this.props.format + ' ' + this.props.version
        )

        return <div className={classes}>
            <NestedSelect
                default={MetadataEditor.versions[index]}
                options={MetadataEditor.versions}
                onValueChange={::this.updateFormatFromValue}/>
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
