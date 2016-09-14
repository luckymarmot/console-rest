import React, { Component, PropTypes } from 'react'

import Notification from 'crest/basics/notification/Notification'

require('./notifier.styl')

export default class Notifier extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    static defaultProps = {
        dismissAfter: 5000,
        transitionDuration: 300,
        maxPendingNotification: 2
    }

    constructor(props) {
        super(props)

        if (
            typeof props.status === 'undefined' ||
            props.status === null
        ) {
            this.state = {
                hideCurrent: false,
                current: {},
                pendingNotifications: []
            }
        } else {
            this.state = {
                hideCurrent: false,
                current: props,
                pendingNotifications: []
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            typeof nextProps.status === 'undefined' ||
            nextProps.status === null
        ) {
            return
        }

        if (
            typeof this.state.current.status !== 'undefined' &&
            this.state.current.status !== null
        ) {
            if (
                this.state.pendingNotifications.length
                <=
                this.props.maxPendingNotification
            ) {
                this.setState({
                    pendingNotifications: this.state.pendingNotifications
                        .concat([
                            nextProps
                        ])
                })
            } else {
                let pending = this.state.pendingNotifications.slice()
                pending[pending.length - 1] = nextProps
                this.setState({
                    pendingNotifications: pending
                })
            }
        } else {
            this.setState({
                hideCurrent: false,
                current: nextProps
            })

            this.hideTimeout = setTimeout(
                ::this.hide,
                this.props.dismissAfter - this.props.transitionDuration
            )
            this.dismissTimeout = setTimeout(
                ::this.dismissed,
                this.props.dismissAfter
            )
        }
    }

    hide() {
        this.setState({
            hideCurrent: true
        })
    }

    dismissed() {
        if (this.state.pendingNotifications.length) {
            let pending = this.state.pendingNotifications.slice()
            let next = pending.shift()
            this.setState({
                hideCurrent: false,
                current: next,
                pendingNotifications: pending
            })

            this.hideTimeout = setTimeout(
                ::this.hide,
                this.props.dismissAfter - this.props.transitionDuration
            )
            this.dismissTimeout = setTimeout(
                ::this.dismissed,
                this.props.dismissAfter
            )
        } else {
            this.setState({
                hideCurrent: false,
                current: {}
            })
        }
        return null
    }

    componentWillUnmount() {
        clearTimeout(this.hideTimeout)
        clearTimeout(this.dismissTimeout)
    }

    render() {
        let classes = 'notifier'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <div className={classes}>
            <Notification
                hide={this.state.hideCurrent}
                status={this.state.current.status}
                message={this.state.current.message}/>
        </div>
    }
}
