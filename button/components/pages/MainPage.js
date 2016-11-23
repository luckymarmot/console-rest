import React, { Component } from 'react'

import PawViewer from '../views/PawViewer'
import PostmanViewer from '../views/PostmanViewer'
import SwaggerViewer from '../views/SwaggerViewer'
import RAMLViewer from '../views/RAMLViewer'
import CurlViewer from '../views/CurlViewer'
import UnknownViewer from '../views/UnknownViewer'

require('./main.styl')

export default class MainPage extends Component {
    static views = [
        {
            id: 'paw',
            name: 'Paw'
        },
        {
            id: 'postman',
            name: 'Postman'
        },
        {
            id: 'swagger',
            name: 'Swagger'
        },
        {
            id: 'raml',
            name: 'RAML'
        },
        {
            id: 'curl',
            name: 'Curl'
        }
    ]

    constructor(props) {
        super(props)

        this.noContentGenerated = {
            paw: { content: null, error: null },
            postman: { content: null, error: null },
            swagger: { content: null, error: null },
            raml: { content: null, error: null },
            curl: { content: null, error: null }
        }

        this.state = {
            view: this.props.view,
            content: this.props.content,
            ...this.noContentGenerated
        }

        this.generationPromises = {
            paw: null,
            postman: null,
            swagger: null,
            raml: null,
            curl: null
        }

        this.startGeneration(this.props.view, this.props.format)
    }

    componentWillReceiveProps(nextProps) {
        let stateUpdate = {}

        if (this.props.content !== nextProps.content) {
            stateUpdate = { ...this.noContentGenerated }
            stateUpdate.content = nextProps.content
        }

        if (this.props.view !== nextProps.view) {
            stateUpdate.view = nextProps.view
        }

        if (Object.keys(stateUpdate).length) {
            this.setState({
                ...stateUpdate
            })

            this.startGeneration(
                nextProps.view,
                nextProps.format,
                nextProps.content
            )
        }
    }

    startGeneration(view, format, content) {
        if (
            view !== 'paw' &&
            (
                this.props.content !== content ||
                this.state[view].content === null
            ) &&
            this.props.converter &&
            typeof this.props.converter.convert === 'function'
        ) {
            this.generationPromises[view] = this.props.converter.convert({
                target: {
                    format: view
                }
            })

            this.generationPromises[view].then(
                this.onGenerationDone(view), error => {
                    /* eslint-disable no-console */
                    const update = {}
                    const defaultMsg = 'An unknown error occured. Please ' +
                        'check that the source format matches the source ' +
                        'content.'
                    let msg

                    if (typeof error === 'string') {
                        msg = error
                    } else if (error === true) {
                        msg = defaultMsg
                    } else if (error.message || error.msg) {
                        msg = error.message || error.msg
                    } else {
                        try {
                            msg = JSON.stringify(error)
                        } catch (e) {
                            msg = defaultMsg
                        }
                    }

                    update[view] = {
                        content: null,
                        error: msg
                    }
                    this.setState(update)
                    console.log('failed generation with error', error)
                    /* eslint-enable no-console */
                })
        }
    }

    onGenerationDone(view) {
        return (generated) => {
            let obj = {}
            obj[view] = {
                content: generated,
                error: null
            }

            this.setState(obj)
        }
    }

    updateView(view) {
        return () => {
            this.setState({
                view: view.id
            })

            this.startGeneration(view.id, this.props.content)
        }
    }

    renderTabButton(view) {
        let classes = 'tab-view'
        let style = {}
        if (this.state.view === view.id) {
            classes += ' active'
            if (this.props.theme) {
                style = {
                    borderBottom: '2px solid ' + this.props.theme
                }
            }
        }

        return <div key={view.id} className={classes} style={style}
            onClick={::this.updateView(view)}>
            {view.name}
        </div>
    }

    renderView() {
        const viewMap = {
            paw: PawViewer,
            postman: PostmanViewer,
            swagger: SwaggerViewer,
            raml: RAMLViewer,
            curl: CurlViewer
        }

        const Viewer = viewMap[this.state.view]
        if (Viewer) {
            const content = this.state[this.state.view].content
            const error = this.state[this.state.view].error
            return <Viewer className="oic-tab-content"
                content={content}
                error={error}
                converter={this.props.converter}
                theme={this.props.theme}
                name={this.props.name}
                source={this.props.source}/>
        }

        return <UnknownViewer className="oic-tab-content"/>
    }

    render() {
        let classes = this.props.className || ''
        classes += ' oic-main'

        return <div className={classes}>
            <div className="oic-tab-bar">
                {MainPage.views.map(view => this.renderTabButton(view))}
            </div>
            {this.renderView()}
        </div>
    }
}
