import React, { Component } from 'react'
import logo from '../../assets/imgs/logo-legal.png'
import './styles.css'

class MainHeader extends Component {
    componentDidMount() {
        
    }

    render() {
      return (
          <header id="main-header">
            <a href="/"><img src={logo} alt="Logo" id="logo-header" /></a>
          </header>
      )
    }
}

export default MainHeader