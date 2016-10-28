import React, { Component } from 'react'

export default class PawLogo extends Component {
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
            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
            <path d="M0-.5h24v24H0z" fill="none"/>
        </svg>
        /* eslint-enable max-len */
    }
}
