import React, { Component } from 'react'

require('./helper-content.styl')

export default class CurlHelper extends Component {

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
            <div className="console-support">
                Curl Statement
            </div>
        </div>
        /* eslint-enable max-len */
    }
}
