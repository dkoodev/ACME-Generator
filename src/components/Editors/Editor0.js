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
      titleAnimations: false,
      textAreaInputValue: "",
      requestLoading : false,
      requestSuccess : false,
    }
  }

  requestLoadingStart(){
    this.setState({
      requestLoading : true,
      requestSuccess : false,
    });
  }

  requestLoadingDone(){
    this.setState({
      requestLoading : false
    });
    if (this.state.textAreaInputValue != "") {
      this.setState({
        requestSuccess : true,
      });
    }
  }

  inputChangeHandler(e){
    let inputValue = e.target.value;

    this.setState({
      textAreaInputValue: inputValue
    });
    this.props.qrcodeAPIContext.updateTag('message',inputValue, false, false, false );
    this.props.qrcodeAPIContext.textToConvertJS(inputValue);

    this.requestLoadingStart();
    this.props.animationsContext.nextButtonDisable();
    // Check if typing stopped for at least 1.5 seconds
    setTimeout(()=>{
      if(inputValue == this.state.textAreaInputValue){
        // Asking for QRcode only when user stops typing for 1.5 seconds
        this.props.qrcodeAPIContext.textToConvertAPI(inputValue)
          .then(()=> {
            this.requestLoadingDone();
            this.props.animationsContext.nextButtonAble();
          });
      }
    }, 1500);
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        titleAnimations: true,
      });
    }, 1000);
  }

  render() {
    // maybe clean up code by putting all classes into array and doing array.join(" ");
    let spacingAnimations   = this.state.textAreaInputValue !=  "" ? "squish" : "";
    let inputControlClasses = this.state.requestLoading     ?   "is-loading" : "";
    let iconRightClasses    = this.state.requestLoading     ||  this.state.textAreaInputValue == "" ? "is-hidden" : "";
    let inputStatusClasses  = !this.state.requestLoading    &&  this.state.requestSuccess ? "is-success" : "";
    let titleAnimations     = this.state.titleAnimations    ?   " bounce" : "";

    return (
      <div className={ "editor0 "}>
        <div className={"field " + spacingAnimations} >
            <div className={"title is-2 has-text-grey-dark has-text-centered " + titleAnimations} >
              Encode a message or a website
            </div>
          <div className={"editor0-textarea control has-icons-left has-icons-right is-large " + inputControlClasses} >
            <Tooltip title="Enter text or link to encode" placement="left" mouseLeaveDelay={0}>
              <input className={"input is-large is-rounded " + inputStatusClasses} maxLength="2953" onChange={this.inputChangeHandler.bind(this)} type="text" placeholder="https:// " />
            </Tooltip>
            <span className="icon is-medium is-left">
              <i className="fas fa-qrcode"></i>
            </span>
            <span className={"icon is-medium is-right " + iconRightClasses}>
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
