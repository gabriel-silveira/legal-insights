import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'
import API from '../../../services/api'

class FormNovoProcesso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UFs: [],
      municipios: false,
      estado: false,
      selection: 0
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
    const res = await API.get(`regiao/municipios/${this.state.estado}`)
    let municipios = res.data
    this.setState({ municipios: municipios })
  }

  selectMunicipio() {
    // if(loading_municipios) LOADING_SPINNER
    if(this.state.municipios) {
      const options = this.state.municipios.map((municipio, index) => {
        return (
          <option key={index} value={municipio['codibge']}>{municipio['nome']}</option>
        );
      })

      return (
        <Form.Group as={Col} controlId="formBasicEmail">
          <Form.Label>Comarca </Form.Label>
          <Form.Control as="select">
            <option value="0">selecione a comarca</option>
            {options}
          </Form.Control>
        </Form.Group>
      )
    }
  }

  render() {
    return (
      <Form>
        <Form.Row>
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

          {this.selectMunicipio()}

          <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Vara </Form.Label>
            <Form.Control type="vara" placeholder="" />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group controlId="formBasicChecbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
          </Button>
      </Form>
    )
  }
}

export default FormNovoProcesso