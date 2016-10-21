import React, { Component } from 'react'

import ColorPalette from 'crest/components/color-palette/ColorPalette'

require('./customization.styl')

export default class ButtonCustomization extends Component {
    static colors = [
        '#D42C69',
        '#863CC6',
        '#2F78CD',
        '#26C29F',
        '#8BD143',
        '#E2D52C',
        '#EE9E1A',
        '#EA6E30',
        '#E13046'
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

        return <div className={classes}>
            <ColorPalette
                onColorChange={::this.updateColor}
                colors={colors}/>
        </div>
    }
}
