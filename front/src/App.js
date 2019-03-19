import React from 'react'

import MainHeader from './components/Header'
import Routes from './routes'

import './assets/css/geral.css'

const AppRouter = () => {
  return (
    <div>
      <MainHeader />
      <Routes />
    </div>
  )
}

export default AppRouter;
