import React, { Component } from 'react';
import '../assets/css/styles.css';
import {StageContext, withStageContext} from './Contexts/StageContext';
import QRCode from 'qrcode.react';


class ProductStage extends React.Component {
  constructor(){
    super();

  }

  componentWillUpdate(){

  }

  stage0NextButtonOnClickHandler(){
    this.props.nextStage();
  }

  render() {

    let nextStageButtonClasses = "";
    let nextStageButtonAttr = "";
    nextStageButtonAttr = this.props.nextStageButton == "is-disabled" ? "disabled" : "";
    // nextStageButtonClasses = this.props.nextStageButton != "is-disabled" ? "" : "";

    return (
      <div id="ProductStage" >
          <div id="qrcode-container-wrapper" >
            <div id="qrcode-container" className="box " >
              <QRCode value={this.props.qrcodeString} style={{  width:"100%", height:"100%", margin:"auto" }} renderAs="svg" size={300} />
              {/* <img src={this.props.frameUrl} style={{width:"100%",height:"100%", margin:"auto"}} /> */}
            </div>
            <a id="stage0NextButton" onClick={this.stage0NextButtonOnClickHandler.bind(this)} className={"button is-link animated " } disabled={nextStageButtonAttr}>Customize</a>
          </div>

      </div>
    );
  }
}

export default withStageContext(ProductStage);
