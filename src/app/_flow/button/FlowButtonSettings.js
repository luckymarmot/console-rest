import React, { Component } from 'react'

require('styles/atoms/images/placeholder.styl')
require('styles/atoms/depth/depth-neg-1.styl')
require('styles/atoms/forms/text-field.styl')

export default class FlowButtonSettings extends Component {

    static themes = [
        '#00AAFF',
        '#263138',
        '#D84315',
        '#C62828',
        '#AD1457',
        '#1565C0',
        '#00838F',
        '#558B2F'
    ]

    constructor(props) {
        super(props)
        this.state = {
            text: 'Open In Console',
            style: {},
            selectedKey: 0
        }
    }

    updateTheme(ev) {
        this.setState({
            selectedKey: ev.target.value
        })
        this.props.onThemeChange(this.constructor.themes[ev.target.value])
    }

    updateText(ev) {
        this.setState({
            text: this.refs.textInput.value
        })
        this.props.onTextChange(this.refs.textInput.value)
    }

    render() {
        let themes = this.constructor.themes
        let currentStyle = {
            backgroundColor: themes[this.state.selectedKey]
        }
        return <section className="content-block">
            <h3>Your Button</h3>
            <div className="row">
                <div className="block-50">
                    <span>Choose Theme</span>
                    <div className="row">
                        {themes.map((theme, i) => {
                            let style = {
                                backgroundColor: theme
                            }
                            let classes = 'button one-by-one'
                            if (i === this.state.selectedKey) {
                                classes += ' depth-neg-1'
                            }
                            return <div key={i} value={i} className={classes} style={style} onClick={::this.updateTheme}></div>
                        })}
                    </div>
                    <span>Text</span>
                    <input type="text" className="text-field" ref="textInput" value={this.state.text} onChange={::this.updateText}/>
                </div>
                <div className="block-50 row__filled">
                    <div className="button oic-button" style={currentStyle}>{this.state.text}</div>
                </div>
            </div>
        </section>
    }
}
