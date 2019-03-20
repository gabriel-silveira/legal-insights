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
    this.setState({ municipios: municipios, loading_municipios: false })
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

  selecionarData = data => {
    let dataFormatada = this.formatarData(data)
    let inputData = document.getElementById('data-distrib')
    this.setState((state) => {
      // preenche input com a data selecionada
      setTimeout(() => {
        inputData.value = dataFormatada
      }, 250)
      return { data_distrib: data }
    })
  }

  formatarData(data, anoMesDia) {
    let dia  = data.getDate().toString(),
    diaF = (dia.length === 1) ? '0'+dia : dia,
    mes  = (data.getMonth()+1).toString(),
    mesF = (mes.length === 1) ? '0'+mes : mes,
    anoF = data.getFullYear()
    return (anoMesDia) ? anoF+"-"+mesF+"-"+diaF : diaF+"/"+mesF+"/"+anoF;
  }

  handleSubmit(event) {
    console.log(this.state)
    event.preventDefault();
  }

  alterarValorCausa(event, maskedvalue, floatvalue){
    this.setState({valor_causa: floatvalue})
  }

  setReuPrincipal(nome_reu) {
    this.setState((state) => ({ reu_principal: nome_reu }))
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
            <Form.Control type="text" onChange={e => this.setReuPrincipal(e.target.value)} placeholder="" maxLength="200" />
          </Form.Group>
          <Form.Group as={Col} controlId="valor_causa">
            <Form.Label>Valor da causa</Form.Label>
            <CurrencyInput onChangeEvent={this.alterarValorCausa} className="form-control" prefix="R$ " decimalSeparator="," thousandSeparator="." />
          </Form.Group>
          <Form.Group as={Col} controlId="data_distrib">
            <Form.Label>Data de distribuição</Form.Label>
            <Datepicker className="form-control" id="data-distrib" timeFormat="dd/MM/yyyy" onChange={this.selecionarData} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Vara </Form.Label>
            <Form.Control type="vara" placeholder="" />
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

        <Button variant="primary" className="float-right" type="button" onClick={(e) => {this.handleSubmit(e)}}>Cadastrar</Button>
      </Form>
    )
  }
}

export default FormNovoProcesso