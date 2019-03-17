import React from 'react'
import axios from 'axios'
import API from '../../routes'

const Processo = ({ match }) => {

    axios.get(API.processos+`/${match.params.id}`).then((res) => {
        console.log(res.data)
    })
    
    return (
        <div>Editar: {match.params.id}</div>
    )
}

export default Processo