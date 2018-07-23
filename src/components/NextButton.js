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
    // this.props.animationsContext.nextButtonDisappear();
    setTimeout(()=>{
      this.props.animationsContext.stageTransition0_1();
    }, 200);
  }

  stage1NextButtonOnClickHandler(){
    this.props.nextButtonDisappear();
    setTimeout(()=>{
      this.props.animationsContext.stageTransition0_1();
    }, 200);
  }

  render() {
    let nextStageButtonClasses = "";
    let nextStageButtonAttribute = "";

    switch (this.props.stage) {
      case 0:
        nextStageButtonClasses = this.props.animationsContext.nextButtonDisplay ? "" : "is-hidden" ;
        nextStageButtonAttribute = this.props.animationsContext.nextButtonDisabled ? "disabled" : "";
        break;
      case 1:
        nextStageButtonClasses = this.props.animationsContext.nextButtonDisplay ? "fadeIn" : "is-hidden" ;
        // nextStageButtonAttribute = this.props.animationsContext.nextButtonDisabled;
        nextStageButtonAttribute = this.props.qrcodeAPIContext.tags.some((item)=>{
          return item.type.includes("warning");
        });
        break;
    }

    return (
      <div id="NextButton" >
        {
          this.props.stage == 0 &&
          <a id="stage0NextButton" onClick={this.stage0NextButtonOnClickHandler.bind(this)} className={"button is-link animated " + nextStageButtonClasses} disabled={nextStageButtonAttribute}>Customize</a>
        }
        {
          this.props.stage == 1 &&
          <a id="stage1NextButton" onClick={this.stage1NextButtonOnClickHandler.bind(this)} className={"button is-link animated " } disabled={nextStageButtonAttribute}>Animate</a>
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
