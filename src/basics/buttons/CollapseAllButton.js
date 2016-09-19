import React, { Component } from 'react'

require('./button.styl')

export default class CollapseAllButton extends Component {

    clicked() {
        this.props.onClick()
    }

    render() {
        let classes = 'button'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }
        /* eslint-disable max-len */
        return <svg onClick={::this.clicked} className={classes} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <title>{this.props.title}</title>
            <path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z">
                <title>{this.props.title}</title>
            </path>
            <path d="M0 0h24v24H0V0z" fill="none">
                <title>{this.props.title}</title>
            </path>
        </svg>
        /* eslint-enable max-len */
    }
}
