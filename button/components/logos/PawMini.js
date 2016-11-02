import React, { Component } from 'react'

export default class PawMiniLogo extends Component {
    clicked() {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(...arguments)
        }
    }

    render() {
        let classes = this.props.className
        /* eslint-disable max-len */
        return <svg className={classes}
            onClick={::this.clicked}
            viewBox="0 0 19 25" version="1.1">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="paw-footer-icon" fill="#818283">
                    <path d="M17.9829762,18.7753148 C17.7350581,17.8120591 17.1877424,17.9333318 16.8254108,17.9767182 C16.68269,17.9938375 16.5594551,18.0087352 16.4888847,17.9713602 C16.2209541,17.75665 15.4412564,15.954025 14.8716899,14.0829227 C14.3696657,12.4339795 15.5494819,10.957275 15.5494819,8.26313864 C15.5494819,3.35499091 11.6246609,1.05943409 11.6246609,1.05943409 C11.6246609,1.05943409 12.3066661,3.44725227 12.0380772,4.40318977 C12.0380772,4.40318977 11.4760154,2.97326932 10.5582051,2.44596818 C10.8200792,5.44106477 9.8638238,6.05487727 7.26917615,6.58557614 C8.24162591,7.30720114 9.18181868,7.52896818 11.0053266,7.52896818 C14.603496,7.52896818 15.9833056,10.3831898 13.1338935,13.9434852 C14.0057541,15.9446159 15.5999081,18.5680534 15.789237,18.7649909 C16.2309604,19.2242068 17.2344822,19.2017295 17.8702742,18.978525 C17.9578289,18.9478148 18.004832,18.8598659 17.9829762,18.7753148" id="Fill-1" />
                    <path d="M4.40823052,18.6318261 C4.78978473,19.3657352 5.98619023,19.2653716 7.90660077,19.0405989 C8.82138293,18.9337011 9.86176988,18.812167 10.9287524,18.823667 C9.47323762,14.1777977 11.1459934,13.5198148 12.266957,11.6732807 C13.7852742,9.17229205 12.1029072,8.38963864 11.0214419,8.38963864 C10.374327,13.1546898 3.07358074,10.135417 4.40823052,18.6318261" id="Fill-3" />
                    <path d="M4.06483173,23.8751858 C5.17039098,23.8751858 6.48015679,23.6889642 7.86668109,23.4920267 C10.8085194,23.0739756 14.1083445,22.6050892 17.1253614,23.5827199 C14.9749387,19.0847824 11.124243,19.5352426 7.9970257,19.9008903 C6.16969964,20.1146858 4.57607224,20.3010381 3.85259384,19.2958335 C2.36811359,19.3810381 1.19369552,20.352004 1.19369552,21.5332369 C1.19369552,22.8026801 2.50846445,23.8751858 4.06483173,23.8751858" id="Fill-5" />
                </g>
            </g>
        </svg>
        /* eslint-enable max-len */
    }
}
