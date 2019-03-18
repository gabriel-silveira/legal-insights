import React, { Component } from 'react'
import API from '../../services/api'
import Loading from '../Loading'
import { withRouter } from 'react-router-dom'

import { Button, Card, Badge } from 'react-bootstrap'
import './processo.css'

const BackButton = withRouter(({ history }) => (
    <Button onClick={() => { history.push(`/`) }}><i className="material-icons padless">navigate_before</i><span>Voltar</span></Button>
))

export default class Processo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            processo: {},
            loading: true
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })
        const id = this.props.match.params.id
        const res = await API.get(`processos/${id}`)
        this.setState({ processo: res.data, loading: false })
    }

    goBack() {
        alert('ok')
    }

    render() {
        const floatRight = {
            float: 'right'
        };
        const { processo } = this.state
        if(this.state.loading) return <Loading />
        return (
            <section id="detalhes-processo">
                <header>
                      <BackButton />
                      <h4>Processo n.º { processo.num_processo }</h4>
                </header>
                <Card>
                    <Card.Body>
                        <Card.Text style={floatRight}><Badge variant="secondary">Criado em { processo.criado }</Badge>{ processo.atualizado != '31/12/1969' ? <Badge variant="dark">Atualizado em {processo.atualizado}</Badge> : '' }</Card.Text>
                        <Card.Text><b>Data de distribuição:</b> { processo.data_distrib }</Card.Text>
                        <Card.Title>{ processo.reu_principal }</Card.Title>
                        <Card.Text>{ processo.vara }, { processo.comarca } - { processo.uf }</Card.Text>
                        <Card.Text><b>Valor da causa:</b> R$ { processo.valor_causa }</Card.Text>
                    </Card.Body>
                </Card>
            </section>
        )
    }
}