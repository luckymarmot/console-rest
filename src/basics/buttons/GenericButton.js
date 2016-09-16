import React, { Component } from 'react'

require('./button.styl')

export default class EmptyButton extends Component {

    clicked(ev) {
        this.props.onClick(ev)
    }

    render() {
        let classes = 'large-button'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }
        /* eslint-disable max-len */
        return <div onClick={::this.clicked} className={classes}>
            {this.props.children}
        </div>
        /* eslint-enable max-len */
    }
}
