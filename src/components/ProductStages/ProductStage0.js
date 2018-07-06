// Modules
import React, { Component } from 'react';
import QRCode from 'qrcode.react';

// Contexts
import {withStageContext, StageContext} from '../Contexts/StageContext';
import {withAnimationsContext, AnimationsContext} from '../Contexts/AnimationsContext';
import {withQRCodeAPIContext, QRCodeAPIContext} from '../Contexts/QRCodeAPIContext';

class ProductStage0 extends React.Component {
  constructor(){
    super();
    this.state = {
      productStage0Animation: "",
    }
  }

  stage0NextButtonOnClickHandler(){
    setTimeout(()=>{
      this.setState({
        productStage0Animation: " fadeOutLeft ",
      });
      this.props.triggerEditor0Out();
    }, 200);
  }

  render() {
    let nextStageButtonClasses = "";
    let nextStageButtonAttr = "";
    nextStageButtonAttr = this.props.productStageNextButtonDisplay == "is-disabled" ? "disabled" : "";

    return (
      <div id="ProductStage0" className={"animated" + this.state.productStage0Animation} >
          <div id="qrcode-container-wrapper" >
            <div id="qrcode-container" className="box" >
              <QRCode value={this.props.qrcodeString} style={{  width:"100%", height:"100%", margin:"auto" }} renderAs="svg" size={300} />
            </div>
            <a id="stage0NextButton" onClick={this.stage0NextButtonOnClickHandler.bind(this)} className={"button is-link animated " } disabled={nextStageButtonAttr}>Customize</a>
          </div>

      </div>
    );
  }
}

export default  withAnimationsContext(
                withStageContext(
                withQRCodeAPIContext(
                  ProductStage0
                )));
