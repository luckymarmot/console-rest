import React, { Component, PropTypes } from 'react'

export default class HTMLSnippet extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    renderCode() {
        let mode = 'id'
        let target = 'oic-content'
        if (this.props.url) {
            mode = 'remote'
            target = this.props.url
        }

        /* eslint-disable max-len */
        return '' +
            '<a className="oic-runner oic-theme"\n' +
            '    data-theme="' + this.props.theme + '"\n' +
            '    data-target="' + target + '"\n' +
            '    data-mode="' + mode + '"\n' +
            '    data-name="' + (this.props.name || '') + '"\n' +
            '    data-source="' + (this.props.format || '') + '">' +
                this.props.text +
            '</a>\n' +
            '<script src="https://console.rest/github.io/libs/console-rest.js"></script>\n' +
            '<script id="oic-content">\n' +
            (
                this.props.content ||
                '// paste your swagger / raml / curl / etc. here'
            ) + '\n' +
            '</script>'
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
