import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Loading from '../Loading'
import API from '../../services/api'

import { Card, Badge, Button, Pagination, ListGroup } from 'react-bootstrap'
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
        },
        loading: true
      }
    }

    componentDidMount() {
        this.getPage(1)
    }

    async getPage(page) {
        this.setState({ loading: true })
        const res = await API.get(`processos/pagina/${page}`)
        const { items, ...paginacao } = res.data
        this.setState({ processos: items, paginacao: paginacao, loading: false })
    }

    changePage(e, page) {
        this.getPage(page)
    }

    pageNumbers = (pages, active) => {
        let items = []
        for (let i = 1; i <= pages; i++) {
            items.push(
                <Pagination.Item key={i} active={i === active} onClick={(e) => { this.changePage(e, i) }}>{i}</Pagination.Item>,
            );
        }
        return items
    }

    prevPage() { }

    nextPage() { }

    pagination() {
        if(this.state.paginacao.paginas > 1) {
            return (
            <Pagination>
                { this.state.paginacao.paginas > 3 ? <Pagination.Prev onClick={this.prevPage} /> : null }
                { this.pageNumbers(this.state.paginacao.paginas, this.state.paginacao.pagina) }
                { this.state.paginacao.paginas > 3 ? <Pagination.Next onClick={this.nextPage} /> : null }
            </Pagination>
            )
        }
    }

    render() {
        if(this.state.loading) return <Loading />
        return (
            <section>
                <header>
                        <Link to="/novo"><Button><i className="material-icons">folder_open</i><span>Novo...</span></Button></Link>
                        <h4>Processos judiciais</h4>
                </header>
                <div>
                {this.state.processos.map((processo) => <CardProcesso dadosProcesso={processo} key={processo.num_processo} /> )}
                </div>
                <footer>
                    {this.pagination()}
                </footer>
            </section>
        )
    }

    /*
    render() {
        if(this.state.loading) return <Loading />
        return (
            <section>
                <header>
                        <Link to="/novo"><Button><i className="material-icons">folder_open</i><span>Novo...</span></Button></Link>
                        <h4>Processos judiciais</h4>
                </header>
                <div>
                    <Table responsive bordered hover>
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
                                            <Link to={`/processo/${processo.num_processo}/${this.state.paginacao.pagina}`}>{processo.num_processo}</Link>
                                        </td>
                                        <td className="text-center align-middle">{processo.data_distrib}</td>
                                        <td className="text-center align-middle">{processo.reu_principal}</td>
                                        <td className="text-center align-middle">{processo.valor_causa}</td>
                                        <td className="text-center align-middle">{processo.vara}</td>
                                        <td className="text-center align-middle">{processo.codibge}</td>
                                        <td className="text-center align-middle">{processo.comarca}</td>
                                        <td className="text-center align-middle">{processo.uf}</td>
                                        <td className="text-center align-middle">{processo.criado}</td>
                                        <td className="text-center align-middle">{ (processo.atualizado !== '31/12/1969') ? processo.atualizado : '-' }</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <footer>
                    {this.pagination()}
                </footer>
            </section>
        )
    }*/
}

class CardProcesso extends Component {
    constructor(props) {
        super(props)
        this.state = {
            processo: this.props.dadosProcesso
        }
    }

    render() {
        return (
            <Card style={{ marginTop: '15px' }}>
                <Card.Body>
                    <div className="float-right text-right" style={{ width: '50%' }}>
                        <p><b>Data de distribuição:</b> { this.state.processo.data_distrib }</p>
                    </div>
                    <div style={{ width: '50%' }}>
                        <Card.Title><span>N.º {this.state.processo.num_processo}</span> - {this.state.processo.reu_principal}</Card.Title>
                        <Card.Text>
                            <p>{ this.state.processo.vara+', '+this.state.processo.comarca+' - '+this.state.processo.uf }</p>
                            <h4>
                                Valor <Badge variant="primary">R$ { this.state.processo.valor_causa }</Badge>
                            </h4>
                        </Card.Text>
                    </div>
                </Card.Body>
                <Pedidos />
            </Card>
        )
    }
}

class Pedidos extends Component {
    render() {
        return (
            <div>
                <Card.Body>
                    <Card.Title><b>Pedidos</b></Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </div>
        )
    }
}

export default Processos