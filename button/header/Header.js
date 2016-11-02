import React, { Component } from 'react'

import ConsoleRestLogo from '../logos/ConsoleRest'

require('./header.styl')

export default class Header extends Component {
    close() {
        if (typeof this.props.onClose === 'function') {
            this.props.onClose(...arguments)
        }
    }

    render() {
        let classes = this.props.className || ''
        classes += ' oic-header'

        let name = this.props.name || 'API'

        const styles = {
            backgroundColor: this.props.theme || 'rgb(61, 51, 85)'
        }

        return <div className={classes} style={styles}>
            <div className="logo-container">
                <ConsoleRestLogo className="logo"/>
            </div>
            <div className="oic-header title">
                Open {name} As...
            </div>
            <div className="oic-header close" onClick={::this.close}>
                &times;
            </div>
        </div>
    }
}
