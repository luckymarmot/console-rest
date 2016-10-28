import React, { Component, PropTypes } from 'react'

export default class HTMLSnippet extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    renderCode() {
        let mode = 'selector'
        let modeLine = '    data-selector="oic-content"\n'
        let contentLine = ''
        if (this.props.uri) {
            mode = 'url'
            modeLine = '    data-url="' + this.props.uri + '"\n'
        } else {
            contentLine = '\n' +
            '<script id="oic-content">\n' +
            (
                this.props.content ||
                '// paste your swagger / raml / curl / etc. here'
            ) + '\n' +
            '</script>'
        }

        /* eslint-disable max-len */
        return '' +
            '<a className="oic-runner oic-theme"\n' +
            '    data-theme="' + this.props.theme + '"\n' +
            '    data-mode="' + mode + '"\n' +
            modeLine +
            '    data-name="' + (this.props.name || '') + '"\n' +
            '    data-source="' + (this.props.format || '') + '">' +
                this.props.text +
            '</a>\n' +
            '<script src="https://console.rest/github.io/libs/console-rest-visual.js"></script>' +
            contentLine
        /* eslint-enable max-len */
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
