import React, { Component } from 'react'

import GenericButton from 'crest/basics/buttons/GenericButton'
import PawLogo from 'crest/basics/media/logos/PawLogo'

require('./helper-content.styl')

export default class PawHelper extends Component {

    actionClicked(ev) {
        if (typeof this.props.onActionClick === 'function') {
            this.props.onActionClick(ev)
        }
    }

    render() {
        let classes = 'helper-content'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        /* eslint-disable max-len */
        return <div className={classes} draggable={false}>
            <div className="paw-support">
                <PawLogo className="paw-logo"/>
                <div className="block">
                    Console.rest is already bundled into <a href="https://paw.cloud">Paw</a>
                </div>
            </div>
            <GenericButton className="paw-action" onClick={::this.actionClicked}>
            One-Click Import from Paw
            </GenericButton>
        </div>
        /* eslint-enable max-len */
    }
}
