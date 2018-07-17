// Modules
import React, { Component } from 'react';
import { faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

// Contexts
import {withStageContext, StageContext} from '../Contexts/StageContext';
import {withAnimationsContext, AnimationsContext} from '../Contexts/AnimationsContext';
import {withQRCodeAPIContext, QRCodeAPIContext} from '../Contexts/QRCodeAPIContext';

// Components
import NextButton from '../NextButton';
import { GithubPicker , ChromePicker} from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



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
      advancedColorTab : "pixel",
      advancedPickerColorOutput: "000000",
      uploadedFileList: [],
      lockedColor: "",
      lockColorButtonClicked: false,
      lockedColorHex: "",
      warningIconPixelTab: false,
      warningIconBackgroundTab: false,
      warnings : [],
      showContrastPercentageViewer: false,
      contrastDifference: 0,
    };
  }


  shouldComponentUpdate(nextProps, nextState){
    return  this.props.stage != nextProps.stage ||
    this.state.advancedColorTab != nextState.advancedColorTab ||
    this.state.showAdvanced != nextState.showAdvanced ||
    this.state.lockColorButtonClicked != nextState.lockColorButtonClicked ||
    this.props.extraTags != nextState.extraTags ||
    this.state.contrastDifference != nextState.contrastDifference
    ;
  }


  lockColorButtonOnClick(){
    console.log("lockedcolorhex", this.state.advancedPickerColorOutput);

    if (!this.state.lockColorButtonClicked) {
      this.setState({
        lockedColor : this.state.advancedColorTab,
        lockedColorHex : this.state.advancedPickerColorOutput,
        lockColorButtonClicked: true
      })
    } else{
      this.setState({
        lockedColor : "",
        lockedColorHex : "",
        lockColorButtonClicked: false
      })
    }
  }

  showPixelTab(){
    this.setState({
      advancedColorTab: "pixel",
    });
  }

  showBackgroundTab(){
    this.setState({
      advancedColorTab: "background",
    });
  }



  hideWarningBackgroundTab(){
    this.setState({
      warningIconPixelTab : false
    });
  }

  hideWarningPixelTab(){
    this.setState({
      warningIconBackgroundTab : false
    });
  }

  displayWarningBackgroundTab(){
    this.setState({
      warningIconPixelTab : true
    });
  }

  displayWarningPixelTab(){
    this.setState({
      warningIconBackgroundTab : true
    });
  }

  addWarning( name, tagInfo){
    console.log("adding warning");
    let warningTag = {
      type: "warning" + " " + name,
      tagInfo: tagInfo
    };
    let newWarnings = this.state.warnings;
    newWarnings.push(warningTag);
    this.setState({
      warnings : newWarnings,
    });
    this.props.setExtraTags(this.state.warnings);
  }

  removeWarning(name){
    this.setState((prevState)=>{
      warnings : prevState.warnings.filter((item)=>{
        return item.type == "warning" && item.tagInfo.includes(name);
      })
    });
    this.props.setExtraTags(this.state.warnings);
  }

  removeAllWarnings(){
    this.setState({
      warnings : [],
    });
    this.props.setExtraTags(this.state.warnings);
  }

  compareContrast(lockedColor, unlockedColor) {
    const reducer = (accumulator, currentValue) => accumulator + parseInt(currentValue, 16);

    let lockedColorRGB = lockedColor.match(/.{2}/g);
    let unlockedColorRGB = unlockedColor.match(/.{2}/g);
    let lockedColorGrayScale = lockedColorRGB.reduce(reducer, 0) / 3;
    let unlockedColorGrayScale = unlockedColorRGB.reduce(reducer, 0) / 3;
    let lockedColorPercentage = 100 * (lockedColorGrayScale / 256);
    let unlockedColorPercentage = 100 * (unlockedColorGrayScale / 256);
    return lockedColorPercentage - unlockedColorPercentage;
  }

  isColorValid( lockedColor, lockedColorHex, unlockedColorHex) {
    let contrastDiff = this.compareContrast(lockedColorHex, unlockedColorHex);
    if (lockedColor == "pixel") {
      // Background Color is lighter than pixel | Preferred
      if (contrastDiff < 0) {
        if (Math.abs(contrastDiff) > 40) {
          // console.log("Background Color is lighter than pixel, GREAT");
          return true;
        }else{
          // console.log("Background Color is lighter than pixel, could be better");
          this.addWarning("bgColorNotLightEnough", "Background Color should be lighter");
        }
      }else{
        // console.log("Background Color is darker than pixel, bad");
        this.addWarning("bgColorDarker", "Background Color should not be darker than pixel");
      }
    } else if(lockedColor == "background"){
      // Pixel Color is lighter than background
      if (contrastDiff < 0) {
        // console.log("Pixel Color is lighter than background, bad");
        this.addWarning("pxColorLighter", "Pixel Color should not be lighter than background");
      }else{
        if (Math.abs(contrastDiff) > 40) {
          // console.log("Pixel Color is darker than pixel, GREAT");
          return true;
        }else{
          // console.log("Pixel Color is darker than pixel, could be better");
          this.addWarning("pxColorLighter", "Pixel Color should be darker");
        }
      }
    } else{
      // Assumes lockcolor is pixel and unlocked is background
      // Background Color is lighter than pixel | Preferred
      if (contrastDiff < 0) {
        if (Math.abs(contrastDiff) > 40) {
          // console.log("Background Color is lighter than pixel, GREAT");
          return true;
        }
      }
      this.addWarning("bgColorDarker", "Colors are Invalid. Try using the lock feature");
    }
    return false;
  }

  showContrastPercentageViewer(){
    this.setState({
      showContrastPercentageViewer: true
    });
  }

  hideContrastPercentageViewer(){
    this.setState({
      showContrastPercentageViewer: false
    });
  }

  advancedPickerColorChange(color){
    if (! this.state.lockColorButtonClicked) return;
    let colorInHex = color.hex.toUpperCase().replace('#','');
    let contrastDifference = this.compareContrast(this.state.lockedColorHex, colorInHex);
    if (this.state.advancedColorTab == "background") {
      contrastDifference *= -1;
    }
    this.setState({
      contrastDifference : Math.round(contrastDifference)
    });
  }

  advancedPickerColorChangeComplete(color){
    let colorInHex = color.hex.toUpperCase().replace('#','');
    this.removeAllWarnings();
    this.setState({
      advancedPickerColorOutput : colorInHex
    });

    if (this.state.lockColorButtonClicked) {
      if (!this.isColorValid(this.state.lockedColor, this.state.lockedColorHex, colorInHex)) {
        this.showContrastPercentageViewer();
      }
    }else{
      if (this.state.advancedColorTab == 'pixel') {
        this.isColorValid('', colorInHex, this.state.chosenBackgroundColor);
      }else{
        this.isColorValid('', this.state.chosenPixelColor, colorInHex);
      }
    }

    if (this.state.advancedColorTab == "pixel") {
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
    if (this.state.showAdvanced) {
      this.setState({
        showAdvanced: false,
        advancedButtonDisplay : "is-outlined",
      });
    }else{
      this.setState({
        showAdvanced: true,
        advancedButtonDisplay : "",
      });
    }
  }

  render() {
    let advancedPixelTabDisplay = "";
    let advancedBackgroundTabDisplay = "";
    if (this.state.advancedColorTab == "pixel") {
      advancedPixelTabDisplay = "is-active";
      advancedBackgroundTabDisplay = "";
    }else if (this.state.advancedColorTab == "background") {
      advancedPixelTabDisplay = "";
      advancedBackgroundTabDisplay = "is-active";
    }

    let lockColorButtonDisabled = "";
    if (this.state.showAdvanced && this.state.lockColorButtonClicked && this.state.advancedColorTab != this.state.lockedColor) {
      lockColorButtonDisabled = "disabled";
    }

    let advancedPickerColorInput = this.state.advancedColorTab == "pixel" ? this.state.chosenPixelColor : this.state.chosenBackgroundColor;

    let advancedPickerClasses = "";
    let lockButtonText = "Lock Color";

    if (this.state.lockedColor == this.state.advancedColorTab) {
      advancedPickerClasses = "is-unclickable";
      lockButtonText = "Unlock Color";
    }
    let lockColorButtonClasses = this.state.lockColorButtonClicked ? "" : "is-outlined";
    let advancedPixelTabLockIconDisplay = this.state.lockedColor == "pixel" ? "" : "is-hidden";
    let advancedPixelTabWarningIconDisplay = this.state.warningIconPixelTab ? "" : "is-hidden";
    let advancedBackgroundTabLockIconDisplay = this.state.lockedColor == "background" ? "" : "is-hidden";
    let advancedBackgroundTabWarningIconDisplay = this.state.warningIconBackgroundTab ? "" : "is-hidden";

    let contrastPercentageViewerClasses = this.state.contrastDifference >= 40 ? "is-success" : "is-warning";

    return (
      <div className="editor1 container ">
        <div className="title">
          Add your personal touch
          <a className={"button is-info is-small advancedButton " + this.state.advancedButtonDisplay}
            onClick={this.toggleAdvanced.bind(this)}>
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
                    <li className={advancedPixelTabDisplay}>
                      <a onClick={this.showPixelTab.bind(this)}>
                        <FontAwesomeIcon className={advancedPixelTabLockIconDisplay} icon={faLock} style={{marginLeft:"7px", marginRight:"7px"}}/>
                        Pixel
                        <FontAwesomeIcon className={advancedPixelTabWarningIconDisplay} icon={faExclamationTriangle} style={{marginLeft:"7px", marginRight:"7px", color: "orange"}}/>

                      </a>

                    </li>
                    <li className={advancedBackgroundTabDisplay}>
                      <a onClick={this.showBackgroundTab.bind(this)}>
                        <FontAwesomeIcon className={advancedBackgroundTabLockIconDisplay} icon={faLock} style={{marginLeft:"7px", marginRight:"7px"}}/>
                        Background
                        <FontAwesomeIcon className={advancedBackgroundTabWarningIconDisplay} icon={faExclamationTriangle} style={{marginLeft:"7px", marginRight:"7px", color: "orange"}}/>
                      </a>
                    </li>
                  </ul>
                </div>

                <ChromePicker
                  disableAlpha={true}
                  color={advancedPickerColorInput}
                  onChangeComplete={this.advancedPickerColorChangeComplete.bind(this)}
                  onChange={this.advancedPickerColorChange.bind(this)}
                  className={"advancedPicker " + advancedPickerClasses}
                />

                <br />
                {/* TODO Add tooltip for explaining color contrast */}
                <a id="lockButton" className={"button is-black " + lockColorButtonClasses} onClick={this.lockColorButtonOnClick.bind(this)} disabled={lockColorButtonDisabled} >
                  {lockButtonText}
                </a>

                <br />
                {
                  this.state.showContrastPercentageViewer &&
                  <div id="contrastPercentageViewer" className={"notification animated fadeIn " + contrastPercentageViewerClasses} >
                    <h1>
                      Contrast
                    </h1>
                    <div id="contrastPercentage">
                      {this.state.contrastDifference + "%"}
                    </div>
                  </div>
                }
              </div>
            </div>
            <div className="column is-half">
                {/* <input type="checkbox" /> Transparent Background
                <br />
                <br />
                Resolution:
                <div className="select">
                  <select>
                    <option>150px</option>
                    <option>270px</option>
                    <option>400px</option>
                  </select>
                </div>
                <br />
                <br />
                Pixel Shape:
                <div className="select">
                  <select>
                    <option>Square</option>
                    <option>Circle</option>
                  </select>
                </div>
                <br /> */}

            </div>

          </div>

        }

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
