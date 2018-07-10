// Modules
import React, { Component } from 'react';
import * as APIDriver from '../assets/js/APIDriver';

// CSS
import '../assets/css/styles.css';

// Components
import NavigationBar from './NavigationBar';
import Progressbar from './Progressbar';
import ProductStage from './ProductStage';
import Editor from './Editor';

// Contexts
import {withStageContext, StageContext} from './Contexts/StageContext';
import {withAnimationsContext, AnimationsContext} from './Contexts/AnimationsContext';
import {withQRCodeAPIContext, QRCodeAPIContext} from './Contexts/QRCodeAPIContext';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      stageContext:{
        stage : 0,
        nextStage : this.nextStage.bind(this),
        prevStage : this.prevStage.bind(this),
      },
      animationsContext: {
        nextButtonAppear : this.nextButtonAppear.bind(this),
        nextButtonDisappear : this.nextButtonDisappear.bind(this),
        productStageNextButtonDisplay : "is-disabled",
        stageTransition0_1: this.stageTransition0_1.bind(this),
        stageTransitionAnimations: "",
      },
      qrcodeAPIContext:{
        textToConvertJS: this.textToConvertJS.bind(this),
        textToConvertAPI : this.textToConvertAPI.bind(this),
        qrcodeString: "",
        orderId:"",
        frameUrl:"",
        chosenPixelColor:"",
        changePixelColor:this.changePixelColor.bind(this),
        chosenBackgroundColor:"",
        changeBackgroundColor: this.changeBackgroundColor.bind(this),
        requestStaticWithColor: this.requestStaticWithColor.bind(this),
      },
    }
  }

  changePixelColor(color){
    let prevState = this.state;
    let qrcodeAPIContext = prevState.qrcodeAPIContext;
    qrcodeAPIContext.chosenPixelColor = color;
    this.setState({
      qrcodeAPIContext : qrcodeAPIContext,
    });
  }

  changeBackgroundColor(color){
    let prevState = this.state;
    let qrcodeAPIContext = prevState.qrcodeAPIContext;
    qrcodeAPIContext.chosenBackgroundColor = color;
    this.setState({
      qrcodeAPIContext : qrcodeAPIContext,
    });
  }

  async requestStaticWithColor(backgroundColor, pixelColor){
    let prevState = this.state;
    let qrcodeAPIContext = prevState.qrcodeAPIContext;

    let orderId = await APIDriver.requestPNGOnlyWithColor(this.state.qrcodeAPIContext.qrcodeString, backgroundColor, pixelColor);
    let frameUrl = await APIDriver.fetchPNGOnly(orderId, 1);

    qrcodeAPIContext.orderId= orderId;
    qrcodeAPIContext.frameUrl= frameUrl;

    this.setState({
      qrcodeAPIContext : qrcodeAPIContext,
    });
  }

  stageTransition0_1(){
    let prevState = this.state;
    let animationsContext = prevState.animationsContext;
    animationsContext.bodyStageTransitionAnimations = "fadeOutLeft";
    this.setState({
      animationsContext : animationsContext,
    });
    setTimeout(() => {
      this.nextStage();
      setTimeout(()=> {
        prevState = this.state;
        animationsContext = prevState.animationsContext;
        animationsContext.bodyStageTransitionAnimations = "fadeInRight";
        this.setState({
          animationsContext : animationsContext,
        });
      }, 200);
    }, 1000);
  }


  nextStage(){
    let prevState = this.state;
    let stageContext = prevState.stageContext;
    stageContext.stage = stageContext.stage + 1;
    this.setState({
      stageContext:stageContext
    });
  }

  prevStage(){
    let prevState = this.state;
    let stageContext = prevState.stageContext;
    stageContext.stage = stageContext.stage - 1;
    this.setState({
      stageContext:stageContext
    });
  }

  nextButtonAppear(){
    let prevState = this.state;
    let animationsContext = prevState.animationsContext;
    animationsContext.productStageNextButtonDisplay = "fadeIn";
    this.setState({
      animationsContext : animationsContext,
    });
  }

  nextButtonDisappear(){

    let prevState = this.state;
    let animationsContext = prevState.animationsContext;
    animationsContext.productStageNextButtonDisplay = "is-disabled";
    this.setState({
      animationsContext : animationsContext,
    });

  }

  textToConvertJS(text){
    // QR code generation through javascript engine
    let prevState = this.state;
    let qrcodeAPIContext = prevState.qrcodeAPIContext;
    if (text == "") {
      qrcodeAPIContext.qrcodeString = '';
    }else{
      qrcodeAPIContext.qrcodeString = text;
    }
    this.setState({
      qrcodeAPIContext : qrcodeAPIContext,
    });
  }

  async textToConvertAPI(text){
    // QR Code generation through API
    let prevState = this.state;
    let qrcodeAPIContext = prevState.qrcodeAPIContext;

    if(text != ""){
      // If using ACME API for qrcode generation, orderId and frameurl is necesary.
      this.textToConvertJS(text);
      // If using ACME API for qrcode generation, orderId and frameurl is necesary.
      let orderId = await APIDriver.requestPNGOnly(text);
      let frameUrl = await APIDriver.fetchPNGOnly(orderId, 1);

      qrcodeAPIContext.orderId= orderId;
      qrcodeAPIContext.frameUrl= frameUrl;

    }else {
      qrcodeAPIContext.orderId= '';
      qrcodeAPIContext.frameUrl= '';
    }

    this.setState({
      qrcodeAPIContext : qrcodeAPIContext,
    });
  }


  render() {
    let productStageContainerClasses  =  this.state.qrcodeAPIContext.qrcodeString == "" ? "hide"      :
                                                    this.state.stageContext.stage == 0  ? "container" : "column is-half";
    let editorContainerClasses        =  this.state.stageContext.stage            == 0  ? "container" : "column is-half";
    let bodyContainerClasses          =  this.state.stageContext.stage            == 0  ? "container" : "columns container is-centered";
    return (
      <div className={"stage" + this.state.stageContext.stage}>
        <NavigationBar  />

        <StageContext.Provider      value={this.state.stageContext}       >
        <AnimationsContext.Provider value={this.state.animationsContext}  >
        <QRCodeAPIContext.Provider  value={this.state.qrcodeAPIContext}   >

        <Progressbar />

        <div id="body_container" className={"animated " + bodyContainerClasses + " " + this.state.animationsContext.bodyStageTransitionAnimations} >
          {
            this.state.stageContext.stage == 0 &&
            <div className={editorContainerClasses}>
              <Editor />
            </div>
          }

          <div className={"productStage " + productStageContainerClasses}>
            <br />
            <ProductStage />
          </div>

          {

            this.state.stageContext.stage == 1 &&
            <div className={editorContainerClasses}>
              <br />
              <Editor />
            </div>
          }
        </div>

        </QRCodeAPIContext.Provider>
        </AnimationsContext.Provider>
        </StageContext.Provider>

      </div>
    );
  }
}

export default App;
