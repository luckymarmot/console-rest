import React, { Component, PropTypes } from 'react'

import SuccessImg from 'crest/basics/media/status/SuccessImg'

require('./color-palette.styl')

export default class ColorPalette extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    constructor(props) {
        super(props)

        this.state = {
            selectedColorIndex: 0
        }
    }

    updateSelectedIndex(color, index) {
        return () => {
            this.setState({
                selectedColorIndex: index
            })

            if (typeof this.props.onColorChange === 'function') {
                this.props.onColorChange(color)
            }
        }
    }

    renderColorButton(color, index) {
        let style = {
            backgroundColor: color
        }
        if (index !== this.state.selectedColorIndex) {
            return <button className="block"
                key={index}
                onClick={::this.updateSelectedIndex(color, index)}
                tabIndex="1" style={style}>
            </button>
        } else {
            return <button className="block"
                key={index}
                onClick={::this.updateSelectedIndex(color, index)}
                tabIndex="1" style={style}>
                <SuccessImg
                    className="white"
                    onClick={this.updateSelectedIndex(color, index)}/>
            </button>
        }
    }

    render() {
        let classes = 'palette'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        return <div className={classes}>
            {this.props.colors.map(::this.renderColorButton)}
        </div>
    }
}
