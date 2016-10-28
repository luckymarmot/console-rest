import React, { Component, PropTypes } from 'react'

export default class JSSnippet extends Component {
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
        return 'Add this link to your page:\n\n' +
            '<script src="https://console.rest/github.io/libs/console-rest-api.js"></script>\n\n' +
            'Setting the theme\n' +
            '    data-theme="' + this.props.theme + '"\n' +
            '    data-target="' + target + '"\n' +
            '    data-mode="' + mode + '"\n' +
            '    data-name="' + (this.props.name || '') + '"\n' +
            '    data-source="' + (this.props.format || '') + '">' +
                this.props.text +
            '</a>\n' +
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

        /* eslint-disable max-len */
        return <div className={classes}>
            <h5>Add this link to your page</h5>
            <code>{'<script src="my-super-link.com/console-rest.js"></script>'}</code>
            <div className="">
                <h5>Detecting format</h5>
                <code>
                    window.openInConsole.detect(fileContent, (err, data) => {})
                </code>
                <h5>Converting data</h5>
                <code>
                    window.openInConsole.generateContent(targetFormat, options)
                </code>
                <h5>Opening the modal</h5>
                <code>
                    window.openInConsole.open(fileName, fileContent, fileFormat, mode)
                </code>
                <h5>Setting the source file</h5>
                <code>
                    window.openInConsole.setSourceFile(fileContent, fileFormat, mode)
                </code>
                <h5>Setting the theme</h5>
                <code>
                    window.openInConsole.setTheme(color)
                </code>
                <h5>Setting the name</h5>
                <code>
                    window.openInConsole.setName(fileName)
                </code>
                <h5>Setting the global callback</h5>
                <code>
                    window.openInConsole.setGlobalCallback((err, data) => {})
                </code>
            </div>
        </div>
        /* eslint-enable max-len */
    }
}
