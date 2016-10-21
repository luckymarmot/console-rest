import React, { Component } from 'react'

require('./button.styl')

export default class EmptyButton extends Component {

    clicked(ev) {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(ev)
        }
    }

    render() {
        let classes = 'button empty'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }
        /* eslint-disable max-len */
        return <svg onClick={::this.clicked} className={classes} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <title>{this.props.title}</title>
            <path d="M0 0h24v24H0V0z" fill="none">
                <title>{this.props.title}</title>
            </path>
        </svg>
        /* eslint-enable max-len */
    }
}
