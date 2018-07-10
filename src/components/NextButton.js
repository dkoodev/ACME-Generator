// Modules
import React, { Component } from 'react';
import QRCode from 'qrcode.react';

// Contexts
import {withStageContext, StageContext} from './Contexts/StageContext';
import {withAnimationsContext, AnimationsContext} from './Contexts/AnimationsContext';
import {withQRCodeAPIContext, QRCodeAPIContext} from './Contexts/QRCodeAPIContext';

class NextButton extends React.Component {
  constructor(){
    super();
  }

  stage0NextButtonOnClickHandler(){
    this.props.nextButtonDisappear();
    setTimeout(()=>{
      this.props.stageTransition0_1();
    }, 200);
  }

  stage1NextButtonOnClickHandler(){
    this.props.nextButtonDisappear();

    setTimeout(()=>{
      this.props.stageTransition0_1();
    }, 200);
  }

  render() {
    let nextStageButtonClasses = "";
    let nextStageButtonAttr = "";
    nextStageButtonAttr = this.props.productStageNextButtonDisplay == "is-disabled" ? "disabled" : "";

    return (
      <div id="NextButton" >
        {
          this.props.stage == 0 &&
          <a id="stage0NextButton" onClick={this.stage0NextButtonOnClickHandler.bind(this)} className={"button is-link animated " } disabled={nextStageButtonAttr}>Customize</a>
        }
        {
          this.props.stage == 1 &&
          <a id="stage1NextButton" onClick={this.stage1NextButtonOnClickHandler.bind(this)} className={"button is-link animated " } disabled={nextStageButtonAttr}>Animate</a>
        }

      </div>
    );
  }
}

export default  withAnimationsContext(
                withStageContext(
                withQRCodeAPIContext(
                  NextButton
                )));
