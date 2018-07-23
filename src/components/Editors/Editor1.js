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
      showAdvanced: false,
      advancedColorTab : "pixel",
      advancedPickerColorOutput: "000000",
      lockedColor: "",
      lockColorButtonClicked: false,
      lockedColorHex: "",
      warningIconPixelTab: false,
      warningIconBackgroundTab: false,
      warnings : [],
      showContrastPercentageViewer: false,
      contrastDifference: 0,
      changes : 0,
    };
  }

  showPixelTab(){ this.setState({ advancedColorTab: "pixel", }); }

  showBackgroundTab(){ this.setState({ advancedColorTab: "background", }); }

  hideWarningBackgroundTab(){ this.setState({ warningIconPixelTab : false }); }

  hideWarningPixelTab(){ this.setState({ warningIconBackgroundTab : false }); }

  displayWarningBackgroundTab(){ this.setState({ warningIconPixelTab : true }); }

  displayWarningPixelTab(){ this.setState({ warningIconBackgroundTab : true }); }

  showContrastPercentageViewer(){ this.setState({ showContrastPercentageViewer : true }); }

  hideContrastPercentageViewer(){ this.setState({ showContrastPercentageViewer : false }); }


  lockColorButtonOnClick(){
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
    this.props.qrcodeAPIContext.setWarningTags(this.state.warnings);
  }

  removeWarning(name){
    this.setState((prevState)=>{
      warnings : prevState.warnings.filter((item)=>{
        return item.type == "warning" && item.tagInfo.includes(name);
      })
    });
    this.props.qrcodeAPIContext.setWarningTags(this.state.warnings);
  }

  removeAllWarnings(){
    this.setState({
      warnings : [],
    });
    this.props.qrcodeAPIContext.setWarningTags(this.state.warnings);
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
        this.isColorValid('', colorInHex, this.props.qrcodeAPIContext.qrcodeInfo.backgroundColor);
      }else{
        this.isColorValid('', this.props.qrcodeAPIContext.qrcodeInfo.pixelColor, colorInHex);
      }
    }

    if (this.state.advancedColorTab == "pixel") {
      this.pixelColorChangeComplete(color);
    }else{
      this.backgroundColorChangeComplete(color);
    }
  }

  pixelColorChangeComplete(color){
    // Process input
    let colorInHex = color.hex.toUpperCase().replace('#','');

    // Check redundancy
    if (colorInHex == this.props.qrcodeAPIContext.qrcodeInfo.pixelColor) {
      return;
    }

    // Update states and flags
    this.props.qrcodeAPIContext.setPixelColor(colorInHex);
    this.setState((prevState)=>{changes : prevState.changes + 1});
    let prevChanges = this.state.changes;

    // Enabling Animations
    this.props.qrcodeAPIContext.updateTag('pixelColor', colorInHex, true, false, true);

    // Buffer waiting for additional change
    setTimeout(async ()=>{
      if( colorInHex == this.props.qrcodeAPIContext.qrcodeInfo.pixelColor
        && prevChanges == this.state.changes
      ) {
        // Color didn't change for 1 second
        // No additional changes for 1 second
        this.setState((prevState)=>{changes : 0 });
        this.props.qrcodeAPIContext.incrementRequestCount();
        if (await this.props.qrcodeAPIContext.requestStatic()) {
          // No additional changes while requesting
          this.props.qrcodeAPIContext.clearAllTags();
        }
        this.props.qrcodeAPIContext.decrementRequestCount();
      }
    }, 1000);
  }

  backgroundColorChangeComplete(color){
    // Process input
    let colorInHex = color.hex.toUpperCase().replace('#','');
    // Check redundancy
    if (colorInHex == this.props.qrcodeAPIContext.qrcodeInfo.backgroundColor) {
      return;
    }
    // Update states and flags
    this.props.qrcodeAPIContext.setBackgroundColor(colorInHex);
    this.setState((prevState)=>{changes : prevState.changes + 1});
    let prevChanges = this.state.changes;

    // Enabling Animations
    this.props.qrcodeAPIContext.updateTag('backgroundColor', colorInHex, true, false, true);

    // Buffer waiting for additional change
    setTimeout(async ()=>{
      if( colorInHex == this.props.qrcodeAPIContext.qrcodeInfo.backgroundColor
        && prevChanges == this.state.changes
      ) {
        // Color didn't change for 1 second
        // No additional changes for 1 second
        this.setState((prevState)=>{changes : 0 });
        this.props.qrcodeAPIContext.incrementRequestCount();
        if (await this.props.qrcodeAPIContext.requestStatic()) {
          // No additional changes while requesting
          this.props.qrcodeAPIContext.clearAllTags();
        }
        this.props.qrcodeAPIContext.decrementRequestCount();
      }
    }, 1000);
  }


  toggleAdvanced(){
    this.setState({
      showAdvanced: this.state.showAdvanced ? false : true,
    });
  }

  resolutionSelectOptionsOnChange(e){
    // Process input
    let resolutionValue = e.target.value.replace('px','');
    resolutionValue = parseInt(resolutionValue);

    // Check redundancy
    if (resolutionValue == this.props.qrcodeAPIContext.qrcodeInfo.resolutionValue) {
      return;
    }

    // Update states and flags
    this.props.qrcodeAPIContext.setResolutionValue(resolutionValue);
    this.setState((prevState)=>{changes : prevState.changes + 1});
    let prevChanges = this.state.changes;

    // Enabling Animations
    this.props.qrcodeAPIContext.updateTag('resolution', e.target.value, true, false, true);

    // Buffer waiting for additional change
    setTimeout(async ()=>{
      if( resolutionValue == this.props.qrcodeAPIContext.qrcodeInfo.resolutionValue
        && prevChanges == this.state.changes
      ) {
        // resolution didn't change for 1 second
        // No additional changes for 1 second
        this.setState((prevState)=>{changes : 0 });
        this.props.qrcodeAPIContext.incrementRequestCount();
        if (await this.props.qrcodeAPIContext.requestStatic()) {
          // No additional changes while requesting
          this.props.qrcodeAPIContext.clearAllTags();
        }
        this.props.qrcodeAPIContext.decrementRequestCount();
      }
    }, 1000);
  }

  stencilOptionOnChange(e){
    // Process input
    let stencil = e.target.checked;

    // Check redundancy
    if (stencil == this.props.qrcodeAPIContext.qrcodeInfo.stencil) {
      return;
    }

    // Update states and flags
    this.props.qrcodeAPIContext.setStencil(stencil);
    this.setState((prevState)=>{changes : prevState.changes + 1});
    let prevChanges = this.state.changes;

    // Enabling Animations
    this.props.qrcodeAPIContext.updateTag('stencil', "Colors in the background to show transparency", true, false, true);

    // Buffer waiting for additional change
    setTimeout(async ()=>{
      if( stencil == this.props.qrcodeAPIContext.qrcodeInfo.stencil
        && prevChanges == this.state.changes
      ) {
        // StencilOption didn't change for 1 second
        // No additional changes for 1 second
        this.setState((prevState)=>{changes : 0 });
        this.props.qrcodeAPIContext.incrementRequestCount();
        if (await this.props.qrcodeAPIContext.requestStatic()) {
          // No additional changes while requesting
          this.props.qrcodeAPIContext.clearAllTags();
        }
        this.props.qrcodeAPIContext.decrementRequestCount();
      }
    }, 1000);
  }

  tileShapeSelectOptionsOnChange(e){
    // Process input
    let tileShape = e.target.value.toLowerCase();

    // Check redundancy
    if (tileShape == this.props.qrcodeAPIContext.qrcodeInfo.tileShape) {
      return;
    }

    // Update states and flags
    this.props.qrcodeAPIContext.setTileShape(tileShape);
    this.setState((prevState)=>{changes : prevState.changes + 1});
    let prevChanges = this.state.changes;

    // Enabling Animations
    this.props.qrcodeAPIContext.updateTag('tileShape', "Tiles are dots", true, false, true);

    // Buffer waiting for additional change
    setTimeout(async ()=>{
      if( tileShape == this.props.qrcodeAPIContext.qrcodeInfo.tileShape
        && prevChanges == this.state.changes
      ) {
        // Tileshape didn't change for 1 second
        // No additional changes for 1 second
        this.setState((prevState)=>{changes : 0 });
        this.props.qrcodeAPIContext.incrementRequestCount();
        if (await this.props.qrcodeAPIContext.requestStatic()) {
          // No additional changes while requesting
          this.props.qrcodeAPIContext.clearAllTags();
        }
        this.props.qrcodeAPIContext.decrementRequestCount();
      }
    }, 1000);
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

    let advancedPickerColorInput = this.state.advancedColorTab == "pixel" ? this.props.qrcodeAPIContext.qrcodeInfo.pixelColor : this.props.qrcodeAPIContext.qrcodeInfo.backgroundColor;

    let advancedPickerClasses = "";
    let lockButtonText = "Lock Color";

    if (this.state.lockedColor == this.state.advancedColorTab  ) {
      advancedPickerClasses = "is-unclickable";
      lockButtonText = "Unlock Color";
    }

    let colorPickerClasses = "";

    if (this.props.qrcodeAPIContext.qrcodeInfo.stencil) {
      colorPickerClasses = "is-unclickable";
    }

    let lockColorButtonClasses = this.state.lockColorButtonClicked ? "" : "is-outlined";
    let advancedPixelTabLockIconDisplay = this.state.lockedColor == "pixel" ? "" : "is-hidden";
    let advancedPixelTabWarningIconDisplay = this.state.warningIconPixelTab ? "" : "is-hidden";
    let advancedBackgroundTabLockIconDisplay = this.state.lockedColor == "background" ? "" : "is-hidden";
    let advancedBackgroundTabWarningIconDisplay = this.state.warningIconBackgroundTab ? "" : "is-hidden";

    let contrastPercentageViewerClasses = this.state.contrastDifference >= 40 ? "is-success" : "is-warning";

    let advancedButtonDisplay = this.state.showAdvanced ? "" : "is-outlined";
    return (
      <div className="editor1 container ">
        <div className="title">
          Add your personal touch
          <a className={"button is-info is-small advancedButton " + advancedButtonDisplay}
            onClick={this.toggleAdvanced.bind(this)}>
            Advanced
          </a>
        </div>
        {
          !this.state.showAdvanced &&
          <div className="columns">
            <div className={"column " + colorPickerClasses}>
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
            <div className={"column " + colorPickerClasses}>
              <div className={"advancedOptions "} >
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
              <input type="checkbox" onChange={this.stencilOptionOnChange.bind(this)}/> Transparent Background
              <br />
              <br />
              Resolution:
              <div className="select">
                <select onChange={this.resolutionSelectOptionsOnChange.bind(this)}>
                  <option>400px</option>
                  <option>270px</option>
                  <option>150px</option>
                </select>
              </div>
              <br />
              <br />
              Pixel Shape:
              <div className="select">
                <select onChange={this.tileShapeSelectOptionsOnChange.bind(this)}>
                  <option>Square</option>
                  <option>Circle</option>
                </select>
              </div>
              <br />
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
