import React, { Component, PropTypes } from 'react'

import Colors from 'crest/principles/Colors'

export default class HTMLSnippet extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    static colorMap = Colors.colorMap

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

        const colorName = HTMLSnippet.colorMap[this.props.theme] || 'red'
        const buttonUrl =
            'https://console.rest/github.io/assets/buttons/run_with_' +
            colorName + '.svg'

        /* eslint-disable max-len */
        return '' +
            '<a class="oic-button"\n' +
            '    data-theme="' + this.props.theme + '"\n' +
            '    data-mode="' + mode + '"\n' +
            modeLine +
            '    data-name="' + (this.props.name || '') + '"\n' +
            '    data-source-format="' + (this.props.format || '') + '"\n' +
            '    data-source-version="' + (this.props.version || '') + '">\n' +
            '    <img src="' + buttonUrl + '" style="border: none;" />\n' +
            '</a>\n' +
            '<script src="https://console.rest/github.io/libs/console-rest.js"></script>' +
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
