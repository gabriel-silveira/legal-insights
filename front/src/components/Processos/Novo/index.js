import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'

import BackButton from '../../BackButton'

class FormSection extends Component {
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

class FormNovo extends Component {
    constructor(props) {
      super(props)
      this.state ={
        enviado: false,
        num_processo: '',
        data_distrib: '',
        reu: '',
        valor: '',
        vara: '',
        comarca: '',
        estado: ''
      }
    }
  
    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  
    handleSubmit = e => {
        /*enviado: false,
        num_processo: '',
        data_distrib: '',
        reu: '',
        valor: '',
        vara: '',
        comarca: '',
        estado: ''*/
      const { num_processo, data_distrib, reu, valor, vara, comarca, estado } = this.state
      console.log(num_processo, data_distrib, reu, valor, vara, comarca, estado)
      //this.setState({ enviado: true })
      e.preventDefault()
    }

    render() {
        if(this.state.enviado) return <h1>Enviado!</h1>
        return (
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="num_processo">
                        <Form.Label>Número do processo</Form.Label>
                        <Form.Control 
                        type="text" maxLength="40" 
                        name="num_processo"
                        onChange={this.handleChange} 
                        value={this.state.num_processo} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="num_processo">
                        <Form.Label>Réu principal</Form.Label>
                        <Form.Control 
                        type="text" maxLength="40" 
                        name="reu"
                        onChange={this.handleChange} 
                        value={this.state.reu} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="num_processo">
                        <Form.Label>Valor da causa</Form.Label>
                        <CurrencyFormat className="form-control" 
                            thousandSeparator="." 
                            decimalSeparator="," 
                            decimalScale={2}
                            name="valor"
                            onChange={this.handleChange} 
                            value={this.state.valor} />
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" className="float-right" type="button" onClick={this.handleSubmit}>Cadastrar</Button>
            </Form>
        )
    }
}

export default FormSection