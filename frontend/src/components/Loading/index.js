import React from 'react';
import { css } from '@emotion/core';
import { BarLoader } from 'react-spinners';
import './styles.css'

const override = css`
    position: absolute;
    display: inline-block;
    top: 46%;
    left: 47%;
    border-color: red;
`;

class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className="sweet-loading">
        <BarLoader
          css={override}
          sizeUnit={"px"}
          size={10}
          color={'#3776BB'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}

export default AwesomeComponent