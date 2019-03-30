import React, { Component } from 'react'
import CurrencyFormat from 'react-currency-format'

// react-bootstrap
import { Card, Form, Col, Button, Alert } from 'react-bootstrap'

// react-datepicker
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import BackButton from '../../BackButton'
import Loading from '../../Loading/inline'

import API from '../../../services/api'
import './styles.css'

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
      this.state = {
        UFs: [],
        enviado: false,
        num_processo: '',
        data_distrib: '',
        reu: '',
        valor: '',
        vara: '',
        comarca: '',
        estado: '',
        alertaPreenchimento: false
      }
      //this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      this.getUFs()
    }

    async getUFs() {
      const res = await API.get(`regioes/estados/siglas`)
      this.setState((state) => ({ UFs: res.data }))
    }

    async getMunicipios() {
      this.setState({ loading_municipios: true })
      const res = await API.get(`regioes/municipios/${this.state.estado}`)
      let municipios = res.data
      this.setState({ municipios: municipios, loading_municipios: false })
    }
  
    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    // formata e atualiza data de distribuição
    handleDataDistrib = (data) => {
      let dia  = data.getDate().toString(),
      diaF = (dia.length === 1) ? '0'+dia : dia,
      mes  = (data.getMonth()+1).toString(),
      mesF = (mes.length === 1) ? '0'+mes : mes,
      anoF = data.getFullYear()
      let dataFormatada = diaF+"/"+mesF+"/"+anoF
      this.setState({ data_distrib: dataFormatada })
    }


    Estados() {
      return (
        <Form.Control as="select">
          <option onClick={(e) => { this.selecionarEstado(e, null) }}>selecione</option>
          {this.state.UFs.map((uf) => {
            return (
          <option key={uf} onClick={(e) => { this.selecionarEstado(e, uf) }}>{uf}</option>
            );
          })}
        </Form.Control>
      )
    }
    selecionarEstado(e, uf) {
      if(!uf) {
        this.setState({ estado: false, municipios: false })
        return false
      }
      this.setState({ estado: uf }, function() {
        this.getMunicipios()
      })
    }

    Municipios() {
      // if(loading_municipios) LOADING_SPINNER
      if(this.state.municipios) {
        const options = this.state.municipios.map((municipio, index) => {
          return (
            <option key={index} value={municipio['codibge']} onClick={(e) => 
              {
                this.setState({ codibge: municipio['codibge'] })
              }
            }>{municipio['codibge']+' - '+municipio['nome']}</option>
          );
        })
  
        return (
          <Form.Control as="select">
            <option value="0">selecione a comarca</option>
            {options}
          </Form.Control>
        )
      } else {
        return (
          <Form.Control as="select">
            <option value="0">selecione a comarca</option>
          </Form.Control>
        )
      }
    }
  
    handleSubmit = (e) => {
      const { num_processo, data_distrib, reu, valor, vara, codibge, estado } = this.state
      let dados = [ num_processo, data_distrib, reu, valor, vara, codibge, estado ]

      let vazios = this.camposVazios(dados)
      this.setState({ alertaPreenchimento: vazios })
      if(vazios) return false
      
      API.post('processos', dados).then((res) => {
        console.log(res.data)
      })

      e.preventDefault()
      //this.setState({ enviado: true })
    }

    camposVazios(campos) {
      let vazio = 0
      for(let campo of campos) if(!campo) vazio++
      return vazio > 0
    }

    // para evitar warning sobre <Alert />
    doNothing() {}

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

                    <Form.Group as={Col} controlId="reu">
                        <Form.Label>Réu principal</Form.Label>
                        <Form.Control 
                        type="text" maxLength="40" 
                        name="reu"
                        onChange={this.handleChange} 
                        value={this.state.reu} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="valor">
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

                <Form.Row>
                    <Form.Group as={Col} controlId="vara">
                        <Form.Label>Vara</Form.Label>
                        <Form.Control 
                        type="text" maxLength="40" 
                        name="vara"
                        onChange={this.handleChange} 
                        value={this.state.vara} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="estados">
                      <Form.Label>Estado </Form.Label>
                      { this.Estados() }
                    </Form.Group>

                    <Form.Group as={Col} controlId="municipios">
                      <Form.Label>Comarca </Form.Label>
                      { !this.state.loading_municipios ? this.Municipios() : <Loading /> }
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="data_distrib">
                    <Form.Label>Data de distribuição</Form.Label>
                    <Datepicker className="form-control" id="data-distrib" timeFormat="dd/MM/yyyy"
                        name="data_distrib"
                        onChange={this.handleDataDistrib} 
                        value={this.state.data_distrib}
                        selected={new Date()} />
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

export default FormSection