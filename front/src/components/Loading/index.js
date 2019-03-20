import React from 'react';
import { css } from '@emotion/core';
import { BarLoader } from 'react-spinners';
import './styles.css'

class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      size: 10,
      css: css`
      position: absolute;
      display: inline-block;
      top: 46%;
      left: 47%;
      border-color: red;
  `
    }
  }

  render() {
    return (
      <div className="sweet-loading">
        <BarLoader
          css={this.state.css}
          sizeUnit={"px"}
          size={this.state.size}
          color={'#3776BB'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}

export default AwesomeComponent