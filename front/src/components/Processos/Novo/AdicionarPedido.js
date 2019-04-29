import React, { Component } from 'react'

// react-bootstrap
import { Form, Col, Button, Alert } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format'

import API from '../../../services/api'

export default class AdicionarPedido extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            tipo_pedido: 0,
            status: '',
            valor_risco_provavel: '',

            pedidos_tipos: {},
            alertaPreenchimento: false,
            processoAdicionado: false,
            dados_processo: this.props.dados_processo,
            dados_pedido: this.props.dados_pedido,
        }
    }

    async componentDidMount() {

        if(this.props.callbackAtualizado)
            this.setState({ atualizado: this.props.callbackAtualizado })

        if(this.props.dados_pedido) {
            const { id, tipo_pedido, valor_risco_provavel, status } = { ...this.props.dados_pedido }
            this.setState({
                id,
                tipo_pedido,
                valor_risco_provavel,
                status,
            })
        }
        
        // obtém tipos de pedidos
        const res = await API.get('processos/pedidos/tipos')
        this.setState( { pedidos_tipos: res.data } )
    }

    // monta select com tipos de pedidos
    pedidosTipos() {
        const options = []
        options.push(<option onClick={(e) => { this.setState({ tipo_pedido: 0 }) }} key="0">selecione</option>)
        for(let tipo in this.state.pedidos_tipos) {
            let id = this.state.pedidos_tipos[tipo].id, nome_tipo = this.state.pedidos_tipos[tipo].tipo
            options.push(<option value={id} key={id}
                selected={this.state.tipo_pedido === id}>{nome_tipo}</option>)
        }
        return options
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    doNothing() {}

    handleSubmit = (e) => {
        const { tipo_pedido, valor_risco_provavel, status, dados_processo } = this.state

        if(!tipo_pedido || !valor_risco_provavel || !status) {
            this.setState({ alertaPreenchimento: true })
        } else {
            this.setState({ alertaPreenchimento: false })

            // se estiver criando um novo processo, registra o processo antes
            if(dados_processo) {
                // cadastra dados do processo
                API.post('processos', dados_processo).then((res) => {
                    if(res.data > 0) {
                        let dados_pedido = { tipo_pedido, valor_risco_provavel, status, num_processo: dados_processo.num_processo }
                        API.post('processos/pedido', dados_pedido).then((res) => {
                            if(res.data > 0) {
                                this.setState({ processoAdicionado: true })
                                setTimeout(() => { window.location = '/' }, 3000)
                            }
                        })
                    }
                })
            } else { // editando pedido do processo
                const { id, tipo_pedido, valor_risco_provavel, status } = { ...this.state}
                let dados_pedido = { tipo_pedido, valor_risco_provavel, status }
                API.post(`processos/pedido/${id}`, dados_pedido).then((res) => {
                    if(res.data)
                        this.state.atualizado()
                })
            }
        }
    }

    render() {
        
        if(this.state.processoAdicionado) return (
            <Alert variant="success" className="text-center">Processo adicionado com sucesso!</Alert>
        )

        return (
            
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="Pedido">
                        <Form.Group controlId="Pedido">
                            <Form.Label>Tipo do pedido</Form.Label>
                            <Form.Control as="select" onChange={(e) => this.setState({ tipo_pedido: e.target.value })}>
                                {this.pedidosTipos()}
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
                                            name="valor_risco_provavel"
                                            onChange={this.handleChange} 
                                            value={this.state.valor_risco_provavel} />
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