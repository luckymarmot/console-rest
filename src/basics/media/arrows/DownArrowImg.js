import React, { Component } from 'react'

require('../image.styl')

export default class SuccessImg extends Component {
    clicked(ev) {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(ev)
        }
    }

    render() {
        let classes = 'img white'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }
        /* eslint-disable max-len */
        return <svg className={classes}
            onClick={::this.clicked}
            style={this.props.style}
            height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <title>{this.props.title}</title>
            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z">
                <title>{this.props.title}</title>
            </path>
            <path d="M0 0h24v24H0z" fill="none">
                <title>{this.props.title}</title>
            </path>
        </svg>
        /* eslint-enable max-len */
    }
}
