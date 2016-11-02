import React, { Component } from 'react'

export default class RAMLLogo extends Component {
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
            viewBox="0 0 2209 852" version="1.1">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Artboard-2" fill="#73CFEE">
                    <g id="raml-logo" transform="translate(0.000000, 111.000000)">
                        <g id="Group">
                            <path d="M337.394,8.059 L0,8.059 L33.642,62.059 L335.487,62.059 C372.352,62.059 407.066,76.852 433.229,103.714 C459.289,130.467 473.639,165.749 473.639,203.059 C473.639,239.721 459.91,272.737 433.934,298.534 C409.199,323.103 374.722,339.257 336.801,344.06 L299.859,344.06 L197.973,343.246 L227.381,394.172 L272.047,394.172 L274.47,398.061 L274.825,398.061 L406.366,620.147 L406.976,621.18 L407.826,622.03 C413.557,627.757 420.741,630.542 429.785,630.542 C445.261,630.542 458.335,617.03 458.335,601.038 C458.335,594.694 456.266,591.821 453.765,588.974 C452.748,587.816 451.485,586.374 449.573,583.119 L340.831,398.031 C391.39,397.154 438.669,377.008 474.286,341.074 C510.691,304.346 530.74,255.33 530.74,203.059 C530.74,95.535 444.005,8.059 337.394,8.059 L337.394,8.059 Z" id="Shape" />
                            <path d="M791.52,13.547 C787.196,5.183 777.825,0 766.972,0 C757.138,0 747.356,5.301 742.626,13.191 L739.686,18.296 C735.823,25.005 737.985,34.741 741.839,41.412 L788.036,121.341 L964.876,428.648 L957.178,428.648 L957.416,429.066 L729.876,429.066 L762.765,486.515 L998.165,486.515 L1069.283,609.599 L1069.454,609.882 C1073.842,616.9 1081.184,628.644 1096.558,628.644 C1112.307,628.644 1125.12,615.833 1125.12,600.087 C1125.12,594.673 1123.761,590.052 1120.849,585.577 L791.52,13.547 L791.52,13.547 Z" id="Shape" />
                            <path d="M2175.446,571.539 L1871.851,571.539 L1871.851,28.544 C1871.851,12.805 1859.044,0 1843.302,0 C1827.561,0 1814.751,12.805 1814.751,28.544 L1814.751,600.087 C1814.751,615.833 1827.56,628.644 1843.302,628.644 L2208.442,628.644 L2175.446,571.539 L2175.446,571.539 Z" id="Shape" />
                            <path d="M1579.551,27.847 C1579.178,12.43 1566.528,0 1551.018,0 C1550.295,0 1549.592,0.035 1548.899,0.09 C1548.19,0.035 1547.477,0 1546.764,0 C1535.897,0 1526.516,5.193 1522.203,13.573 L1333.686,344.907 L1145.174,13.572 C1140.858,5.192 1131.477,0 1120.614,0 C1110.78,0 1100.996,5.301 1096.269,13.191 L1093.327,18.298 C1089.476,24.985 1091.596,34.716 1095.401,41.393 L1305.596,410.193 L1305.795,410.525 C1310.185,417.543 1317.529,429.287 1332.902,429.287 C1333.166,429.287 1333.424,429.275 1333.687,429.266 C1333.949,429.276 1334.209,429.287 1334.473,429.287 C1349.846,429.287 1357.191,417.543 1361.578,410.525 L1522.465,128.258 L1522.465,600.09 C1522.465,615.836 1535.275,628.647 1551.016,628.647 C1566.758,628.647 1579.568,615.836 1579.568,600.09 L1579.568,28.544 C1579.568,28.394 1579.557,28.245 1579.555,28.095 L1579.623,27.976 L1579.551,27.847 L1579.551,27.847 Z" id="Shape" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        /* eslint-enable max-len */
    }
}
