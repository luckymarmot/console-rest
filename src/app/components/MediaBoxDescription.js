import React, { Component } from 'react'

require('styles/molecules/layout/bottom-sheet.styl')

export default class MediaBoxDescription extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }

    dismiss() {
        if (this.state.active) {
            if (this.timeout) {
                clearTimeout(this.timeout)
            }
            this.timeout = setTimeout(this.props.close, 250)
            this.setState({
                active: false
            })
        }
    }

    componentWillMount() {
        this.timeout = setImmediate(() => {
            this.setState({
                active: true
            })
        })
    }

    componentWillUnmount() {
        clearTimeout(this.timout)
    }

    render() {
        let classes = []
        if (this.state.active) {
            classes = [ 'bottom-sheet', 'active' ]
        } else {
            classes = [ 'bottom-sheet' ]
        }

        return <div className={classes.join(' ')}
            onClick={::this.dismiss}
            onTouch={::this.dismiss}>
                <div className="sheet-container">
                    <div className="row center-between">
                        <h5>How to use console.rest with {this.props.data}</h5>
                        <a className="close" onClick={::this.dismiss}/>
                    </div>
                    {this.props.children}
                </div>
        </div>
    }
}
