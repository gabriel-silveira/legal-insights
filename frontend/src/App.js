import React, { Component } from 'react'
import MainHeader from './components/Header/Header'
import Processos from './components/Processos/Processos'

import './assets/css/geral.css'

class App extends Component {
  render() {
    return (
      <div>
        <MainHeader />
        <Processos />
      </div>
    );
  }
}

export default App;
