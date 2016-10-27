import React, { Component } from 'react'

import Clipboard from 'clipboard'

import TabViewer from 'crest/components/tabs/TabViewer'
import TabView from 'crest/components/tabs/TabView'

import HTMLSnippet from './HTMLSnippet'
import JSSnippet from './snippets/JSSnippet'

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
            view: this.constructor.views[0]
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

    updateView(ev, view) {
        this.setState({
            view: view
        })
    }

    renderView() {
        if (this.state.view === 'as HTML') {
            return <HTMLSnippet ref="rendered"
                name={this.props.name}
                content={this.props.content}
                url={this.props.url}
                format={this.props.format}
                theme={this.props.theme}
                text={this.props.text}/>
        }
        return null
    }

    render() {
        let classes = 'snippet-container'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <TabViewer className={classes} default="HTML">
                <TabView title="HTML">
                    <HTMLSnippet className="snippet" ref="rendered"
                        name={this.props.name}
                        content={this.props.content}
                        url={this.props.url}
                        format={this.props.format}
                        theme={this.props.theme}
                        text={this.props.text}/>
                </TabView>
                <TabView title="Javascript">
                    <JSSnippet className="snippet" ref="rendered"
                        name={this.props.name}
                        content={this.props.content}
                        url={this.props.url}
                        format={this.props.format}
                        theme={this.props.theme}
                        text={this.props.text}/>
                </TabView>
                <TabView title="Markdown"/>
            </TabViewer>
            /*
            <div className={classes}>
                <div className="row">
                    <SelectField
                        className="row-item"
                        value={this.state.view}
                        options={this.constructor.views}
                        placeholder="Generate Snippet As"
                        onSubmit={::this.updateView}/>
                    <GenericButton className="row-item copy">
                        Copy
                    </GenericButton>
                </div>
                <div className="snippet">
                    {this.renderView()}
                </div>
            </div>
            */
    }
}
