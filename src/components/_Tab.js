import React, { Component } from 'react'

require('styles/molecules/tabs/tabs.styl')

export default class Tab extends Component {

    propagate() {
        this.props.onClick(this.props.view)
    }

    render() {
        let classes = 'tab'

        if (this.props.active === this.props.view) {
            classes += ' active'
        }
        return <div className={classes} onClick={::this.propagate}>{this.props.children}</div>
    }
}
