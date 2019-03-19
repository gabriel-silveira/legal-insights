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
        selection: 0
      }
    }

    componentDidMount() {
      this.getUFs()
    }

    async getUFs() {
      const res = await API.get(`estados/siglas`)
      this.setState({ UFs: res.data })
    }

    render() {
      return (
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formBasicEmail">
              <Form.Label>Estado </Form.Label>
              <Form.Control as="select">
              {this.state.UFs.map((uf) => {
                return (
                <option key={uf}>{uf}</option>
                );
              })}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formBasicEmail">
              <Form.Label>Comarca </Form.Label>
              <Form.Control as="select">

              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formBasicEmail">
              <Form.Label>Vara </Form.Label>
              <Form.Control type="vara" placeholder="Vara" />
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