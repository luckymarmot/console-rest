import React, { Component } from 'react'

export default class CopyImg extends Component {
    clicked() {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(...arguments)
        }
    }

    render() {
        let fill = this.props.fill || null

        let classes = this.props.className || null
        /* eslint-disable max-len */
        return <svg className={classes} fill={fill} onClick={::this.clicked}
            height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>
        /* eslint-enable max-len */
    }
}
