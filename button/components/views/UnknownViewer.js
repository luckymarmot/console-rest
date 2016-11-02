import React, { Component } from 'react'

export default class UnknownViewer extends Component {
    render() {
        let classes = this.props.className
        /* eslint-disable max-len */
        return <div className={classes}>
            Unknown Content is Awesome!
        </div>
        /* eslint-enable max-len */
    }
}
