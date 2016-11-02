import React, { Component, PropTypes } from 'react'

import Colors from 'crest/principles/Colors'


export default class MarkdownSnippet extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    static colorMap = Colors.colorMap

    renderCode() {
        let themeUrl = 'https://console.rest/github.io/assets/buttons/run_with_'
        let colorName = MarkdownSnippet.colorMap[this.props.theme] || 'red'

        themeUrl += colorName + '.svg'

        let snippet = '[![Run API With...](' +
            themeUrl +
            ')](https://console.rest/'

        let params = []

        if (this.props.name) {
            params.push('name=' + encodeURIComponent(this.props.name))
        }

        if (this.props.format) {
            params.push('format=' + encodeURIComponent(this.props.format))
        }

        if (this.props.version) {
            params.push('version=' + encodeURIComponent(this.props.version))
        }

        if (this.props.uri) {
            params.push('uri=' + encodeURIComponent(this.props.uri))
        }

        if (!this.props.uri && this.props.content) {
            params.push(
                'content=' + encodeURIComponent(btoa(this.props.content))
            )
        }

        let paramStr = ''
        if (params.length) {
            paramStr = '#?' + params.join('&')
        }

        return snippet + paramStr + ')'
    }

    render() {
        let classes = ''
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <code className={classes}>
            <pre>{this.renderCode()}</pre>
        </code>
    }
}
