import React, { Component, PropTypes } from 'react'

import GithubLogo from 'crest/basics/media/logos/GithubLogo'


export default class JSSnippet extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    renderCode() {
        return '<script ' +
            'src="https://console.rest/github.io/libs/console-rest-api.js">' +
        '</script>'
    }

    render() {
        let classes = ''
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        /* eslint-disable max-len */
        return <div className={classes}>
            <h5>Add this link to your page</h5>
            <code>{this.renderCode()}</code>
            <h5>To learn about how to use the Javascript Library, check out our github wiki</h5>
            <a href="https://github.com/luckymarmot/console-rest/wiki/using-the-js-library"
                target="_blank"
                className="snippet-action">
                <GithubLogo />
                Github Wiki
            </a>
        </div>
        /* eslint-enable max-len */
    }
}
