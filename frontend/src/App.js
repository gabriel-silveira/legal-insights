import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import MainHeader from './components/Header/Header'
import Processos from './components/Processos/Processos'
import Processo from './components/Processos/Processo'

import './assets/css/geral.css'

const AppRouter = () => {
  return (
    <Router>
      <MainHeader />
      <Route path="/" exact component={Processos} />
      <Route path="/processo/:id" component={Processo} />
    </Router>
  )
}

export default AppRouter;
