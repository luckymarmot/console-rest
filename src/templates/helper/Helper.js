import React, { Component, PropTypes } from 'react'

import CollapseAllButton from 'crest/basics/buttons/CollapseAllButton'
import ExpandAllButton from 'crest/basics/buttons/ExpandAllButton'
import ResetExpansionButton from 'crest/basics/buttons/ResetExpansionButton'
import Collapsible from 'crest/components/collapsible/Collapsible'

require('./helper.styl')

export default class Helper extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    constructor(props) {
        super(props)

        this.state = {
            expandPaw: true,
            expandPostman: true,
            expandRaml: false,
            expandRaml2: false,
            expandRaml3: true,
            expandRaml4: false,
            expandRaml5: true
        }
    }

    resetExpand() {
        this.setState({
            expandPaw: true,
            expandPostman: true,
            expandRaml: false,
            expandRaml2: false,
            expandRaml3: true,
            expandRaml4: false,
            expandRaml5: true
        })
    }

    expandAll() {
        let state = {}

        Object.keys(this.state).forEach(key => {
            state[key] = true
        })

        this.setState(state)
    }

    collapseAll() {
        let state = {}

        Object.keys(this.state).forEach(key => {
            state[key] = false
        })

        this.setState(state)
    }

    render() {
        let classes = 'helper'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <div className={classes}>
            <div className="controls">
                <ResetExpansionButton className="img" title="Reset To Default"
                    onClick={::this.resetExpand}/>
                <ExpandAllButton className="img" title="Expand All"
                    onClick={::this.expandAll}/>
                <CollapseAllButton className="img" title="Collapse All"
                    onClick={::this.collapseAll}/>
            </div>
            <Collapsible title="Importing from Paw"
                expanded={this.state.expandPaw}>
                <div>
                    Have Paw and want to convert a project?
                </div>
                <div>
                    <a>Click here</a>
                </div>
            </Collapsible>
            <Collapsible title="Importing from Postman"
                expanded={this.state.expandPostman}>
                <div>
                    There are many ways to export data from Postman.
                    You can export collections, environments, and dumps of both.
                </div>
                <div>
                    Console.rest supports all possible types of files Postman
                    can generate but we strongly encourage you to use Postman
                    dumps, as they are the most extensive file format.
                </div>
                <div>
                    How to get a Postman Dump in 3 steps
                </div>
                <div>
                    Open the settings menu
                </div>
                <div>
                    Click on data, and select export all.
                </div>
            </Collapsible>
            <Collapsible title="What is RAML?"
                expanded={this.state.expandRaml}>
                <div>
                    RAML is Swagger made by people who did not know
                    the words flexibility and extensibility.
                </div>
            </Collapsible>
            <Collapsible title="What is RAML?"
                expanded={this.state.expandRaml2}>
                <div>
                    RAML is Swagger made by people who did not know
                    the words flexibility and extensibility.
                </div>
            </Collapsible>
            <Collapsible title="What is RAML?"
                expanded={this.state.expandRaml3}>
                <div>
                    RAML is Swagger made by people who did not know
                    the words flexibility and extensibility.
                </div>
            </Collapsible>
            <Collapsible title="What is RAML?"
                expanded={this.state.expandRaml4}>
                <div>
                    RAML is Swagger made by people who did not know
                    the words flexibility and extensibility.
                </div>
            </Collapsible>
            <Collapsible title="What is RAML?"
                expanded={this.state.expandRaml5}>
                <div>
                    RAML is Swagger made by people who did not know
                    the words flexibility and extensibility.
                </div>
            </Collapsible>
        </div>
    }
}
