// Modules
import React, { Component } from 'react';
import { faImages, faChessBoard, circle, faSquare, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

// Components
import {Tooltip} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Contexts
import {withAnimationsContext, AnimationsContext} from './Contexts/AnimationsContext';
import {withQRCodeAPIContext, QRCodeAPIContext} from './Contexts/QRCodeAPIContext';


class CustomTag extends React.Component {
  constructor(){
    super();
  }

  render() {
    let toolTipTitle = (this.props.type == "backgroundColor" ||
                      this.props.type == "pixelColor" ) ?  ("#" + this.props.tagInfo ) : this.props.tagInfo;

    let isMessage = this.props.type == "message" ;

    let isBackgroundColor = this.props.type == "backgroundColor" &&
      this.props.qrcodeAPIContext.qrcodeInfo.backgroundColor != "FFFFFF" ;

    let isPixelColor = this.props.type == "pixelColor"  &&
      this.props.qrcodeAPIContext.qrcodeInfo.pixelColor != "000000";

    let isWarning = this.props.type.includes("warning");

    let isStencil = this.props.type == "stencil";

    let isResolution = this.props.type == "resolution";

    let isTileShape = this.props.type == "tileShape";

    let isUserUploadedImage = this.props.type.includes("userUploadedImage");

    let tagDisplay = "";

    let imageUploadProgress = this.props.data == "" ? 0 : this.props.data;

    let uploadedImageLink = this.props.data;

    let isAnimation = this.props.type == 'animation';

    if (this.props.qrcodeAPIContext.qrcodeInfo.stencil && (this.props.type == "backgroundColor" || this.props.type == "pixelColor" )) {
      toolTipTitle = "Colors are not compatible with transparent mode";
      tagDisplay = "is-unclickable";
    }

    let gearDisplay = this.props.gearLoadingAnimationDisplay ? "is-hidden" : "";

    let gearClasses = ["icon", "animated", "tag"];
    if (this.props.gearLoadingAnimationIn) {
      gearClasses.push("fadeIn");
    }else if (this.props.gearLoadingAnimationOut) {
      gearClasses.push("fadeOut");
    }
    return (
      <Tooltip className="customTagWrapper" title={toolTipTitle} placement="right" mouseLeaveDelay={0}>
        <div id={"customTag" + this.props.id} className="customTag control">
          {
            isMessage &&
            <a href={toolTipTitle}>
              <div className="tags has-addons">
                <span className="tag">URL</span>
                <span className="tag is-link">
                  <i className="fas fa-link"></i>
                </span>
              </div>
            </a>
          }
          {
            isBackgroundColor &&
            <div className={"tags has-addons " + tagDisplay}>
              {
                gearDisplay &&
                <div className={ gearClasses.join(" ")} >
                  <i className="fa fa-cog fa-spin fa-3x fa-fw" style={{width:"auto", height:"70%",margin:"auto"}}></i>
                </div>
              }
              <span className="tag">Background</span>
              <span className="tag is-primary" style={{ backgroundColor: toolTipTitle }}>
                <FontAwesomeIcon icon={faSquare} style={{ color : toolTipTitle == '#FFFFFF' ? '#000000' : '#FFFFFF' }}/>
              </span>
            </div>
          }
          {
            isPixelColor &&
            <div className={"tags has-addons " + tagDisplay}>
              {
                gearDisplay &&
                <div className={gearClasses.join(" ")} >
                  <i className="fa fa-cog fa-spin fa-3x fa-fw" style={{width:"auto", height:"70%",margin:"auto"}}></i>
                </div>
              }
              <span className="tag">Pixel</span>
              <span className="tag " >
                <FontAwesomeIcon icon={faSquare} style={{ color : toolTipTitle }} />
              </span>
            </div>
          }
          {
            isWarning && !this.props.qrcodeAPIContext.qrcodeInfo.stencil &&
            <div className="tags has-addons">

              <span className="tag">Warning</span>
              <span className="tag " >
                <FontAwesomeIcon icon={faExclamationTriangle} style={{ color : "orange" }} />
              </span>
            </div>
          }
          {
            isStencil &&
            <div className="tags has-addons">
              {
                gearDisplay &&
                <div className={gearClasses.join(" ")} >
                  <i className="fa fa-cog fa-spin fa-3x fa-fw" style={{width:"auto", height:"70%",margin:"auto"}}></i>
                </div>
              }
              <span className="tag">Transparent Background</span>
              <span className="tag " >
                <FontAwesomeIcon icon={faChessBoard}  />
              </span>
            </div>
          }
          {
            isResolution &&
            <div className="tags has-addons">
              {
                gearDisplay &&
                <div className={gearClasses.join(" ")} >
                  <i className="fa fa-cog fa-spin fa-3x fa-fw" style={{width:"auto", height:"70%",margin:"auto"}}></i>
                </div>
              }
              <span className="tag">Resolution</span>
              <span className="tag is-info" >
                {toolTipTitle}
              </span>
            </div>
          }
          {
            isTileShape &&
            <div className="tags has-addons">
              {
                gearDisplay &&
                <div className={gearClasses.join(" ")} >
                  <i className="fa fa-cog fa-spin fa-3x fa-fw" style={{width:"auto", height:"70%",margin:"auto"}}></i>
                </div>
              }
              <span className="tag">Tile Shape</span>
              <span className="tag " >
                <FontAwesomeIcon icon={this.props.qrcodeAPIContext.qrcodeInfo.tileShape} style={{ color : "black" }} />
              </span>
            </div>
          }

          {
            isUserUploadedImage && imageUploadProgress < 100 &&
            <div className="tags has-addons">
              {
                gearDisplay &&
                <div className={gearClasses.join(" ")} >
                  <i className="fa fa-cog fa-spin fa-3x fa-fw" style={{width:"auto", height:"70%",margin:"auto"}}></i>
                </div>
              }
              <span className="tag">Processing..</span>
              <span className="tag is-info" >
                {imageUploadProgress + "%"}
              </span>
            </div>
          }
          {
            isUserUploadedImage && imageUploadProgress == 100 &&
            <a href={toolTipTitle}>
              <div className="tags has-addons">
                {
                  gearDisplay &&
                  <div className={gearClasses.join(" ")} >
                    <i className="fa fa-cog fa-spin fa-3x fa-fw" style={{width:"auto", height:"70%",margin:"auto"}}></i>
                  </div>
                }
                <span className="tag">Downloading..</span>
                <span className="tag is-link" >
                  <FontAwesomeIcon icon={faImages}/>
                </span>
              </div>
            </a>
          }
          {
            isUserUploadedImage && imageUploadProgress == 101 &&
            <a href={toolTipTitle}>
              <div className="tags has-addons">
                  <span className="tag">Custom Image</span>
                  <span className="tag is-link" >
                    <FontAwesomeIcon icon={faImages}/>
                  </span>
              </div>
            </a>
          }
          {
            isAnimation &&
            <div className="tags has-addons">
              
            </div>
          }
        </div>
      </Tooltip>

    );
  }
}

export default withQRCodeAPIContext(withAnimationsContext(CustomTag));
