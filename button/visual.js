import { ApiFlow } from './api'

import React from 'react'
import ReactDOM from 'react-dom'
import Outer from './components/outer/Outer'

class FlowButton {
    constructor(button, modal) {
        this.button = button
        this.modal = modal

        button.onclick = () => {
            this.modal.display(this.getParams())
        }
    }

    getParams() {
        let params = {}

        let keys = [
            'theme',
            'name',
            'mode',
            'url',
            'selector',
            'text'
        ]

        keys.forEach(key => {
            if (this.button.getAttribute('data-' + key)) {
                params[key] = this.button.getAttribute('data-' + key)
            }
        })

        if (this.button.getAttribute('data-source-format')) {
            params.source = {
                format: this.button.getAttribute('data-source-format')
            }
        }

        if (this.button.getAttribute('data-source-format')) {
            params.source = params.source || {}
            params.source.version =
                this.button.getAttribute('data-source-version')
        }

        return params
    }
}

class ModalContainer {
    constructor(converter, id) {
        this.converter = converter
        this.containerId = id || 'oic-outer'
    }

    display(params) {
        let body = document.getElementsByTagName('body')[0]
        let outer = document.getElementById(this.containerId)
        if (!outer) {
            outer = document.createElement('div')
            outer.setAttribute('id', this.containerId)
            body.appendChild(outer)
        }

        ReactDOM.render(
            <Outer
            params={params}
            converter={this.converter}/>, outer
        )
    }
}

const converter = new ApiFlow()
const bindModalToButtons = function() {
    const pawButtons = document.getElementsByClassName('oic-button')
    const modal = new ModalContainer(converter)

    for (let i = pawButtons.length - 1; i >= 0; i -= 1) {
        let button = pawButtons[i]
        /* eslint-disable no-new */
        // TODO improve that
        new FlowButton(button, modal)
        /* eslint-enable no-new */
    }
}

const addButtonStyling = function() {
    /* eslint-disable max-len */
    const styles = '.oic-button:focus{outline:none}'
    /* eslint-enable max-len */

    let styleTag = document.createElement('style')
    if (styleTag.styleSheet) {
        styleTag.styleSheet.cssText = styles
    } else {
        styleTag.appendChild(document.createTextNode(styles))
    }

    document.getElementsByTagName('head')[0].appendChild(styleTag)
}

addButtonStyling()
bindModalToButtons()

let ConsoleRest = {
    converter,
    bindModalToButtons
}

ConsoleRest.ready = new Promise(function(resolve) {
    resolve(ConsoleRest)
})

module.exports = {
    ConsoleRest
}
