import React, { Component } from 'react'

// react-bootstrap
import { Form, Col, Button, Alert } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format'

import API from '../../../services/api'

export default class AdicionarPedido extends Component {

    constructor(props) {
        super(props)
        this.state = {
            alertaPreenchimento: false,
            pedido: 0,
            status: ''
        }
    }

    componentDidMount() {
        console.log(this.props.dados_processo)
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    doNothing() {}


    handleSubmit = (e) => {
        if(this.verificarForm()) {

        }
    }

    verificarForm() {
      const { pedido, valor_risco, status, dados_processo } = this.state
      if(!pedido || !valor_risco || !status) {
        this.setState({ alertaPreenchimento: true })
      } else {
        this.setState({ alertaPreenchimento: false })
        
        // cadastra dados do processo
        API.post('processos', dados_processo).then((res) => {
            if(res.data)
                this.setState({ adicionar: true })
        })
      }
    }

    render() {
        return (
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="Pedido">
                        <Form.Group controlId="Pedido">
                            <Form.Label>Pedido</Form.Label>
                            <Form.Control as="select">
                                <option onClick={(e) => { this.setState({ pedido: 0 }) }}>selecione</option>
                                <option onClick={(e) => { this.setState({ pedido: 1 }) }}>Horas extras</option>
                                <option onClick={(e) => { this.setState({ pedido: 2 }) }}>Dano moral</option>
                                <option onClick={(e) => { this.setState({ pedido: 3 }) }}>Dano material</option>
                                <option onClick={(e) => { this.setState({ pedido: 4 }) }}>Outros</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Pedido">
                        <Form.Group controlId="Pedido">
                            <Form.Label>Valor Risco Provável</Form.Label>
                            <CurrencyFormat className="form-control" 
                                            thousandSeparator="." 
                                            decimalSeparator="," 
                                            decimalScale={2}
                                            name="valor_risco"
                                            onChange={this.handleChange} 
                                            value={this.state.valor_risco} />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Pedido">
                        <Form.Group controlId="Pedido">
                            <Form.Label>Status</Form.Label>
                            <Form.Control 
                            type="text" maxLength="40" 
                            name="status"
                            onChange={this.handleChange} 
                            value={this.state.status} />
                        </Form.Group>
                    </Form.Group>
                </Form.Row>

                <Alert show={this.state.alertaPreenchimento} onClose={this.doNothing} variant='danger' className="text-center">Preencha todos os campos antes de enviar.</Alert>

                <Form.Row>
                    <Button variant="primary" block type="button" onClick={this.handleSubmit}>Cadastrar</Button>
                </Form.Row>
            </Form>
        )
    }
}