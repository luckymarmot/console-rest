import React, { Component } from 'react'

import MetadataEditor from 'crest/components/metadata-editor/MetadataEditor'

import PawLogo from 'crest/basics/media/logos/PawLogo'
import LoveImg from 'crest/basics/media/icons/LoveImg'
import LeftArrow from 'crest/basics/media/arrows/LeftArrow'

require('./status-bar.styl')

export default class StatusBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: this.props.active || false
        }

        if (this.props.content || this.props.byPass) {
            this.moveForward()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.content && !this.state.active) {
            this.setState({
                active: true
            })
        }

        if (!nextProps.content && this.state.active) {
            this.setState({
                active: false
            })
        }

        if (nextProps.content || nextProps.byPass) {
            this.moveForward()
        }
    }

    updateFile() {
        if (typeof this.props.onFileChange === 'function') {
            this.props.onFileChange(...arguments)
        }
    }

    updateStatus() {
        if (typeof this.props.onStatusChange === 'function') {
            this.props.onStatusChange(...arguments)
        }
    }

    updateFileAndStatus(props) {
        if (typeof this.props.onFileAndStatusChange === 'function') {
            this.props.onFileAndStatusChange({
                ...props,
                open: this.props.open
            })
        }
    }

    scrollTo(frameCount, initial, target, _maxFrameCount) {
        const maxFrameCount = _maxFrameCount || frameCount
        if (frameCount <= 0) {
            return
        }

        const diff = {
            x: target.x - initial.x,
            y: target.y - initial.y
        }

        return () => {
            const coeff = (maxFrameCount - frameCount) / maxFrameCount
            const step = {
                x: -diff.x * coeff * (coeff - 2) + initial.x,
                y: -diff.y * coeff * (coeff - 2) + initial.y
            }

            window.scrollTo(step.x, step.y)
            if (frameCount > 1) {
                window.requestAnimationFrame(
                    this.scrollTo(
                        frameCount - 1,
                        initial,
                        target,
                        maxFrameCount
                    )
                )
            }
        }
    }

    moveBack() {
        this.scrollTo(30, {
            x: window.pageXOffset,
            y: window.pageYOffset
        }, {
            x: 0,
            y: 0
        })()
    }

    moveForward() {
        this.scrollTo(60, {
            x: window.pageXOffset,
            y: window.pageYOffset
        }, {
            x: 0,
            y: window.innerHeight - 64
        })()
    }

    renderStatusBar() {
        if (this.state.active === false) {
            return <div className="status-bar">
                <div className="promo">
                    Made with <LoveImg className="promo-icon"/>
                    by Paw <PawLogo className="paw-logo"/>
                </div>
            </div>
        }

        let { url, name, content, format } = this.props
        let file = { url, name, content, format }

        return <div className="status-bar">
            <div className="back" onClick={::this.moveBack}>
                <LeftArrow className="img"/> Change API
            </div>
            <div className="center">
                <MetadataEditor file={file}
                    onFileChange={::this.updateFile}
                    onStatusChange={::this.updateStatus}
                    onFileAndStatusChange={::this.updateFileAndStatus}/>
            </div>
            <div className="promo">
                Made with <LoveImg className="promo-icon"/>
                by Paw <PawLogo className="paw-logo"/>
            </div>
        </div>
    }

    render() {
        let classes = 'status-bar'
        if (this.props.classes) {
            classes += ' ' + this.props.classes
        }

        if (this.state.active === false) {
            return <div className={classes}>
                <a href="https://paw.cloud" target="_blank" className="promo">
                    Made with <LoveImg className="promo-icon"/>
                    by Paw <PawLogo className="paw-logo"/>
                </a>
            </div>
        }

        // this.state.active === true
        classes += ' active'
        return <div className={classes}>
            <div className="back" onClick={::this.moveBack}>
                <LeftArrow className="img"/> Change API
            </div>
            <div className="center">
                <MetadataEditor
                    uri={this.props.uri}
                    name={this.props.name}
                    content={this.props.content}
                    format={this.props.format}
                    version={this.props.version}
                    onFileChange={::this.updateFile}
                    onStatusChange={::this.updateStatus}
                    onFileAndStatusChange={::this.updateFileAndStatus}/>
            </div>
            <a href="https://paw.cloud" target="_blank" className="promo">
                Made with <LoveImg className="promo-icon"/>
                by Paw <PawLogo className="paw-logo"/>
            </a>
        </div>
    }
}
