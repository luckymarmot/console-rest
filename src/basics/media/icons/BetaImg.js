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
            <g id="Icon" transform="translate(2.000000, 2.000000)">
                <rect id="Rectangle" x="0" y="17.863315" width="20" height="2.136685"></rect>
                <polygon id="Path-3" points="8.79731809 0 11.1889687 0 12.3436288 2.82460277 7.64109986 2.82460277"></polygon>
                <polygon id="Path-3" points="6.49107344 5.65593087 13.5070933 5.65593087 14.6612451 8.48053364 5.34008683 8.48053364"></polygon>
                <polygon id="Path-3" points="4.17735073 11.3118617 15.8151463 11.3118617 16.9746801 14.1364645 3.01013025 14.1364645"></polygon>
                <polygon id="Path-3" points="1.8573777 16.9677926 18.1266986 16.9677926 19.2841028 19.7923954 0.694645441 19.7923954"></polygon>
            </g>
        </svg>
        /* eslint-enable max-len */
    }
}
