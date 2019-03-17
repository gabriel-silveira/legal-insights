import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'

import './Processos.css'

import { Button } from 'react-bootstrap'

class Processos extends Component {
    constructor(props) {
      super(props)
      this.state = {
        URI: 'http://localhost:8888/api/processos',
        processos: []
      }
      //this.editarProcesso = this.showStudent.bind(this)
    }

    editarProcesso(e, num_processo) {
        e.stopPropagation()
        console.log(num_processo)
    }

    componentDidMount() {
        let self = this
        axios.get(self.state.URI).then((res) => {
            self.setState({ processos: res.data })
        })
    }

    render() {
      return (
          <section>
              <header>
                    <Button variant="primary"><i className="material-icons">folder_open</i><span>Novo...</span></Button>
                    <h4 className="text-primary">Processos judiciais</h4>
              </header>
              <div>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th className="text-center">Número do processo</th>
                            <th className="text-center">Data de distribuição</th>
                            <th className="text-center">Réu principal</th>
                            <th className="text-center">Valor da causa</th>
                            <th className="text-center">Vara</th>
                            <th className="text-center">Comarca</th>
                            <th className="text-center">UF</th>
                            <th className="text-center">Criado</th>
                            <th className="text-center">Atualizado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.processos.map((processo) => {
                            return (
                                <tr key={processo.num_processo}>
                                    <td className="text-center"><Button variant="link" onClick={(e) => { this.editarProcesso(e, processo.num_processo) }}>{processo.num_processo}</Button></td>
                                    <td className="text-center">{processo.data_distrib}</td>
                                    <td className="text-center">{processo.reu_principal}</td>
                                    <td className="text-center">{processo.valor_causa}</td>
                                    <td className="text-center">{processo.vara}</td>
                                    <td className="text-center">{processo.comarca}</td>
                                    <td className="text-center">{processo.uf}</td>
                                    <td className="text-center">{processo.criado}</td>
                                    <td className="text-center">{processo.atualizado}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
              </div>
          </section>
      )
    }
}

export default Processos