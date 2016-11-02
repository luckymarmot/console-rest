import React, { Component } from 'react'

require('../image.styl')

export default class SuccessImg extends Component {
    render() {
        let classes = 'img warning'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        const height = this.props.height || this.props.width || 24
        const width = this.props.width || this.props.height || 24
        /* eslint-disable max-len */
        return <svg className={classes}
            height={height} width={width}
            viewBox="0 0 24 24">
            <title>{this.props.title}</title>
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z">
                <title>{this.props.title}</title>
            </path>
            <path d="M0 0h24v24H0z" fill="none">
                <title>{this.props.title}</title>
            </path>
        </svg>
        /* eslint-enable max-len */
    }
}
