import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import BackButton from '../../BackButton'
import FormNovo from './Form'

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
                        <FormNovo />
                    </Card.Body>
                </Card>
            </section>
        )
    }
}