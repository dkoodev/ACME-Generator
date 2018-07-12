// Modules
import React, { Component } from 'react';

// Contexts
import {withStageContext, StageContext} from '../Contexts/StageContext';
import {withAnimationsContext, AnimationsContext} from '../Contexts/AnimationsContext';
import {withQRCodeAPIContext, QRCodeAPIContext} from '../Contexts/QRCodeAPIContext';

// Components
import NextButton from '../NextButton';
import { GithubPicker , ChromePicker} from 'react-color';


class Editor1 extends React.Component {
  constructor(){
    super();
    this.state = {
      iconRightClasses: "is-hidden",
      titleAnimations: "animated",
      spacingAnimations: "spacing ",
      inputControlClasses: "",
      inputStatusClasses: "",
      chosenPixelColor: '000000',
      chosenBackgroundColor: 'FFFFFF',
      pixelColorGearLoading: false,
      backgroundColorGearLoading: false,
      showAdvanced: false,
      advancedButtonDisplay: "is-outlined",
      advancedPixelTabDisplay: "is-active",
      advancedBackgroundTabDisplay:"",
      advancedPickerColor: "",
    };
  }

  showPixelTab(){
    this.setState({
      advancedPixelTabDisplay: "is-active",
      advancedBackgroundTabDisplay: "",
      advancedPickerColor: this.state.chosenPixelColor,
    });

  }

  showBackgroundTab(){
    this.setState({
      advancedBackgroundTabDisplay: "is-active",
      advancedPixelTabDisplay: "",
      advancedPickerColor: this.state.chosenBackgroundColor,
    });
  }

  advancedPickerColorChangeComplete(color){
    if (this.state.advancedPixelTabDisplay == "is-active") {
      this.pixelColorChangeComplete(color);
    }else{
      this.backgroundColorChangeComplete(color);
    }
  }

  pixelColorChangeComplete(color){
    let colorInHex = color.hex.toUpperCase().replace('#','');
    let colorInHexBackground = this.state.chosenBackgroundColor;

    if (colorInHex == this.state.chosenPixelColor) {
      return;
    }

    this.props.customTagPixelColorLoading();
    this.setState({pixelColorGearLoading : true});

    this.setState({ chosenPixelColor: colorInHex });
    this.props.changePixelColor(colorInHex);
    setTimeout(async ()=>{
      if(colorInHexBackground == this.state.chosenBackgroundColor &&
         colorInHex == this.state.chosenPixelColor
      ){
        await this.props.requestStaticWithColor(this.state.chosenBackgroundColor,this.state.chosenPixelColor);
        this.props.customTagPixelColorDone();
        this.setState({pixelColorGearLoading : false});

        if (this.state.backgroundColorGearLoading) {
          this.props.customTagBackgroundColorDone();
          this.setState({backgroundColorGearLoading : false});
        }
      }
    }, 1000);
  }

  backgroundColorChangeComplete(color){
    let colorInHex = color.hex.toUpperCase().replace('#','');
    let colorInHexPixel = this.state.chosenPixelColor;

    if (colorInHex == this.state.chosenBackgroundColor) {
      return;
    }

    this.props.customTagBackgroundColorLoading();
    this.setState({backgroundColorGearLoading : true});

    this.props.changeBackgroundColor(colorInHex);
    this.setState({ chosenBackgroundColor: colorInHex });
    setTimeout(async ()=>{
      if(colorInHex == this.state.chosenBackgroundColor &&
         colorInHexPixel == this.state.chosenPixelColor
      ){
        await this.props.requestStaticWithColor(this.state.chosenBackgroundColor,this.state.chosenPixelColor);
        this.props.customTagBackgroundColorDone();
        this.setState({backgroundColorGearLoading : false});

        if (this.state.pixelColorGearLoading) {
          this.props.customTagPixelColorDone();
          this.setState({pixelColorGearLoading : false});
        }
      }
    }, 1000);
  }

  showAdvanced(){
    if (this.state.showAdvanced) {
      this.setState({
        showAdvanced: false,
        advancedButtonDisplay : "is-outlined",
      });
    }else{
      this.setState({
        showAdvanced: true,
        advancedButtonDisplay : "",
        advancedPickerColor : this.state.advancedPixelTabDisplay == "is-active" ? this.state.chosenPixelColor : this.state.chosenBackgroundColor,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state.advancedPickerColor != nextState.advancedPickerColor;
  }

  render() {
    return (
      <div className="editor1 container ">
        <div className="title">
          Add your personal touch
          <a className={"button is-info is-small advancedButton " + this.state.advancedButtonDisplay}
            onClick={this.showAdvanced.bind(this)}>
            Advanced
          </a>
        </div>
        {
          !this.state.showAdvanced &&
          <div className="columns">
            <div className="column ">
              <span>
                Pixel Color
              </span>
              <br />
              <br />

              <GithubPicker
                width="237px"
                triangle="hide"
                colors={['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB' ,'#000000']}
                onChangeComplete={ this.pixelColorChangeComplete.bind(this) }
                style={{margin:"auto"}}
              />
              <br />
              <br />

              Background Color
              <br />
              <br />
              <GithubPicker
                width="237px"
                triangle="hide"
                colors={['#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB','#FFFFFF']}
                onChangeComplete={ this.backgroundColorChangeComplete.bind(this) }
              />
            </div>
          </div>
        }
        {
          this.state.showAdvanced &&
          <div className="columns is-half">
            <div className="column">
              <div className="advancedOptions" >
                <div className="tabs is-centered is-fullwidth">
                  <ul>
                    <li className={this.state.advancedPixelTabDisplay}>
                      <a onClick={this.showPixelTab.bind(this)}>Pixel</a>
                    </li>
                    <li className={this.state.advancedBackgroundTabDisplay}>
                      <a onClick={this.showBackgroundTab.bind(this)}>Background</a>
                    </li>
                  </ul>
                </div>

                <ChromePicker
                  disableAlpha={true}
                  color={this.state.advancedPickerColor}
                  style={{margin:"0 0 auto auto"}}
                  onChangeComplete={this.advancedPickerColorChangeComplete.bind(this)}
                />
                <br />
                <br />


                <div className="control">
                  <input className="input" type="text" placeholder="Text input" />
                </div>
              </div>
            </div>
            <div className="column is-half">

            </div>
          </div>
        }

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
