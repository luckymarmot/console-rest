import React, { Component } from 'react'

require('../image.styl')

export default class SuccessImg extends Component {
    render() {
        let classes = 'img error'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }
        /* eslint-disable max-len */
        return <svg className={classes} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <title>{this.props.title}</title>
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z">
                <title>{this.props.title}</title>
            </path>
            <path d="M0 0h24v24H0z" fill="none">
                <title>{this.props.title}</title>
            </path>
        </svg>
        /* eslint-enable max-len */
    }
}
