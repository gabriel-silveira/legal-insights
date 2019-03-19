import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const BackButton = withRouter(({ history }) => (
    <Button onClick={() => { history.push(`/`) }}><i className="material-icons padless">navigate_before</i><span>Voltar</span></Button>
))

export default BackButton