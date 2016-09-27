import React, { Component } from 'react'

require('./button.styl')

export default class ExpandAllButton extends Component {

    clicked() {
        this.props.onClick()
    }

    render() {
        let classes = 'button'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }
        /* eslint-disable max-len */
        return <svg className={classes}
            onClick={::this.clicked}
            style={this.props.style}
            height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <title>{this.props.title}</title>
            <path d="M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z">
                <title>{this.props.title}</title>
            </path>
            <path d="M0 0h24v24H0z" fill="none">
                <title>{this.props.title}</title>
            </path>
        </svg>
        /* eslint-enable max-len */
    }
}
