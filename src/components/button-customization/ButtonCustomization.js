import React, { Component } from 'react'

import Colors from 'crest/principles/Colors'
import ColorPalette from 'crest/components/color-palette/ColorPalette'

require('./customization.styl')

export default class ButtonCustomization extends Component {
    static colors = Colors.colorList

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
