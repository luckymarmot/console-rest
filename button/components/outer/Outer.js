import React, { Component } from 'react'

import Modal from '../modal/Modal'

export default class OuterContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true,
            hidden: false
        }
    }

    componentWillReceiveProps() {
        this.setState({
            open: true,
            hidden: false
        })
    }

    close(ev) {
        if (ev.target === this.refs.outer || ev.target === this.refs.middle) {
            this.setState({
                open: false,
                hidden: false
            })
        }
    }

    forceClose() {
        this.setState({
            open: false,
            hidden: false
        })
    }

    animationFinished() {
        if (this.state.open) {
            this.setState({
                hidden: false
            })
        } else {
            this.setState({
                hidden: true
            })
        }
    }

    render() {
        let style = {
            display: this.state.hidden ? 'none' : 'flex',
            opacity: this.state.open ? 1 : 0,
            zIndex: 1000000
        }

        let classes = this.state.open ? 'fadein' : 'fadeout'

        return <div ref="outer" className="oic-outer" style={style}
            onClick={::this.close}>
            <div ref="middle" className="oic-middle" onClick={::this.close}>
                <Modal className={classes}
                    params={this.props.params}
                    converter={this.props.converter}
                    onClose={::this.forceClose}
                    onAnimationEnd={::this.animationFinished}/>
            </div>
        </div>
    }
}
