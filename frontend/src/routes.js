import React from 'react'
import { BrowserRouter, Switch, Route }  from 'react-router-dom'

import Processos from './components/Processos'
import Processo from './components/Processos/Processo'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Processos} />
                <Route path="/processo/:id" component={Processo} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes