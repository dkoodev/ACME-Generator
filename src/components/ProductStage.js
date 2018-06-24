import React, { Component } from 'react';
import '../assets/css/styles.css';
import {StageContext, withStageContext} from './Contexts/StageContext';

class ProductStage extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div id="ProductStage" >
        <div id="qrcode-container" className="box qrcode-container">
              <img id="qrcode"src={this.props.qrcodeUrl} height="auto" width="auto"/>
        </div>
      </div>
    );
  }
}

export default withStageContext(ProductStage);
