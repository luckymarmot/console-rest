import React, { Component } from 'react'

import LargeSwaggerImg from 'crest/basics/media/logos/LargeSwaggerImg'
import LargeOAIImg from 'crest/basics/media/logos/LargeOAIImg'
import LargeRAMLImg from 'crest/basics/media/logos/LargeRAMLImg'

require('./helper-content.styl')

export default class SwaggerRAMLHelper extends Component {

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
        return <div className={classes}>
            <div className="swagger-support">
                Swagger / OAI / RAML are JSON or YAML based formats used to describe RESTful APIs. They describe available API endoints, responses, security schemes, and more.
            </div>
            <div className="swagger-action">
                To learn more:
                <div className="action-row">
                    <a target="_blank" href="http://swagger.io/specification/"><LargeSwaggerImg/></a>
                    <a target="_blank" href="https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md"><LargeOAIImg/></a>
                    <a target="_blank" href="https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md/"><LargeRAMLImg/></a>
                </div>
            </div>
        </div>
        /* eslint-enable max-len */
    }
}
