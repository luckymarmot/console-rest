import React, { Component } from 'react'

export default class TabView extends Component {

    render() {
        let classes = 'tab-view'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        /* eslint-disable max-len */
        return <div className={classes}>
            {this.props.children}
        </div>
        /* eslint-enable max-len */
    }
}
