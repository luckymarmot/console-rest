import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'

import Notification from 'crest/basics/notification/Notification'

require('./notifier.styl')

export default class Notifier extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    static defaultProps = {
        dismissAfter: 3000,
        transitionDuration: 300,
        maxPendingNotification: 2
    }

    constructor(props) {
        super(props)

        if (
            typeof props.notification === 'undefined' ||
            props.notification === null ||
            typeof props.notification.get !== 'function' ||
            typeof props.notification.get('code') === 'undefined' ||
            props.notification.get('code') === null
        ) {
            this.state = {
                hideCurrent: false,
                current: new Immutable.Map(),
                pendingNotifications: []
            }
        } else {
            this.state = {
                hideCurrent: false,
                current: props.notification,
                pendingNotifications: []
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            typeof nextProps.notification === 'undefined' ||
            nextProps.notification === null ||
            typeof nextProps.notification.get !== 'function' ||
            typeof nextProps.notification.get('code') === 'undefined' ||
            nextProps.notification.get('code') === null
        ) {
            return
        }

        if (
            typeof this.state.current.get('code') !== 'undefined' &&
            this.state.current.get('code') !== null
        ) {
            if (
                this.state.pendingNotifications.length
                <=
                this.props.maxPendingNotification
            ) {
                this.setState({
                    pendingNotifications: this.state.pendingNotifications
                        .concat([
                            nextProps.notification
                        ])
                })
            } else {
                let pending = this.state.pendingNotifications.slice()
                pending[pending.length - 1] = nextProps.notification
                this.setState({
                    pendingNotifications: pending
                })
            }

            this.reset()
        } else {
            this.setState({
                hideCurrent: false,
                current: nextProps.notification
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
                current: new Immutable.Map()
            })
        }
        return null
    }

    reset() {
        this.hold()
        this.release()
    }

    hold() {
        clearTimeout(this.hideTimeout)
        clearTimeout(this.dismissTimeout)
    }

    release() {
        this.hideTimeout = setTimeout(
            ::this.hide,
            this.props.dismissAfter - this.props.transitionDuration
        )
        this.dismissTimeout = setTimeout(
            ::this.dismissed,
            this.props.dismissAfter
        )
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

        let status = null
        let message = null
        if (this.state.current) {
            status = this.state.current.get('code')
            message = this.state.current.get('message')
        }

        return <div className={classes}>
            {this.props.children}
            <Notification
                onClick={::this.reset}
                onMouseEnter={::this.hold}
                onMouseLeave={::this.release}
                hide={this.state.hideCurrent}
                status={status}
                message={message}/>
        </div>
    }
}
