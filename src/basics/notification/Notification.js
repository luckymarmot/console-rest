import React, { Component } from 'react'

require('./notification.styl')

export default class Notification extends Component {
    static defaultProps = {
        dismissAfter: 2000
    }

    constructor(props) {
        super(props)

        this.state = {
            active: !!props.message,
            message: props.message,
            status: props.status
        }

        if (this.state.active) {
            this.dismissTimeout = setTimeout(
                props.onDismiss,
                props.dismissAfter
            )
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            active: !!nextProps.message,
            message: nextProps.message,
            status: nextProps.status
        })

        if (this.state.active) {
            clearTimeout(this.dismissTimeout)
            this.dismissTimeout = setTimeout(
                nextProps.onDismiss,
                nextProps.dismissAfter
            )
        } else {
            this.onDismiss()
        }
    }

    componentWillUnmount() {
        clearTimeout(this.dismissTimeout)
    }

    onDismiss() {
        this.setState({
            active: false,
            message: null,
            status: null
        })
        this.props.onDismiss()
    }

    renderStatus() {
        if (this.state.status === 200) {
            return 'OK'
        } else {
            return 'NO'
        }
    }

    render() {
        let className = 'notification'

        if (this.state.active) {
            className += ' active'
        }

        return <div className={className}>
            <div className="status">{this.renderStatus()}</div>
            <div className="message">this.state.message</div>
        </div>
    }
}
