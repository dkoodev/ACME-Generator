// Modules
import React, { Component } from 'react';
import * as QRCodeAPIContextFunctions from './Contexts/QRCodeAPIContextFunctions.js';
import * as AnimationsContextFunctions from './Contexts/AnimationsContextFunctions.js';

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
        stage : 1,
        nextStage : this.nextStage.bind(this),
        prevStage : this.prevStage.bind(this),
      },
      animationsContext: {
        nextButtonDisplay  : true,
        nextButtonDisabled : true,
        nextButtonDisable : AnimationsContextFunctions.nextButtonDisable.bind(this),
        nextButtonAble : AnimationsContextFunctions.nextButtonAble.bind(this),
        nextButtonAppear : AnimationsContextFunctions.nextButtonAppear.bind(this),
        nextButtonDisappear : AnimationsContextFunctions.nextButtonDisappear.bind(this),
        stageTransition0_1  : AnimationsContextFunctions.stageTransition0_1.bind(this),
        stageTransition0_1AnimationStage0BodyOut : false,
        stageTransition0_1AnimationStage1BodyIn : false,
      },
      qrcodeAPIContext:{
        textToConvertJS : QRCodeAPIContextFunctions.textToConvertJS.bind(this),
        textToConvertAPI : QRCodeAPIContextFunctions.textToConvertAPI.bind(this),
        setPixelColor : QRCodeAPIContextFunctions.setPixelColor.bind(this),
        setBackgroundColor : QRCodeAPIContextFunctions.setBackgroundColor.bind(this),
        requestStatic : QRCodeAPIContextFunctions.requestStatic.bind(this),
        setResolutionValue : QRCodeAPIContextFunctions.setResolutionValue.bind(this),
        setStencil : QRCodeAPIContextFunctions.setStencil.bind(this),
        setTileShape: QRCodeAPIContextFunctions.setTileShape.bind(this),
        setTag : QRCodeAPIContextFunctions.setTags.bind(this),
        updateTag : QRCodeAPIContextFunctions.updateTag.bind(this),
        incrementRequestCount : QRCodeAPIContextFunctions.incrementRequestCount.bind(this),
        decrementRequestCount : QRCodeAPIContextFunctions.decrementRequestCount.bind(this),
        clearRequestCount : QRCodeAPIContextFunctions.clearRequestCount.bind(this),
        clearAllTags : QRCodeAPIContextFunctions.clearAllTags.bind(this),
        setWarningTags : QRCodeAPIContextFunctions.setWarningTags.bind(this),
        tags : [
          // DELETE next part for production
          {
            type : "message",
            tagInfo : "dkoo testing",
            gearLoadingAnimationIn : false,
            gearLoadingAnimationOut : false,
            gearLoadingAnimationDisplay : false,
          },
        ],
        warningTags : [],
        qrcodeInfo : {
          orderId : "",
          message : "dkoo testing",
          pixelColor : "000000",
          backgroundColor : "FFFFFF",
          resolutionValue : 400,
          stencil : false,
          tileShape : "",
          url : "",
          requestCount : 0,
        },
      },
    }
  }

  nextStage(){
    let stageContext = this.state.stageContext;
    stageContext.stage = stageContext.stage + 1;
    this.setState({
      stageContext:stageContext
    });
  }

  prevStage(){
    let stageContext = this.state.stageContext;
    stageContext.stage = stageContext.stage - 1;
    this.setState({
      stageContext:stageContext
    });
  }


  render() {

    // Product Stage container formatting
    let productStageContainerClasses = ["productStage"];
    if (this.state.stageContext.stage == 0) {
      if (this.state.qrcodeAPIContext.qrcodeInfo.message == "") {
        productStageContainerClasses.push("hide");
      }
    }else{
      productStageContainerClasses = productStageContainerClasses.concat(["column", "is-half"]);
    }


    // Editor Container formatting
    let editorContainerClasses = ["editor"];
    if (this.state.stageContext.stage == 0 ) {
      editorContainerClasses.push("container");
    }else{
      editorContainerClasses = editorContainerClasses.concat(["column", "is-half"]);
    }

    // Body Container formatting and animations
    let bodyContainerClasses = ["animated"];
    if (this.state.stageContext.stage == 0) {
      bodyContainerClasses.push("container");
    }else{
      bodyContainerClasses = bodyContainerClasses.concat(["columns", "container", "is-centered"]);
    }
    if (this.state.animationsContext.stageTransition0_1AnimationStage0BodyOut) {
      bodyContainerClasses.push("fadeOutLeft");
    }
    if (this.state.animationsContext.stageTransition0_1AnimationStage1BodyIn) {
      bodyContainerClasses.push("fadeInRight");
    }

    return (
      <div className={"stage" + this.state.stageContext.stage}>
        <NavigationBar  />

        <StageContext.Provider      value={this.state.stageContext}       >
        <AnimationsContext.Provider value={this.state}  >
        <QRCodeAPIContext.Provider  value={this.state}   >

        <Progressbar />

        <div id="body_container" className={ bodyContainerClasses.join(" ")} >
          {
            this.state.stageContext.stage == 0 &&
            <div className={editorContainerClasses.join(" ")}>
              <Editor />
            </div>
          }

          <div className={productStageContainerClasses.join(" ")}>
            <br />
            { this.state.stageContext.stage == 1 && <br /> }
            <ProductStage />
          </div>

          {
            this.state.stageContext.stage == 1 &&
            <div className={editorContainerClasses.join(" ")}>
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
