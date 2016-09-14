import React, { Component } from 'react'

import SuccessImg from 'crest/basics/media/SuccessImg'
import FailureImg from 'crest/basics/media/FailureImg'
import WarnImg from 'crest/basics/media/WarnImg'

require('./notification.styl')

export default class Notification extends Component {
    constructor(props) {
        super(props)
    }

    renderStatus() {
        if (this.props.status === 200) {
            return <SuccessImg title="Success"/>
        } else if (this.props.status === 800) {
            return <WarnImg title="Warning"/>
        } else {
            return <FailureImg title="Error"/>
        }
    }

    render() {
        let className = 'notification'

        if (this.props.status && !this.props.hide) {
            className += ' active'
        }

        return <div className={className}>
            <div className="status">{this.renderStatus()}</div>
            <div className="message">{this.props.message}</div>
        </div>
    }
}
