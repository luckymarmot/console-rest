import React, { Component } from 'react'

import BetaImg from 'crest/basics/media/icons/BetaImg'

require('./banner.styl')

export default class BetaBanner extends Component {

    render() {
        let classes = 'beta'
        if (this.props.classes) {
            classes += ' ' + this.props.classes
        }

        return <div className={classes}>
            <div className="small">
                <BetaImg className="beta-icon"/>
                <span>Beta</span>
            </div>
        </div>
    }
}
