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
                <rect id="Rectangle" x="0" y="17" width="20" height="2"></rect>
                <polygon id="Path-3" points="10.0677028 0.942659442 11.7873053 4.50487086 8.33151097 4.50487086"></polygon>
                <polygon id="Path-4" points="3.62344136 13.7568012 16.2927438 13.7568012 17.7478352 16.7568012 2.07772915 16.7568012"></polygon>
                <polygon id="Path-2" points="5.31767751 10.6452239 14.7137248 10.6452239 13.1626986 7.37337782 6.92260131 7.37337782"></polygon>
            </g>
        </svg>
        /* eslint-enable max-len */
    }
}
