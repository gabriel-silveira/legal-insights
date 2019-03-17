import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import API from '../../routes'

import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import './Processos.css'

class Processos extends Component {
    constructor(props) {
      super(props)
      this.state = {
        processos: [],
        paginacao: {
            total: 0,
            limite: 0,
            pagina: 0,
            paginas: 0
        }
      }
    }

    componentDidMount() {
        let self = this
        axios.get(API.processos).then((res) => {
            const { items, ...paginacao } = res.data
            self.setState({ processos: items, paginacao: paginacao })
        })
    }

    pageNumbers = (pages, active) => {
        let items = []
        for (let i = 1; i <= pages; i++) {
            items.push(
                <Pagination.Item key={i} active={i === active} onClick={this.getPage}>{i}</Pagination.Item>,
            );
        }
        return items
    }

    prevPage() { }

    nextPage() { }

    render() {
      return (
          <section>
              <header>
                    <Button><i className="material-icons">folder_open</i><span>Novo...</span></Button>
                    <h4>Processos judiciais</h4>
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
                            <th className="text-center">Código IBGE</th>
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
                                    <td className="text-center">
                                        <Link to={'/processo/'+processo.num_processo}>{processo.num_processo}</Link>
                                    </td>
                                    <td className="text-center align-middle">{processo.data_distrib}</td>
                                    <td className="text-center align-middle">{processo.reu_principal}</td>
                                    <td className="text-center align-middle">{processo.valor_causa}</td>
                                    <td className="text-center align-middle">{processo.vara}</td>
                                    <td className="text-center align-middle">{processo.codibge}</td>
                                    <td className="text-center align-middle">{processo.comarca}</td>
                                    <td className="text-center align-middle">{processo.uf}</td>
                                    <td className="text-center align-middle">{processo.criado}</td>
                                    <td className="text-center align-middle">{processo.atualizado}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
              </div>
              <footer>
                <Pagination>
                    { this.state.paginacao.paginas > 3 ? <Pagination.Prev onClick={this.prevPage} /> : null }
                    { this.pageNumbers(this.state.paginacao.paginas, this.state.paginacao.pagina) }
                    { this.state.paginacao.paginas > 3 ? <Pagination.Next onClick={this.nextPage} /> : null }
                </Pagination>
              </footer>
          </section>
      )
    }
}

export default Processos