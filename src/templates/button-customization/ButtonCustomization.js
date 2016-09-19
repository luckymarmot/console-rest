import React, { Component } from 'react'

import TextField from 'crest/basics/inputs/TextField'
import ColorPalette from 'crest/components/color-palette/ColorPalette'

require('./customization.styl')

export default class ButtonCustomization extends Component {
    static colors = [
        '#00AAFF',
        '#2E3748',
        '#D84315',
        '#C62828',
        '#AD1457',
        '#303F9F',
        '#1565C0',
        '#00838F',
        '#558B2F'
    ]

    constructor(props) {
        super(props)

        this.state = {
            color: this.constructor.colors[0],
            text: 'Open in Console'
        }
    }

    updateColor(color) {
        this.setState({
            color: color
        })

        if (typeof this.props.onThemeChange === 'function') {
            this.props.onThemeChange(color)
        }
    }

    updateText(ev, text) {
        this.setState({
            text: text
        })

        if (typeof this.props.onTextChange === 'function') {
            this.props.onTextChange(text)
        }
    }

    render() {
        let classes = ''
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        let colors = this.constructor.colors
        let style = {
            backgroundColor: this.state.color
        }

        return <div className={classes}>
            <h2>About Your Button</h2>
            <div className="row">
                <div className="row-item">
                    <div className="col">
                        <TextField
                            value={this.state.text}
                            onChange={::this.updateText}
                            onSubmit={::this.updateText}
                            placeholder="Enter a filename"/>
                        <ColorPalette
                            onColorChange={::this.updateColor}
                            colors={colors}/>
                    </div>
                </div>
                <div className="row-item">
                    <div
                        className="oic-demo"
                        style={style}>
                        {this.state.text}
                    </div>
                </div>
            </div>
        </div>
    }
}
