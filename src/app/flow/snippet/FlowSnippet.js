import React, { Component } from 'react'
import Tab from 'app/components/Tab'

require('styles/molecules/layout/padding.styl')
require('styles/molecules/layout/center-end.styl')
require('styles/molecules/tabs/snippet.styl')

export default class FlowSnippet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            view: 'html'
        }
    }

    updateView(view) {
        this.setState({
            view: view
        })
    }

    renderHTML() {
        // TODO
        let url = this.props.url
        let content = this.props.content

        let target
        if (url) {
            target = url
        }
        else {
            target = encodeURIComponent(content)
        }

        let format = this.props.format
        let text = this.props.text
        return <div className="col__stretched">
            <div className="row center-end">
                <a className="padding-small">Copy snippet</a>
                <a className="padding-small">See full snippet</a>
            </div>
            <pre>
            {`<script src="esv98c0e9.cloudflare.com/90u32f02309/console-rest.js"></script>
<a class="oic-runner oic-theme"
    data-target="` + target + `"
    data-source="` + format + '">' + text + '</a>'}
            </pre>
        </div>
    }

    renderJS() {
        // TODO
        return <span>JS</span>
    }

    renderMarkdown() {
        // TODO
        return <span>MD</span>
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
