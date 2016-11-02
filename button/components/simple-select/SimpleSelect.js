import React, { Component } from 'react'

require('./simple-select.styl')

export default class SimpleSelect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.default.name,
            value: this.props.default.value,
            mode: this.props.default.mode,
            active: false
        }
    }

    showOptions() {
        this.setState({
            active: true
        })

        this.close = () => {
            this.hideOptions(null)
        }

        document.addEventListener('click', this.close)
    }

    hideOptions(option) {
        if (option !== null) {
            this.setState({
                name: option.name,
                value: option.value,
                active: false
            })
        } else {
            this.setState({
                active: false
            })
        }

        document.removeEventListener('click', this.close)
    }

    onComponentWillUnmount() {
        document.removeEventListener('click', this.close)
    }

    hideOptionsFunc(option) {
        return () => {
            return this.hideOptions(option)
        }
    }

    renderOptionsTitle() {
        if (this.props.title) {
            return <span className="oic-select-options-title">
                {this.props.title}
            </span>
        }

        return null
    }

    renderOptions() {
        return <div>
            {this.renderOptionsTitle()}
            {this.props.options.map(option => {
                let classes = 'oic-select-option'

                if (option.name === this.state.name) {
                    classes += ' selected'
                } else if (option.mode === 'new') {
                    classes += ' new'
                }

                return <span className={classes} key={option.value}
                    value={option.value}
                    onClick={::this.hideOptionsFunc(option)}>
                    {option.name}
                </span>
            })}
        </div>
    }

    render() {
        let classes = this.props.className || ''
        let style = this.props.style || {}
        classes += ' oic-simple-select'
        /* eslint-disable max-len */
        return <div className={classes} style={style}>
            <span onClick={::this.showOptions}>{this.state.name}</span>
            {this.renderOptions()}
        </div>
        /* eslint-enable max-len */
    }
}
