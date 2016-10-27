import React, { Component } from 'react'

import GenericButton from 'crest/basics/buttons/GenericButton'
import PawLogo from 'crest/basics/media/logos/PawLogo'

require('./helper-content.styl')

/* eslint-disable max-len */
let sig = 'ad1003ef52fcdd00be6331d1f2e92bbd6a9f8c6dea651d4342a7add587c7ef3f9975afff123b1b7cbbd83260ec8f6286cca89ef032c5b428f5be24ce3fd07707'
/* eslint-enable max-len */

export default class PawHelper extends Component {

    actionClicked() {
        let callbackUrl = 'http://console.rest/#?format=swagger&' +
            'version=v2.0&name={{name}}&content={{content}}'
        let pawUrl = 'paw://current.document/export?' +
            'url=' + encodeURIComponent(callbackUrl) +
            '&name=' + encodeURIComponent('Console.REST') +
            '&target=' + encodeURIComponent('swagger') +
            '&signature=' + encodeURIComponent(sig)
        window.location.href = pawUrl
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
