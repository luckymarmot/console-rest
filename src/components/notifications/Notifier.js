import React, { Component, PropTypes } from 'react'

import Notification from 'crest/basics/notification/Notification'

export default class Notifier extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    render() {
        let classes = ''
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <div className={classes}>
            <Notification
                status={this.props.status}
                message={this.props.message}/>
        </div>
    }
}
