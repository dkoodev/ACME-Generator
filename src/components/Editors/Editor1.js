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
    let colorInHex = color.hex.replace('#','');
    this.setState({ chosenPixelColor: colorInHex });
    this.props.changePixelColor(colorInHex);
    setTimeout(()=>{
      if(colorInHex == this.state.chosenPixelColor){
        this.props.requestStaticWithColor(this.state.chosenBackgroundColor,this.state.chosenPixelColor);
      }
    }, 1000);
  }

  backgroundColorChangeComplete(color){
    let colorInHex = color.hex.replace('#','');
    this.props.changeBackgroundColor(colorInHex);
    this.setState({ chosenBackgroundColor: colorInHex });
    setTimeout(()=>{
      if(colorInHex == this.state.chosenBackgroundColor){
        this.props.requestStaticWithColor(this.state.chosenBackgroundColor,this.state.chosenPixelColor);
      }
    }, 1000);
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
            onChangeComplete={ this.pixelColorChangeComplete.bind(this) }
          />
          <br />
          <br />
          <br />

          Choose Background Color
          <SliderPicker
            onChangeComplete={ this.backgroundColorChangeComplete.bind(this) }
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
