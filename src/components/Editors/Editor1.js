// Modules
import React, { Component } from 'react';

// Contexts
import {withStageContext, StageContext} from '../Contexts/StageContext';
import {withAnimationsContext, AnimationsContext} from '../Contexts/AnimationsContext';
import {withQRCodeAPIContext, QRCodeAPIContext} from '../Contexts/QRCodeAPIContext';

// Components
import NextButton from '../NextButton';
import { SliderPicker } from 'react-color';


class Editor1 extends React.Component {
  constructor(){
    super();
    this.state = {
      iconRightClasses: "is-hidden",
      titleAnimations: "animated",
      spacingAnimations: "spacing ",
      inputControlClasses: "",
      inputStatusClasses: "",
      chosenPixelColor: '',
      chosenBackgroundColor: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState){
    return false;
  }


  pixelColorChangeComplete(color){
    this.props.customTagPixelColorLoading();
    let colorInHex = color.hex.replace('#','');
    let colorInHexBackground = this.state.chosenBackgroundColor;

    this.setState({ chosenPixelColor: colorInHex });
    this.props.changePixelColor(colorInHex);
    setTimeout(async ()=>{
      if(colorInHexBackground == this.state.chosenBackgroundColor &&
         colorInHex == this.state.chosenPixelColor
      ){
        await this.props.requestStaticWithColor(this.state.chosenBackgroundColor,this.state.chosenPixelColor);
        this.props.customTagPixelColorDone();
      }else{
        this.props.customTagPixelColorDone();
      }
    }, 1000);
  }

  backgroundColorChangeComplete(color){
    this.props.customTagBackgroundColorLoading();
    let colorInHex = color.hex.replace('#','');
    let colorInHexPixel = this.state.chosenPixelColor;
    this.props.changeBackgroundColor(colorInHex);
    this.setState({ chosenBackgroundColor: colorInHex });
    setTimeout(async ()=>{
      if(colorInHex == this.state.chosenBackgroundColor &&
         colorInHexPixel == this.state.chosenPixelColor
      ){
        await this.props.requestStaticWithColor(this.state.chosenBackgroundColor,this.state.chosenPixelColor);
        this.props.customTagBackgroundColorDone();
      }else{
        this.props.customTagBackgroundColorDone();
      }
    }, 1000);
  }


  render() {
    return (
      <div className="editor1 container ">
        <div className="title">
          Add your personal touch
        </div>
        Pixel Color
        <br />
        <br />

        <SliderPicker
          onChangeComplete={ this.pixelColorChangeComplete.bind(this) }
        />
        <br />
        <br />


        Background Color
        <br />
        <br />

        <SliderPicker
          onChangeComplete={ this.backgroundColorChangeComplete.bind(this) }
        />

        <br />
        <br />
        <br />
        <NextButton />

      </div>
    );
  }
}

export default  withAnimationsContext(
                withStageContext(
                withQRCodeAPIContext(
                  Editor1
                )));
