import React, { Component } from 'react'

require('../image.styl')

export default class MiniBuildImg extends Component {
    render() {
        let classes = 'img dark'
        if (this.props.className) {
            classes += ' ' + this.props.className
        }
        /* eslint-disable max-len */
        return <svg className={classes} height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
            <g id="Console.rest" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Artboard-3" fill="#3C3252">
                    <path d="M0,9.23324976 L2.60832889,6.59966126 C1.93984939,4.87478088 2.31122689,2.84992131 3.72246138,1.42502012 C5.20797136,-0.0748758583 7.43623635,-0.374855055 9.21884833,0.450087736 L6.02500186,3.6748641 L8.25326684,5.92470807 L11.5213888,2.69993171 C12.4126948,4.49980689 12.0413173,6.74965086 10.5558073,8.24954684 C9.14457283,9.67444803 7.13913435,10.049422 5.43079786,9.37446883 L2.83044902,12 L0,9.23324976 Z" id="Combined-Shape"></path>
                </g>
            </g>
        </svg>
        /* eslint-enable max-len */
    }
}
