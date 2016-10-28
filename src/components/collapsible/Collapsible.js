import React, { Component, PropTypes } from 'react'

require('./collapsible.styl')

export default class Collapsible extends Component {
    static propTypes = {
        className: PropTypes.string,
        expanded: PropTypes.bool
    }

    constructor(props) {
        super(props)
        this.state = {
            expanded: this.props.expanded || false
        }
    }

    toggle() {
        this.setState({
            expanded: !this.state.expanded
        })

        if (typeof this.props.onHeaderClick === 'function') {
            this.props.onHeaderClick(!this.state.expanded)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            expanded: nextProps.expanded
        })
    }

    renderArrow() {
        if (this.state.expanded) {
            return <svg className="arrow"
                height="24" viewBox="0 0 24 24" width="24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        }

        return <svg className="arrow"
            height="24" viewBox="0 0 24 24" width="24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14l5-5 5 5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    }

    render() {
        let classes = 'collapsible'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        if (this.state.expanded) {
            classes += ' active'
        }

        return <div className={classes}>
            <div className="header" onClick={::this.toggle}>
                {this.props.title}
                {this.renderArrow()}
            </div>
            <div className="content">
                {this.props.children}
            </div>
        </div>
    }
}
