import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Loading from '../Loading'
import API from '../../services/api'

import { Card, Badge, Button, Pagination, ListGroup, Container, Row, Col } from 'react-bootstrap'
import './Processos.css'

import AdicionarPedido from './Novo/AdicionarPedido'

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
            <Card style={{ marginTop: '15px' }} className="shadow-sm">
                <Card.Body className="shadow-sm">
                    <div className="float-right text-right" style={{ width: '50%' }}>
                        <p><b>Data de distribuição:</b> { this.state.processo.data_distrib }</p>
                            <h4 className="float-right">
                                Valor <Badge variant="primary">R$ { this.state.processo.valor_causa }</Badge>
                            </h4>
                    </div>
                    <div style={{ width: '50%' }}>
                        <Card.Title className="text-primary"><b>{this.state.processo.num_processo}</b> - {this.state.processo.reu_principal}</Card.Title>
                        <Card.Text>
                            { this.state.processo.vara+', '+this.state.processo.comarca+' - '+this.state.processo.uf }
                        </Card.Text>
                    </div>
                </Card.Body>

                <Pedidos dados={this.state.processo.pedidos} />
            </Card>
        )
    }
}



class Pedidos extends Component {
    constructor(props) {
        super(props)
        this.state = { pedidos: this.props.dados }
    }

    render() {
        return (
            <Card.Body className="p-0">
                <Card.Title className="pl-3 pt-3"><b>Pedidos</b></Card.Title>
                <ListGroup variant="flush">
                    {this.state.pedidos.map((pedido) => <PedidoListItem dadosPedido={pedido} key="pedido.id" />)}
                </ListGroup>
            </Card.Body>
        )
    }
}



class PedidoListItem extends Component {
    constructor(props) {
        super(props)
        this.state = { pedido: this.props.dadosPedido }
    }

    edit(event, p) {
        this.setState({ editing: true })
    }

    // método passado para componente <AdicionarPedido />
    atualizado = () => {
        this.setState({ editing: false })
    }

    render() {
        const p = { ...this.state.pedido }
        
        if(this.state.editing) return (
            <ListGroup.Item>
                <AdicionarPedido dados_pedido={p} callbackAtualizado={this.atualizado} />
            </ListGroup.Item>
        )

        return (
            <ListGroup.Item action onClick={(e) => { this.edit(e, p) }}>
                <Container fluid>
                    <Row>
                        <Col xs={2} className="pl-0">{p.tipo_nome}</Col>
                        <Col xs={2}>R$ {p.valor_risco_provavel}</Col>
                        <Col className="pr-0 text-right"><b>Status:</b> {p.status}</Col>
                    </Row>
                </Container>
            </ListGroup.Item>
        )
    }
}



export default Processos