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
    }

    this.state = {
      chosenPixelColor: '',
      chosenBackgroundColor: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState){
    return false;
  }

  inputChangeHandler(e){

  }

  colorCompletePixel(color){
    let colorInHex = color.hex.replace('#','');
    this.setState({ chosePixelColor: colorInHex });
    setTimeout(()=>{
      if(colorInHex == this.state.chosePixelColor){
        this.props.requestStaticWithColor(this.state.chosenBackgroundColor,this.state.chosenPixelColor);
      }
    }, 1000);
  }

  colorCompleteBackground(color){
    let colorInHex = color.hex.replace('#','');
    this.setState({ chosenBackgroundColor: colorInHex });
    this.props.requestStaticWithColor(this.state.chosenBackgroundColor,this.state.chosenPixelColor);
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
      <div>
        <div className="editor1 container ">
          <br />
          <br />

          Choose Pixel Color
          <SliderPicker
            onChangeComplete={ this.colorCompletePixel.bind(this) }
          />
          <br />
          <br />
          <br />

          Choose Background Color
          <SliderPicker
            onChangeComplete={ this.colorCompleteBackground.bind(this) }
          />

          <br />
          <br />
          <br />
          <NextButton />

        </div>
      </div>
    );
  }
}

export default  withAnimationsContext(
                withStageContext(
                withQRCodeAPIContext(
                  Editor1
                )));
