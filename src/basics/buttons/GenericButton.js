import React, { Component } from 'react'

require('./button.styl')

export default class GenericButton extends Component {

    clicked(ev) {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(ev)
        }
    }

    render() {
        let classes = 'button'
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
