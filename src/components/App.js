// CSS
import '../assets/css/styles.css';

// Modules
import React, { Component } from 'react';
import * as APIDriver from '../assets/js/APIDriver';

// Components
import NavigationBar from './NavigationBar';
import Progressbar from './Progressbar';
import ProductStage from './ProductStage';
import Editor from './Editor';

// Contexts
import {withStageContext, StageContext} from './Contexts/StageContext';

class App extends React.Component {
  constructor(){
    super();

    // Stage Context functions for nested components
    this.nextStage = () => {
      let prevState = this.state;
      let stageContext = prevState.stageContext;
      stageContext.stage = stageContext.stage + 1;
      this.setState(() => ({
        stageContext:stageContext
      }));
    }

    this.prevStage = () => {
      let prevState = this.state;
      let stageContext = prevState.stageContext;
      stageContext.stage = stageContext.stage - 1;
      this.setState(() => ({
        stageContext:stageContext
      }));
    }

    this.state = {
      stageContext:{
        stage : 0,
        nextStage : this.nextStage,
        prevStage : this.prevStage,
      },
      productStageNextButton : "is-hidden",
      qrcodeString:"",
      orderId:"",
      frameUrl:"",
    }
  }

  async handleTextToConvertJS(text){
    // QR code generation through javascript engine
    if(text != ""){
      this.setState({
        qrcodeString: text,
      });
    }else {
      this.setState({
        qrcodeString: '',
      });
    }

  }

  async handleTextToConvertAPI(text){
    // QR Code generation through API
    if(text != ""){
      // If using ACME API for qrcode generation, orderId and frameurl is necesary.
      this.setState({
        qrcodeString: text,
      });
      // If using ACME API for qrcode generation, orderId and frameurl is necesary.
      let orderId = await APIDriver.standardRequest(text);
      let frameUrl = await APIDriver.fetchFrame(orderId, 1);
      this.setState({
        orderId: orderId,
        frameUrl: frameUrl,
      });
    }else {
      this.setState({
        qrcodeString: '',
        orderId: '',
        frameUrl: '',
      });
    }
  }

  stage1ButtonAppear(){
    this.setState({
      productStageNextButton : "fadeIn",
    });
  }

  stage1ButtonDisappear(){
    this.setState({
      productStageNextButton : "is-disabled",
    });
  }

  render() {
    let productStageContainerClasses  =  this.state.qrcodeString          == "" ? "hide"      : "container";
    let editorContainerClasses        =  this.state.stageContext.stage    == 0  ? "container" : "column";
    let bodyContainerClasses          =  this.state.stageContext.stage    == 0  ? ""          : "columns";

    return (
      <div>
        <NavigationBar  />
        <StageContext.Provider value={this.state.stageContext}>
          <Progressbar />
          <div className="container">
              <div className={bodyContainerClasses}>
              <div className={editorContainerClasses}>
                <Editor textToConvertJS={this.handleTextToConvertJS.bind(this)}
                        textToConvertAPI={this.handleTextToConvertAPI.bind(this)}
                        stage1ButtonAppear={this.stage1ButtonAppear.bind(this)}
                        stage1ButtonDisappear={this.stage1ButtonDisappear.bind(this)}
                       />
              </div>
              <div className={"productStage " + productStageContainerClasses}>
                <br />
                <ProductStage qrcodeString={this.state.qrcodeString}
                              frameUrl={this.state.frameUrl}
                              nextStageButton={this.state.productStageNextButton}
                              />
              </div>
            </div>
          </div>
        </StageContext.Provider>
      </div>
    );
  }
}

export default App;
