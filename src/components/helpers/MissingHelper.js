import React, { Component } from 'react'

import GithubLogo from 'crest/basics/media/logos/GithubLogo'

require('./helper-content.styl')

export default class MissingHelper extends Component {

    actionClicked(ev) {
        if (typeof this.props.onActionClick === 'function') {
            this.props.onActionClick(ev)
        }
    }

    render() {
        let classes = 'helper-content'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        /* eslint-disable max-len */
        return <div className={classes}>
            <div className="missing-support">
                Console.REST aims at being as universal as possible.
                If your favorite format or client is missing, you can let us
                know here:
                <a className="action-row"
                    href="https://github.com/luckymarmot/console-rest/issues/12"
                    target="_blank">
                    <GithubLogo/>
                    Github Issue
                </a>
            </div>
        </div>
        /* eslint-enable max-len */
    }
}
