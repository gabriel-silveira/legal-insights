import React from 'react'
import { BrowserRouter, Switch, Route }  from 'react-router-dom'

import Processos from './components/Processos'
import Processo from './components/Processos/Processo'
import Novo from './components/Processos/Novo/'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Processos} />
                <Route path="/processo/:id/:previous_page" component={Processo} />
                <Route path="/novo" component={Novo} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes