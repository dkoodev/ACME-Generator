// Modules
import React, { Component } from 'react';
import QRCode from 'qrcode.react';

class ProductStage1 extends React.Component {
  constructor(){
    super();
  }

  async stage0NextButtonOnClickHandler(){
    this.props.triggerEditor0Out();

  }

  render() {
    let nextStageButtonClasses = "";
    let nextStageButtonAttr = "";
    nextStageButtonAttr = this.props.productStageNextButtonDisplay == "is-disabled" ? "disabled" : "";

    return (
      <div id="ProductStage1" >
          <div id="qrcode-container-wrapper" >
            <div id="qrcode-container" className="box " >
              <QRCode value={this.props.qrcodeString} style={{  width:"100%", height:"100%", margin:"auto" }} renderAs="svg" size={300} />
            </div>
            <a id="stage1NextButton" onClick={this.stage0NextButtonOnClickHandler.bind(this)} className={"button is-link animated " } disabled={nextStageButtonAttr}>Animate</a>
          </div>

      </div>
    );
  }
}

export default ProductStage1;
