import React, { Component } from 'react'

require('./helper-content.styl')

export default class ConsoleHelper extends Component {

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
                Mission Statement
            </div>
        </div>
        /* eslint-enable max-len */
    }
}
