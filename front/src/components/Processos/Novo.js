import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import BackButton from '../BackButton'
import FormNovoProcesso from './Novo/FormNovo'

export default class NovoProcesso extends Component {
    render() {
        return (
            <section id="detalhes-processo">
                <header>
                      <BackButton />
                      <h4>Novo processo</h4>
                </header>
                <Card>
                    <Card.Body>
                        <FormNovoProcesso />
                    </Card.Body>
                </Card>
            </section>
        )
    }
}