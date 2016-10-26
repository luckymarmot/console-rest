import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'

import DownArrowImg from 'crest/basics/media/arrows/DownArrowImg'
import UpArrowImg from 'crest/basics/media/arrows/UpArrowImg'

import Collapsible from 'crest/components/collapsible/Collapsible'

import PawHelper from 'crest/components/helpers/PawHelper'
import PostmanHelper from 'crest/components/helpers/PostmanHelper'
import SwaggerRAMLHelper from 'crest/components/helpers/SwaggerRAMLHelper'
import CurlHelper from 'crest/components/helpers/CurlHelper'
import MissingHelper from 'crest/components/helpers/MissingHelper'

require('./helper.styl')

export default class Helper extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    constructor(props) {
        super(props)

        this.state = {
            helperOpened: window.innerWidth > 1280,
            helperIndex: 0
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

    collapsibleClicked(index) {
        return (value) => {
            if (value) {
                this.setState({
                    helperIndex: index
                })
            } else {
                this.setState({
                    helperIndex: -1
                })
            }
        }
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
        if (this.state.helperOpened) {
            helperStyles = {
                right: 0
            }
        } else {
            helperStyles = {
                right: -336
            }
        }

        let content = new Immutable.OrderedMap({
            'Importing from Paw': <PawHelper/>,
            'Importing from Postman': <PostmanHelper/>,
            'Swagger / OAI / RAML': <SwaggerRAMLHelper/>,
            'What if I like curl': <CurlHelper/>,
            'My favourite format is missing': <MissingHelper/>
        })

        return <div className="helper-container">
            <div className={classes} style={helperStyles}>
                {content.keySeq().map((title, index) => {
                    let handler = ::this.collapsibleClicked(index)
                    return <Collapsible key={index} title={title}
                        onHeaderClick={handler}
                        expanded={this.state.helperIndex === index}>
                            {content.get(title)}
                        </Collapsible>
                })}
            </div>
        </div>
    }
}
