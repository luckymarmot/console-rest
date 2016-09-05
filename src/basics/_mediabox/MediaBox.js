import React, { Component, PropTypes } from 'react'

require('styles/molecules/media/boxed-media.styl')
require('styles/molecules/layout/blocks.styl')
require('styles/molecules/layout/column.styl')
require('styles/molecules/layout/center-around.styl')

export default class MediaBox extends Component {
    static propTypes = {
        data: PropTypes.string.isRequired
    }

    render() {
        let children = this.props.children
        let icon = children[0]

        return <a className="col block-15 center-around"
                onClick={::this.clicked}>
            <div className="boxed-media with-info">{icon}</div>
            <h5>{this.props.data}</h5>
        </a>
    }

    clicked() {
        let children = this.props.children.slice(1)
        let description = React.cloneElement(children[0],
            { data: this.props.data }
        )
        this.props.onClick(description)
    }
}
