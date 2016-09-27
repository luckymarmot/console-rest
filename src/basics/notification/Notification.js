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

    clicked(ev) {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(ev)
        }
    }

    mouseEntered(ev) {
        if (typeof this.props.onMouseEnter === 'function') {
            this.props.onMouseEnter(ev)
        }
    }

    mouseLeft(ev) {
        if (typeof this.props.onMouseLeave === 'function') {
            this.props.onMouseLeave(ev)
        }
    }

    render() {
        let className = 'notification'

        if (this.props.status && !this.props.hide) {
            className += ' active'
        }

        return <div className={className}
            onClick={::this.clicked}
            onMouseEnter={::this.mouseEntered}
            onMouseLeave={::this.mouseLeft}>
            <div className="status">{this.renderStatus()}</div>
            <div className="message">{this.props.message}</div>
        </div>
    }
}
