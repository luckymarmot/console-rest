import React, { Component, PropTypes } from 'react'

import UpArrowImg from 'crest/basics/media/UpArrowImg'
import DownArrowImg from 'crest/basics/media/DownArrowImg'

require('./input.styl')

export default class SelectField extends Component {
    static propTypes = {
        className: PropTypes.string,
        expanded: PropTypes.bool
    }

    constructor(props) {
        super(props)
        this.state = {
            expanded: this.props.expanded || false,
            value: props.value
        }
    }

    toggle() {
        if (!this.state.expanded) {
            this.clickEventListener = ::this.close
            setImmediate(() => {
                window.addEventListener('click', this.clickEventListener)
            })
        }

        this.setState({
            expanded: !this.state.expanded
        })
    }

    close() {
        this.setState({
            expanded: false
        })

        window.removeEventListener('click', this.clickEventListener)
    }

    updateSelect(ev) {
        this.setState({
            value: ev.target.value,
            expanded: false
        })

        this.props.onSubmit(ev, ev.target.value)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            expanded: nextProps.expanded,
            value: nextProps.value
        })
    }

    componentWillUnMount() {
        window.removeEventListener('click', this.clickEventListener)
    }

    renderIcon() {
        if (!this.props.children) {
            if (this.state.expanded) {
                return <UpArrowImg onClick={::this.toggle}/>
            }

            return <DownArrowImg onClick={::this.toggle}/>
        }

        return this.props.children
    }

    render() {
        let classes = 'input-field fixed-size'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        let collapsible = 'select'
        if (this.state.expanded) {
            collapsible += ' active'
        }

        let selectedClass = 'header'
        let selected
        if (
            typeof this.state.value === 'undefined' ||
            this.state.value === null
        ) {
            selectedClass += ' placeholder'
            selected = this.props.placeholder
        } else {
            selected = this.state.value
        }

        return <div className={classes}>
            <div className={collapsible} ref="select">
                <div className={selectedClass} onClick={::this.toggle}>
                    {selected}
                </div>
                <div className="content">
                    {this.props.options.map((opt, index) => {
                        return <div
                            className="option"
                            key={index}
                            value={opt}
                            onClick={::this.updateSelect}>
                            {opt}
                        </div>
                    })}
                </div>
            </div>
            <button className="input-button"
                onClick={::this.toggle}
                tabIndex="1">{this.renderIcon()}</button>
        </div>
    }
}
