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

    updateFileAndStatus() {
        if (typeof this.props.onFileAndStatusChange === 'function') {
            this.props.onFileAndStatusChange(...arguments)
        }
    }

    moveBack() {
        window.scrollTo(0, 0)
    }

    moveForward() {
        window.scrollTo(0, window.innerHeight - 64)
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
                <div className="promo">
                    Made with <LoveImg className="promo-icon"/>
                    by Paw <PawLogo className="paw-logo"/>
                </div>
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
}
