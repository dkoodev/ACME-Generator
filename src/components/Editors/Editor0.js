// Modules
import React, { Component } from 'react';

// Contexts
import {withStageContext, StageContext} from '../Contexts/StageContext';
import {withAnimationsContext, AnimationsContext} from '../Contexts/AnimationsContext';
import {withQRCodeAPIContext, QRCodeAPIContext} from '../Contexts/QRCodeAPIContext';

// Components
import { Tooltip } from 'antd';

class Editor0 extends React.Component {
  constructor(){
    super();
    this.state = {
      iconRightClasses: "is-hidden",
      titleAnimations: "animated",
      spacingAnimations: "",
      inputControlClasses: "",
      inputStatusClasses: "",
      nextButtonDisplay: "is-hidden",
      textAreaInputValue: "",
    }
  }

  spacingDisappear(){
    this.setState({
      spacingAnimations:  " squish ",
    });
  }

  spacingAppear(){
    this.setState({
      spacingAnimations:  "" ,
    });
  }

  loadingWheelAppear(){
    this.setState({
      inputControlClasses: "is-loading" ,
    });
  }

  loadingWheelDisappear(){
    this.setState({
      inputControlClasses: "" ,
    });
  }

  checkIconRightAppear(){
    this.setState({
      iconRightClasses: "",
    });
  }

  checkIconRightDisappear(){
    this.setState({
      iconRightClasses: "is-hidden",
    });
  }

  textAreaGreenAppear(){
    this.setState({
      inputStatusClasses: "is-success",
    });
  }

  textAreaGreenDisappear(){
    this.setState({
      inputStatusClasses: "",
    });
  }

  inputChangeHandler(e){
    let inputValue = e.target.value;

    this.setState({
      textAreaInputValue: inputValue
    });

    this.props.textToConvertJS(inputValue);

    if(inputValue == ""){
      this.spacingAppear();
    }else{
      this.spacingDisappear();
    }

    this.loadingWheelAppear();
    this.checkIconRightDisappear();
    this.textAreaGreenDisappear();
    this.props.nextButtonDisappear();

    // Check if typing stopped for at least 1.5 seconds
    setTimeout(()=>{
      if(inputValue == this.state.textAreaInputValue){
        // Asking for QRcode only when user stops typing for 1.5 seconds
        this.props.textToConvertAPI(inputValue)
          .then(()=> {
            if(this.state.textAreaInputValue == ""){
              this.checkIconRightDisappear();
              this.textAreaGreenDisappear();
            }else {
              this.checkIconRightAppear();
              this.textAreaGreenAppear();
            }
            this.loadingWheelDisappear();
            this.props.nextButtonAppear();
          });
      }
    }, 1500);
  }


  componentDidMount(){
    let animate = ()=>{
      this.setState((prevState,props)=> {return {
        titleAnimations: prevState.titleAnimations + " bounce",
      }});
    }
    setTimeout(animate, 1000);
  }

  render() {

    return (
      <div className={ "editor0 "}>
        <div className={"field" + this.state.spacingAnimations} >
            <div className={"title is-2 has-text-grey-dark has-text-centered " + this.state.titleAnimations} >
              Encode a message or a website
            </div>
          <div className={"editor0-textarea control has-icons-left has-icons-right is-large " + this.state.inputControlClasses} >
            <Tooltip title="Enter text or link to encode" placement="left" mouseLeaveDelay={0}>
              <input className={"input is-large is-rounded " + this.state.inputStatusClasses} maxLength="2953" onChange={this.inputChangeHandler.bind(this)} type="text" placeholder="https:// " />
            </Tooltip>
            <span className="icon is-medium is-left">
              <i className="fas fa-qrcode"></i>
            </span>
            <span className={"icon is-medium is-right " + this.state.iconRightClasses}>
              <i className="fas fa-check "></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default  withAnimationsContext(
                withStageContext(
                withQRCodeAPIContext(
                  Editor0
                )));
