import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'
import CurrencyInput from 'react-currency-input'

import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import './styles.css'

import API from '../../../services/api'
import Loading from '../../Loading/inline'

class FormNovoProcesso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UFs: [],
      municipios: false,
      loading_municipios: false,
      estado: false,
      selection: 0,
      data_distrib: ''
    }
  }

  componentDidMount() {
    this.getUFs()
  }

  async getUFs() {
    const res = await API.get(`regiao/estados/siglas`)
    this.setState({ UFs: res.data })
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

  async getMunicipios() {
    this.setState({ loading_municipios: true })
    const res = await API.get(`regiao/municipios/${this.state.estado}`)
    let municipios = res.data
    this.setState({ municipios: municipios })
    this.setState({ loading_municipios: false })
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
          }>{municipio['nome']}</option>
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

  selecionarMunicipio(e, municipio) {
    
  }

  handleChange(event) {
    this.setState( { num_processo: event.target.value } );
  }

  selecionarData = data => {
    this.setState({ data_distrib: data })
  }

  handleSubmit(event) {
    console.log(this.state)
    event.preventDefault();
  }

  render() {
    return (
      <Form>

        <Form.Row>
          <Form.Group as={Col} controlId="num_processo">
            <Form.Label>Número do processo</Form.Label>
            <Form.Control type="text" value={this.state.num_processo} placeholder="" maxLength="40" />
          </Form.Group>
          <Form.Group as={Col} controlId="reu_principal">
            <Form.Label>Réu principal</Form.Label>
            <Form.Control type="text" value={this.state.reu_principal} onChange={(e)=>{ this.setState({ reu_principal: e.target.value }) }} placeholder="" maxLength="200" />
          </Form.Group>
          <Form.Group as={Col} controlId="valor_causa">
            <Form.Label>Valor da causa</Form.Label>
            <CurrencyInput className="form-control" prefix="R$ " decimalSeparator="," thousandSeparator="." value="" />
          </Form.Group>
          <Form.Group as={Col} controlId="data_distrib">
            <Form.Label>Data de distribuição</Form.Label>
            <Datepicker className="form-control" timeFormat="dd/MM/yyyy" onChange={this.selecionarData} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Vara </Form.Label>
            <Form.Control type="vara" placeholder="" />
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Estado </Form.Label>
            <Form.Control as="select">
              <option onClick={(e) => { this.selecionarEstado(e, null) }}>selecione</option>
              {this.state.UFs.map((uf) => {
                return (
              <option key={uf} onClick={(e) => { this.selecionarEstado(e, uf) }}>{uf}</option>
                );
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Comarca </Form.Label>
            { this.state.loading_municipios ? <Loading /> : this.selectMunicipio() }
          </Form.Group>
        </Form.Row>

        <Button variant="primary" className="float-right" type="button" onClick={(e) => {this.handleSubmit(e)}}>Cadastrar</Button>
      </Form>
    )
  }
}

export default FormNovoProcesso