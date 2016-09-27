import React, { Component, PropTypes } from 'react'

import CollapseAllButton from 'crest/basics/buttons/CollapseAllButton'
import ExpandAllButton from 'crest/basics/buttons/ExpandAllButton'
import DownArrowImg from 'crest/basics/media/DownArrowImg'
import UpArrowImg from 'crest/basics/media/UpArrowImg'
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
            helperOpened: window.innerWidth > 1280,
            expandPaw: true,
            expandPostman: true,
            expandRaml: false,
            expandRaml2: false,
            expandRaml3: true,
            expandRaml4: false,
            expandRaml5: true
        }
    }

    throttle(eventType, eventName) {
        let running = false
        let eventHandler = () => {
            if (running) {
                return
            }
            running = true
            window.requestAnimationFrame(() => {
                window.dispatchEvent(new CustomEvent(eventName))
                running = false
            })
        }

        this.eventHandler = eventHandler
        window.addEventListener(eventType, this.eventHandler)
    }

    componentDidMount() {
        this.throttle('resize', 'optmizedResize')
        this.optimizedResize = ::this.onWindowResize
        window.addEventListener('optmizedResize', this.optimizedResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.eventHandler)
        window.removeEventListener('optimizedResize', this.optimizedResize)
    }

    onWindowResize() {
        if (window.innerWidth <= 1280 && this.state.helperOpened) {
            this.setState({
                helperOpened: false
            })
        } else if (window.innerWidth > 1280 && !this.state.helperOpened) {
            this.setState({
                helperOpened: true
            })
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

        delete state.helperOpened

        this.setState(state)
    }

    collapseHelper() {
        this.setState({
            helperOpened: false
        })
    }

    expandHelper() {
        this.setState({
            helperOpened: true
        })
    }

    renderExpandHelperButton() {
        if (this.state.helperOpened) {
            return <UpArrowImg
                className="helper-control"
                onClick={::this.collapseHelper}/>
        } else {
            return <DownArrowImg
                className="helper-control"
                onClick={::this.expandHelper}/>
        }
    }

    render() {
        let classes = 'helper'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        let helperStyles
        let controlStyles
        if (this.state.helperOpened) {
            controlStyles = {
                display: 'flex'
            }

            helperStyles = {
                right: 0
            }
        } else {
            controlStyles = {
                display: 'none'
            }
            helperStyles = {
                right: -288
            }
        }

        return <div className={classes} style={helperStyles}>
            <div className="controls">
                <ResetExpansionButton className="img" title="Reset To Default"
                    onClick={::this.resetExpand} style={controlStyles}/>
                <ExpandAllButton className="img" title="Expand All"
                    onClick={::this.expandAll} style={controlStyles}/>
                <CollapseAllButton className="img" title="Collapse All"
                    onClick={::this.collapseAll} style={controlStyles}/>
                {this.renderExpandHelperButton()}
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
