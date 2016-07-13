import React, { Component } from 'react'

import DragBox from 'app/components/DragBox'
import TextBox from 'app/components/TextBox'

export default class FlowInput extends Component {
    render() {
        return <div className="content-block">
            <h3>Your Input</h3>
            <DragBox>
                <h4>Drag any file from these formats</h4>
            </DragBox>
            <TextBox/>
        </div>
    }
}
