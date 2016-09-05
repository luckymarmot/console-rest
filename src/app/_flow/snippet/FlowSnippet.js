import React, { Component } from 'react'
import Tab from 'app/components/Tab'
import Clipboard from 'clipboard'

require('styles/molecules/layout/padding.styl')
require('styles/molecules/layout/center-end.styl')
require('styles/molecules/tabs/snippet.styl')

export default class FlowSnippet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            view: 'html',
            expanded: false
        }
    }

    updateView(view) {
        this.setState({
            view: view
        })
    }

    toggleExpand() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    renderHTML() {
        // TODO
        let target = this.generateTarget()
        let ellipse = this.generateEllipse(target)
        let copy = this.generateSnippet(target)

        let action = this.state.expanded ? 'collapse' : 'expand'

        return <div className="col__stretched">
            <div className="row center-end">
                <a className="padding-small" className="copy">Copy full snippet</a>
                <a className="padding-small" onClick={::this.toggleExpand}>{action} snippet</a>
            </div>
            <textarea id="snippet" readOnly="readonly" value=
            {this.generateSnippet(ellipse)}>
            </textarea>
        </div>
    }

    generateTarget() {
        let url = this.props.url
        let content = this.props.content

        let target
        if (url) {
            return url
        }
        return btoa(content || '')
    }

    generateEllipse(target) {
        let ellipse = null
        if (!this.state.expanded && target.length > 50) {
            ellipse = target.slice(0, 50) + '...'
        }
        else {
            ellipse = target
        }
        return ellipse
    }

    generateSnippet(content) {
        let format = this.props.format
        let text = this.props.text

        let raw = ''
        if (!this.props.url) {
            raw = '   data-raw="true"\n'
        }

        return '<script src="esv98c0e9.cloudflare.com/90u32f02309/console-rest.js"></script>\n' +
            '<a class="oic-runner oic-theme"\n' +
            '   data-theme="' + this.props.theme + '"\n' +
            '   data-target="' + content + '"\n' +
            raw +
            '   data-name="' + this.props.name + '"\n' +
            '   data-source="' + format + '">' + text + '</a>'
    }

    renderJS() {
        // TODO
        return <span>JS</span>
    }

    renderMarkdown() {
        // TODO
        return <span>MD</span>
    }

    copy() {
        let target = this.generateTarget()
        let copy = this.generateSnippet(target)
        return copy
    }

    componentDidMount() {
        this.clipboard = new Clipboard('.copy', {
            text: ::this.copy
        })
    }

    render() {
        let content = null

        let renderMap = {
            html: ::this.renderHTML,
            js: ::this.renderJS,
            markdown: ::this.renderMarkdown
        }

        if (renderMap[this.state.view]) {
            content = renderMap[this.state.view]()
        }

        return <section className="content-block">
            <h3>Your Snippet</h3>
            <span>Add this snippet to your API documentation page, website, GitHub README page…</span>
            <div className="col padding">
                <div className="row__filled">
                    <Tab active={this.state.view} view="html" onClick={::this.updateView}>HTML (static)</Tab>
                    <Tab active={this.state.view} view="js" onClick={::this.updateView}>Javascript (dynamic)</Tab>
                    <Tab active={this.state.view} view="markdown" onClick={::this.updateView}>Markdown (static)</Tab>
                </div>
                <div className="row snippet">
                    {content}
                </div>
            </div>
            <span>Want more control on the style of the button for your webpage? simply replace the class “oic-theme” with
a class of your choice</span>
        </section>
    }
}
