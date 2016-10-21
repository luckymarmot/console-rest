import React, { Component } from 'react'

require('./tabs.styl')

export default class TabView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            active: this.props.default || null
        }
    }

    changeTabs(title) {
        if (this.state.active !== title) {
            this.setState({
                active: title
            })
        }
    }

    renderTabBar() {
        let titles = []
        if (this.props.children) {
            this.props.children.forEach((child) => {
                titles.push(child.props.title)
            })
        }

        return <div className="tab-bar">{titles.map((title, index) => {
            let classes = 'tab-block'
            if (this.state.active === title) {
                classes += ' active'
            }
            return <div className={classes}
                key={index}
                onClick={this.changeTabs.bind(this, title)}>{title}</div>
        })}</div>
    }

    renderView() {
        return this.props.children.filter((child) => {
            return child.props.title === this.state.active
        })[0]
    }

    render() {
        let classes = 'tab-viewer'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        /* eslint-disable max-len */
        return <div className={classes}>
            {this.renderTabBar()}
            {this.renderView()}
        </div>
        /* eslint-enable max-len */
    }
}
