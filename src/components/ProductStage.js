import React, { Component } from 'react';
import '../assets/css/styles.css';
import {StageContext, withStageContext} from './Contexts/StageContext';
import QRCode from 'qrcode.react';


class ProductStage extends React.Component {
  constructor(){
    super();

  }

  render() {
    return (
      <div id="ProductStage" >
        
        <div id="qrcode-container" className="box qrcode-container">
          <QRCode value={this.props.qrcodeString} style={{width:"100%",height:"100%", margin:"auto"}} renderAs="svg" size={300}  />
        </div>
      </div>
    );
  }
}

export default withStageContext(ProductStage);
