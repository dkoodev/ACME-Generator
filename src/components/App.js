// CSS
import '../assets/css/styles.css';

// Modules
import React, { Component } from 'react';
import QRCode from 'qrcode';

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

    this.nextStage = () => {
      this.setState(state => ({
        stage : state.stage + 1
      }));
    }
    this.prevStage = () => {
      this.setState(state => ({
        stage : state.stage - 1
      }));
    }
    this.state = {
      stageContext:{
        stage : 0,
        nextStage : this.nextStage,
        prevStage : this.prevStage,
      },
      qrcodeUrl: "",
    }
  }

  handleTextToConvert(text){
    // Handle textToConvert
    if(text != ""){
      QRCode.toDataURL(text)
        .then(url => {
          console.log(url);
          this.setState({
              qrcodeUrl: url,
          });
        })
        .catch(err => {
          console.error(err)
        })
    }else {
      this.setState({
          qrcodeUrl: "",
      });
    }
  }

  componentDidMount(){
    console.log("app.js mounted");
  }

  render() {
    let productStageContainerClasses = this.state.qrcodeUrl == "" ? "hide" : "container";
    let editorContainerClasses = this.state.stage == 0 ? "container" : "column";
    let bodyContainerClasses = this.state.stage == 0 ? "" : "columns";
    return (
      <div>
        <NavigationBar  />
        <StageContext.Provider value={this.state.stageContext}>
          <Progressbar />

          <div className="container">
            {/* <div className={bodyContainerClasses}> */}
              <div className="">
              <div className={editorContainerClasses}>
                <Editor textToConvert={this.handleTextToConvert.bind(this)}/>
              </div>
              <div className={"productStage " + productStageContainerClasses}>
                <ProductStage qrcodeUrl={this.state.qrcodeUrl}/>
              </div>
            </div>
          </div>
        </StageContext.Provider>
      </div>
    );
  }
}

export default App;
