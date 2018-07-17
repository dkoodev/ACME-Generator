// Modules
import React, { Component } from 'react';

// Contexts
import {withStageContext, StageContext} from '../Contexts/StageContext';
import {withAnimationsContext, AnimationsContext} from '../Contexts/AnimationsContext';
import {withQRCodeAPIContext, QRCodeAPIContext} from '../Contexts/QRCodeAPIContext';

// Components
import NextButton from '../NextButton';
import { GithubPicker , ChromePicker} from 'react-color';
import { Upload, Icon, message } from 'antd';


class Editor2 extends React.Component {
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
      showAdvanced: true,
      advancedButtonDisplay: "is-outlined",
      advancedPixelTabDisplay: "is-active",
      advancedBackgroundTabDisplay:"",
      advancedPickerColor: "",
      uploadedFileList: [],
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

  toggleAdvanced(){
    console.log(this.state.showAdvanced);
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
    return  this.props.stage != nextProps.stage ||
            this.state.advancedPickerColor != nextState.advancedPickerColor ||
            this.state.showAdvanced != nextState.showAdvanced;
    ;
  }

  render() {
    const Dragger = Upload.Dragger;

    const draggerProps = {
      name: 'file',
      multiple: true, // TODO: make to state variable so only available on advanced
      action: 'https://acme.codes/coderunner/upload',
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
          this.setState({
            uploadedFileList : info.fileList
          });
          console.log("UPLOADED: ", this.state.uploadedFileList);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <div className="editor1 container ">
        <div className="title">
          Add your personal touch
          <a className={"button is-info is-small advancedButton " + this.state.advancedButtonDisplay}
            onClick={this.toggleAdvanced.bind(this)}>
            Advanced
          </a>
        </div>

        <div className="tabs is-centered is-fullwidth">
          <ul>
            <li className={this.state.advancedPixelTabDisplay}>
              <a onClick={this.showPixelTab.bind(this)}>Animate to Text</a>
            </li>
            <li className={this.state.advancedBackgroundTabDisplay}>
              <a onClick={this.showBackgroundTab.bind(this)}>Animate to Image</a>
            </li>
          </ul>
        </div>

        {
          this.state.showAnimateToText &&

          <div>
            Text to Animate
            <br />
            <br />

          </div>
        }

        {
          this.state.showAnimateToImage &&

          <div>
            Image to Animate
            <br />
            <br />
            <Dragger {...draggerProps}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </Dragger>
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
                  Editor2
                )));
