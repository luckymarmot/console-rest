import React, { Component } from 'react'

import Logo from './Logo'
import Nav from './Nav'

require('styles/organisms/header/header.styl')

export default class Header extends Component {
    render() {
        return <header className="header ">
            <Logo/>
            <Nav/>
        </header>
    }
}
