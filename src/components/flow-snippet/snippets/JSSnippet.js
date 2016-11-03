import React, { Component, PropTypes } from 'react'

import GithubLogo from 'crest/basics/media/logos/GithubLogo'


export default class JSSnippet extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    render() {
        let classes = ''
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        /* eslint-disable max-len */
        return <div className={classes}>
            <h5>Add this link to your page</h5>
            <code>{'<script src="https://console.rest/github.io/libs/console-rest-api.js"></script>'}</code>
            To learn about how to use the Javascript Library, check out our
            <div className="snippet-action">
                <GithubLogo />
                Github Wiki!
            </div>
        </div>
        /* eslint-enable max-len */
    }
}
