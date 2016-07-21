import React, { Component } from 'react'

import DragBox from 'app/components/DragBox'
import FilePicker from 'app/components/FilePicker'
import TextBox from 'app/components/TextBox'
import MediaBox from 'app/components/MediaBox'
import MediaBoxDescription from 'app/components/MediaBoxDescription'

import PostmanIcon from 'app/icons/PostmanIcon'
import PawIcon from 'app/icons/PawIcon'
import RamlIcon from 'app/icons/RamlIcon'
import CurlIcon from 'app/icons/CurlIcon'

import PostmanDescription from 'app/components/descriptions/PostmanDescription'

require('styles/molecules/layout/row.styl')
require('styles/molecules/layout/blocks.styl')
require('styles/molecules/layout/center-between.styl')

export default class FlowInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            description: null,
            file: null
        }
    }

    displayDescription(description) {
        this.setState({
            description: description
        })
    }

    renderAll() {
        return <div className="row__filled">
            {this.renderPostman()}
            {this.renderPaw()}
            {this.renderSwagger()}
            {this.renderRaml()}
            {this.renderCurl()}
        </div>
    }

    renderPostman() {
        return <MediaBox data="Postman" onClick={::this.displayDescription}>
            <PostmanIcon/>
            <MediaBoxDescription>
                <PostmanDescription/>
            </MediaBoxDescription>
        </MediaBox>
    }

    renderPaw() {
        return <MediaBox data="Paw" onClick={::this.displayDescription}>
            <PawIcon/>
            <MediaBoxDescription>
                <div>
                    Paw Description
                </div>
            </MediaBoxDescription>
        </MediaBox>
    }

    renderSwagger() {
        return <MediaBox data="Swagger" onClick={::this.displayDescription}>
            <PostmanIcon/>
            <MediaBoxDescription>
                <div>Some Content</div>
            </MediaBoxDescription>
        </MediaBox>
    }

    renderRaml() {
        return <MediaBox data="RAML" onClick={::this.displayDescription}>
            <RamlIcon/>
            <MediaBoxDescription>
                <div>Some Content</div>
            </MediaBoxDescription>
        </MediaBox>
    }

    renderCurl() {
        return <MediaBox data="CURL" onClick={::this.displayDescription}>
            <CurlIcon/>
            <MediaBoxDescription>
                <div>Some Content</div>
            </MediaBoxDescription>
        </MediaBox>
    }

    renderDescription() {
        if (this.state.description === null) {
            return null
        }

        return React.cloneElement(this.state.description,
            { close: ::this.dismissDescription }
        )
    }

    dismissDescription() {
        this.setState({
            description: null
        })
    }

    updateTargetFile(file, url = null) {
        this.props.onFileReady({
            file: file,
            url: url
        })
    }

    renderSelectedFile() {
        if (!this.props.file) {
            return null
        }
        return <div className="row__filled">{this.props.file.name}</div>
    }

    handleQuery(content) {
        try {
            let url = new URL(content)

            let cb = (ev) => {
                let file = new File([ ev.target.response ], url.hostname)
                this.updateTargetFile(file, url)
            }

            let request = new XMLHttpRequest()
            request.addEventListener('load', cb)
            request.open('GET', url)
            request.send()
        } catch (e) {
            let file = new File([ content ], 'manual-input')
            this.updateTargetFile(file)
        }
    }

    render() {
        return <section className="content-block">
            <DragBox onFileDrop={::this.updateTargetFile}>
                <h3>Drag any file from these formats</h3>
                {this.renderAll()}
                or
                <div className="row__filled">
                    <FilePicker className="block-20"
                        onFileUpload={::this.updateTargetFile}/>
                </div>
                {this.renderSelectedFile()}
                {this.renderDescription()}
            </DragBox>
            <TextBox onQuery={::this.handleQuery}/>
        </section>
    }
}
