import React, { Component } from 'react'

import Clipboard from 'clipboard'

import TabViewer from 'crest/components/tabs/TabViewer'
import TabView from 'crest/components/tabs/TabView'

import HTMLSnippet from './snippets/HTMLSnippet'
import JSSnippet from './snippets/JSSnippet'
import MarkdownSnippet from './snippets/MarkdownSnippet'

import CopyImg from 'crest/basics/media/icons/CopyImg'

require('./snippet.styl')

export default class FlowSnippet extends Component {
    static views = [
        'as HTML',
        'as Javascript',
        'as Markdown'
    ]

    constructor(props) {
        super(props)

        this.state = {
            feedback: false
        }
    }

    copy() {
        let copy = this.refs.rendered
        return copy.renderCode()
    }

    componentDidMount() {
        this.clipboard = new Clipboard('.copy', {
            text: ::this.copy
        })
    }

    endFeedback() {
        this.setState({
            feedback: false
        })
    }

    giveFeedback() {
        if (this.feedbackTimer) {
            clearTimeout(this.feedbackTimer)
        }

        this.setState({
            feedback: true
        })

        this.feedbackTimer = setTimeout(::this.endFeedback, 300)
    }

    componentWillUnmount() {
        clearTimeout(this.feedbackTimer)
    }

    render() {
        let classes = 'snippet-container'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        const feedbackClass = 'snippet-copy-button copy' +
            (this.state.feedback ? ' feedback' : '')

        return <TabViewer className={classes} default="HTML">
                <TabView title="HTML">
                    <HTMLSnippet className="snippet" ref="rendered"
                        name={this.props.name}
                        content={this.props.content}
                        uri={this.props.uri}
                        format={this.props.format}
                        theme={this.props.theme}
                        text={this.props.text}/>
                    <div className={feedbackClass}
                        onClick={::this.giveFeedback}>
                        <CopyImg/>
                    </div>
                </TabView>
                <TabView title="Javascript">
                    <JSSnippet className="snippet" ref="rendered"
                        name={this.props.name}
                        content={this.props.content}
                        uri={this.props.uri}
                        format={this.props.format}
                        theme={this.props.theme}
                        text={this.props.text}/>
                    <div className={feedbackClass}
                        onClick={::this.giveFeedback}>
                        <CopyImg/>
                    </div>
                </TabView>
                <TabView title="Markdown">
                    <MarkdownSnippet className="snippet" ref="rendered"
                        name={this.props.name}
                        content={this.props.content}
                        uri={this.props.uri}
                        format={this.props.format}
                        theme={this.props.theme}
                        version={this.props.version}/>
                    <div className={feedbackClass}
                        onClick={::this.giveFeedback}>
                        <CopyImg/>
                    </div>
                </TabView>
            </TabViewer>
    }
}
