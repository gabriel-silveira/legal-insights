import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'

import API from '../../../services/api'

import BackButton from '../../BackButton'
import Loading from '../../Loading/inline'

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
        UFs: [],
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

    componentDidMount() {
      this.getUFs()
    }

    async getUFs() {
      const res = await API.get(`regiao/estados/siglas`)
      this.setState((state) => ({ UFs: res.data }))
    }

    async getMunicipios() {
      this.setState({ loading_municipios: true })
      const res = await API.get(`regiao/municipios/${this.state.estado}`)
      let municipios = res.data
      this.setState({ municipios: municipios, loading_municipios: false })
    }
  
    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }


    selectEstado() {
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

    selectMunicipio() {
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
  
    handleSubmit = e => {
        /*enviado: false*/
      const { num_processo, data_distrib, reu, valor, vara, codibge, estado } = this.state
      console.log(num_processo, data_distrib, reu, valor, vara, codibge, estado)
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

                <Form.Row>
                    <Form.Group as={Col} controlId="num_processo">
                        <Form.Label>Vara</Form.Label>
                        <Form.Control 
                        type="text" maxLength="40" 
                        name="vara"
                        onChange={this.handleChange} 
                        value={this.state.vara} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formBasicEmail">
                      <Form.Label>Estado </Form.Label>
                      { this.selectEstado() }
                    </Form.Group>

                    <Form.Group as={Col} controlId="formBasicEmail">
                      <Form.Label>Comarca </Form.Label>
                      { !this.state.loading_municipios ? this.selectMunicipio() : <Loading /> }
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" className="float-right" type="button" onClick={this.handleSubmit}>Cadastrar</Button>
            </Form>
        )
    }
}

export default FormSection