import React, { Component } from 'react'

import HTMLSnippet from './HTMLSnippet'
import SelectField from 'crest/basics/inputs/SelectField'
import GenericButton from 'crest/basics/buttons/GenericButton'

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

    updateView(ev, view) {
        this.setState({
            view: view
        })
    }

    renderView() {
        if (this.state.view === 'as HTML') {
            return <HTMLSnippet
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
        let classes = ''
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <div className={classes}>
            <h2>Your Code Snippet</h2>
            <div className="row">
                <SelectField
                    className="row-item"
                    value={this.state.view}
                    options={this.constructor.views}
                    placeholder="Generate Snippet As"
                    onSubmit={::this.updateView}/>
                <div className="row-item row">
                    <GenericButton className="row-item">
                        Copy
                    </GenericButton>
                    <GenericButton className="row-item">
                        Collapse
                    </GenericButton>
                </div>
            </div>
            <div className="snippet">
                {this.renderView()}
            </div>
        </div>
    }
}
