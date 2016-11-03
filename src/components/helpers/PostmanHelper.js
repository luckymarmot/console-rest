import React, { Component } from 'react'

import TabView from 'crest/components/tabs/TabView'
import TabViewer from 'crest/components/tabs/TabViewer'

import MiniBuildImg from 'crest/basics/media/icons/MiniBuildImg'

require('./helper-content.styl')

export default class PostmanHelper extends Component {

    actionClicked(ev) {
        if (typeof this.props.onActionClick === 'function') {
            this.props.onActionClick(ev)
        }
    }

    render() {
        let classes = 'helper-content postman-tabs'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }

        /* eslint-disable max-len */
        return <TabViewer className={classes} default="Most data">
            <TabView title="Simplest">
                <ol className="postman-view">
                    <li>Open Postman</li>
                    <li>Click on the "..." of a collection</li>
                    <li>Click on Export</li>
                    <li>Choose the format you prefer</li>
                    <li>Click on Export</li>
                    <li>Drop the file in Console.REST</li>
                </ol>
            </TabView>
            <TabView title="Most data">
                <ol className="postman-view">
                    <li>Open Postman</li>
                    <li>Click on <MiniBuildImg/></li>
                    <li>Click on Settings</li>
                    <li>Click on Data</li>
                    <li>Click on Download</li>
                    <li>Drop the file in Console.REST</li>
                </ol>
            </TabView>
        </TabViewer>
        /* eslint-enable max-len */
    }
}
