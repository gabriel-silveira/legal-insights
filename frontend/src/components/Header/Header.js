import React, { Component } from 'react'
import logo from '../../assets/imgs/logo-legal.png'
import './Header.css'

class MainHeader extends Component {
    componentDidMount() {
        
    }

    render() {
      return (
          <header id="main-header">
            <img src={logo} alt="Logo" id="logo-header" />
          </header>
      )
    }
}

export default MainHeader