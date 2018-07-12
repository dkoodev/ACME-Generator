// Modules
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Components
import {Tooltip} from 'antd';
import { square } from '@fortawesome/free-solid-svg-icons'

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
    return (
      <Tooltip className="customTagWrapper" title={toolTipTitle} placement="right" mouseLeaveDelay={0}>
        <div id={"customTag" + this.props.id} className="customTag control">
          {
            this.props.type == "message" &&
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
            this.props.type == "backgroundColor" &&
            (this.props.chosenBackgroundColor != "FFFFFF" ||
            (this.props.chosenBackgroundColor == "FFFFFF" && this.props.customTagBackgroundColorAnimations.indexOf("is-hidden") == -1)) &&
            <div className="tags has-addons ">
              {
                this.props.customTagBackgroundColorAnimations.indexOf("is-hidden") == -1 &&
                <div className={"icon animated " + this.props.customTagBackgroundColorAnimations.join(" ")} >
                  <i className="fa fa-cog fa-spin fa-3x fa-fw" style={{width:"auto", height:"70%",margin:"auto"}}></i>
                </div>
              }
              <span className="tag">Background Color</span>
              <span className="tag is-primary" style={{ backgroundColor: toolTipTitle }}>
                <FontAwesomeIcon icon="square" style={{ color : toolTipTitle == '#FFFFFF' ? '#000000' : '#FFFFFF' }}/>
              </span>

            </div>
          }
          {
            this.props.type == "pixelColor"  &&
            (this.props.chosenPixelColor != "000000" ||
            (this.props.chosenPixelColor == "000000" && this.props.customTagPixelColorAnimations.indexOf("is-hidden") == -1)) &&
            <div className="tags has-addons">
              {
                this.props.customTagPixelColorAnimations.indexOf("is-hidden") == -1 &&
                <div className={"icon animated " + this.props.customTagPixelColorAnimations.join(" ")} >
                  <i className="fa fa-cog fa-spin fa-3x fa-fw" style={{width:"auto", height:"70%",margin:"auto"}}></i>
                </div>
              }
              <span className="tag">Pixel Color</span>
              <span className="tag " >
                <FontAwesomeIcon icon="square" style={{ color : toolTipTitle }} />
              </span>
            </div>
          }
        </div>
      </Tooltip>

    );
  }
}

export default withQRCodeAPIContext(withAnimationsContext(CustomTag));
