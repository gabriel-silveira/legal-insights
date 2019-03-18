import React, { Component } from 'react'
import API from '../../services/api'
import { withRouter } from 'react-router-dom'

import { Button } from 'react-bootstrap'

const BackButton = withRouter(({ history }) => (
    <Button onClick={() => { history.push('/') }}><i className="material-icons padless">navigate_before</i><span>Voltar</span></Button>
))

export default class Processo extends Component {
    state = {
        processo: {}
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const res = await API.get(`processos/${id}`)
        this.setState({ processo: res.data })
    }

    goBack() {
        alert('ok')
    }

    render() {
        return (
            <section>
                <header>
                      <BackButton />
                      <h4>{ this.state.processo.reu_principal }</h4>
                </header>
                <div>

                </div>
            </section>
        )
    }
}