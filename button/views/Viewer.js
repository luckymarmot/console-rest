import React, { Component } from 'react'

import CodeHighlighter from '../code-highlighter/CodeHighlighter'
import WarnIcon from '../icons/WarnIcon'

require('./view.styl')

export default class Viewer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            conversionProgress: this.props.content ? 1 : 0,
            apiFlowProgress: (
                // this.props.converter.worker.apiFlowProgress
                (this.props.converter || {}).worker || {}
            ).apiFlowProgress || 0,
            apiFlowLoaded: (
                // this.props.converter.worker.apiFlowProgress >= 1
                (this.props.converter || {}).worker || {}
            ).apiFlowProgress >= 1 || false
        }

        this.viewClass = ''
        this.contentClass = ''
        this.extension = ''
        this.displayErrors = true
        this.displayLoading = true
    }

    download() {
        const link = document.createElement('a')
        /* eslint-disable no-console */
        console.log('new download system')
        if ('download' in link) {
            console.log('this supports download attr')
            let name = (this.props.name || 'api-flow') + '.' + this.extension
            link.download = name
            link.href = 'data:,' + encodeURIComponent(this.props.content)
            link.click()
        } else {
            console.log('this does not')
            link.href = 'data:application/octet-stream;base64,' +
                btoa(this.props.content)
            link.click()
        }
        /* eslint-enable no-console */
    }


    updateProgress() {
        if (
            this.props.converter &&
            this.props.converter.worker
        ) {
            this.setState({
                apiFlowProgress: this.props.converter.worker.apiFlowProgress
            })
        }
    }

    updateConversionProgress() {
        // bullshit progress
        this.setState({
            conversionProgress: 0.07 + 0.93 * this.state.conversionProgress
        })
    }

    renderLoadingPage() {
        let text
        let width
        if (this.state.apiFlowLoaded) {
            window.requestAnimationFrame(::this.updateConversionProgress)
            text = 'converting ...'
            width = Math.round(this.state.conversionProgress * 100) + '%'
        } else {
            if (this.state.apiFlowProgress < 1) {
                text = 'loading converter ...'
                window.requestAnimationFrame(::this.updateProgress)
            } else {
                text = 'converting ...'
                window.requestAnimationFrame(::this.updateConversionProgress)
            }

            width = Math.round(
                80 * this.state.apiFlowProgress +
                20 * this.state.conversionProgress
            ) + '%'
        }

        return <div className="oic-view oic-progress-view">
            {text}
            <div className="oic-progress-bar">
                <div style={{ width }}/>
            </div>
        </div>
    }

    renderActionBar() {}

    renderView() {
        let contentClasses = 'oic-view-content ' + this.contentClass
        return <div className={contentClasses}>
            <CodeHighlighter
                input={this.props.content}
                lang="yaml"/>
        </div>
    }

    renderError() {
        return <div className="oic-view oic-error-view">
            <WarnIcon className="oic-error-icon"/>
            <div className="oic-error-info">
                {this.props.error}
            </div>
        </div>
    }

    render() {
        let classes = this.props.className || ''
        classes += ' oic-view ' + this.viewClass
        let style = this.props.style || {}

        if (this.displayErrors && this.props.error) {
            return this.renderError()
        }

        /* eslint-disable max-len */
        if (this.props.content || !this.displayLoading) {
            return <div className={classes} style={style}>
                {this.renderView()}
                {this.renderActionBar()}
            </div>
        } else {
            return this.renderLoadingPage()
        }
        /* eslint-enable max-len */
    }
}
