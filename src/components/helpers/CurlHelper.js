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
            <div className="curl-support">
                <span>
                Console.REST can convert curl commands, but does not support
                shell variables interpolation.
                </span>
                <span>
                Console.REST also supports most
                curl options, except for the fancier ones.
                </span>
            </div>
        </div>
        /* eslint-enable max-len */
    }
}
