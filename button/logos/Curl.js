import React, { Component } from 'react'

export default class CurlLogo extends Component {
    clicked() {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(...arguments)
        }
    }

    render() {
        let classes = this.props.className
        /* eslint-disable max-len */
        return <svg className={classes}
            onClick={::this.clicked}
            viewBox="0 0 33 28" version="1.1">
            <g id="Console.rest" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Artboard" transform="translate(-459.000000, -445.000000)" fill="#2E3748">
                    <g id="Markdown-mark" transform="translate(459.000000, 445.000000)">
                        <g id="Group">
                            <polygon id="Shape" points="0.211538462 14.5714286 0.211538462 0 4.44230769 0 8.67307692 5.35714286 12.9038462 0 17.1346154 0 17.1346154 14.5714286 12.9038462 14.5714286 12.9038462 6.21428571 8.67307692 11.5714286 4.44230769 6.21428571 4.44230769 14.5714286" />
                            <polygon id="Shape" points="26.6538462 14.5714286 20.3076923 7.5 24.5384615 7.5 24.5384615 0 28.7692308 0 28.7692308 7.5 33 7.5" />
                            <text id="CURL" fontFamily="Arial-Black, Arial Black" fontSize="10.5" fontWeight="700">
                                <tspan x="0.457763672" y="27">CURL</tspan>
                            </text>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        /* eslint-enable max-len */
    }
}
