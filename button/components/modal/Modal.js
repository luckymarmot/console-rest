import React, { Component } from 'react'

import Header from '../header/Header'
import SelectionPage from '../pages/SelectionPage'
import MainPage from '../pages/MainPage'

require('./modal.styl')

export default class Modal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: (this.props.converter.target || {}).format || 'selection',
            name: this.props.converter.name || null,
            format: null,
            content: null
        }
    }

    componentDidMount() {
        this.updateContentIfNeeded(this.props.params)
    }

    componentWillReceiveProps(nextProps) {
        this.updateContentIfNeeded(nextProps.params)
    }

    updateContentIfNeeded(params) {
        if (this.contentNeedsToBeLoaded(params)) {
            this.contentLoaded = this.props.converter
                .set(params)
                .load()
                .then(content => {
                    this.setState({ content })
                    this.props.converter.detect('name')
                        .then(name => {
                            this.setState({
                                name
                            })
                        })

                    this.props.converter.detect('format')
                        .then(formats => {
                            const format = this.findBestFormat(formats)
                            this.setState({
                                format
                            })
                        })
                }, error => {
                    /* eslint-disable no-console */
                    console.log('failed to load', error)
                    /* eslint-enable no-console */
                })
        } else {
            this.setState({
                content: this.props.converter.content
            })

            if (!this.props.converter.name) {
                this.props.converter.detect('name').then(name => {
                    this.setState({
                        name
                    })
                })
            } else {
                this.setState({
                    name: this.props.converter.name
                })
            }

            if (!this.props.converter.source) {
                this.props.converter.detect('format').then(formats => {
                    const format = this.findBestFormat(formats)

                    this.setState({
                        format
                    })
                })
            } else {
                this.setState({
                    format: this.props.converter.source
                })
            }
        }
    }

    contentNeedsToBeLoaded(futureProps) {
        let contentNeedsToBeLoaded = !this.props.converter.content &&
            this.props.converter.mode
        let modeChange = futureProps && futureProps.mode &&
            this.props.converter.mode !== futureProps.mode
        let urlChange = futureProps &&
            this.props.converter.mode === 'url' &&
            (this.props.converter.url || null) !== (futureProps.url || null)
        let selectorChange = futureProps &&
            this.props.converter.mode === 'selector' &&
            futureProps.selector &&
            (this.props.converter.selector || null)
                !==
            (futureProps.selector || null)
        let textChange = futureProps &&
            this.props.converter.mode === 'text' &&
            futureProps.url &&
            (this.props.converter.text || null) !== (futureProps.text || null)

        return contentNeedsToBeLoaded ||
            modeChange ||
            urlChange ||
            selectorChange ||
            textChange
    }

    findBestFormat(formats) {
        let best = {
            score: -1
        }

        formats.forEach(format => {
            if (format.score >= best.score) {
                best = format
            }
        })

        return best.format
    }

    updateView(view) {
        this.setState({ view })
    }

    close() {
        if (typeof this.props.onClose === 'function') {
            this.props.onClose(...arguments)
        }
    }

    animationFinished() {
        if (typeof this.props.onAnimationEnd === 'function') {
            this.props.onAnimationEnd(...arguments)
        }
    }

    renderPage() {
        if (this.state.view === 'selection') {
            return <SelectionPage className="oic-page"
                onPageClick={::this.updateView}/>
        }

        return <MainPage className="oic-page"
            theme={(this.props.params || {}).theme}
            content={this.state.content}
            converter={this.props.converter}
            view={this.state.view}
            name={this.state.name}
            source={this.state.format}/>
    }

    render() {
        let classes = this.props.className || ''
        classes += ' oic oic-modal-content'

        const theme = (this.props.params || {}).theme

        return <div className={classes}
            onAnimationEnd={::this.animationFinished}>
            <Header className="oic-header"
                name={this.state.name}
                theme={theme}
                onClose={::this.close}/>
            {this.renderPage()}
        </div>
    }
}
