import React, { Component } from 'react'

require('./nav.styl')

export default class Nav extends Component {
    render() {
        return <nav className="nav">
            <ul>
                <li><a href="#privacy">Privacy Statement</a></li>
                <li>
                    <a href="https://github.com/luckymarmot/API-Flow">
                        GitHub
                    </a>
                </li>
                <li><a href="#about">About</a></li>
            </ul>
        </nav>
    }
}
