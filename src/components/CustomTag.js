// Modules
import React, { Component } from 'react';

// Components
import {Tooltip} from 'antd';

// Contexts
import {withAnimationsContext, AnimationsContext} from './Contexts/AnimationsContext';


class CustomTag extends React.Component {
  constructor(){
    super();
  }

  render() {
    let toolTipTitle = (this.props.type == "backgroundColor" ||
                      this.props.type == "pixelColor" ) ?  ("#" + this.props.tagInfo ): this.props.tagInfo;
    return (
      <Tooltip className="customTagWrapper" title={toolTipTitle} placement="right" mouseLeaveDelay={0}>
        <div id={"customTag" + this.props.id} className="customTag control">
          {
            this.props.type == "message" &&
            <div className="tags has-addons">

              <span className="tag">URL</span>
              <a href={toolTipTitle}>
                <span className="tag is-link">
                  <i className="fas fa-link"></i>
                </span>
              </a>
            </div>
          }
          {
            this.props.type == "backgroundColor" &&
            <div className="tags has-addons">
              {
                this.props.customTagBackgroundColorAnimations.indexOf("is-hidden") == -1 &&
                <div className={"icon animated " + this.props.customTagBackgroundColorAnimations.join(" ")} >
                  <i className="fa fa-cog fa-spin fa-3x fa-fw" style={{width:"auto", height:"70%",margin:"auto"}}></i>
                </div>
              }
              <span className="tag">Background Color</span>
              <span className="tag is-primary" style={{backgroundColor:toolTipTitle}}>
                <i className="fas fa-square"></i>
              </span>
            </div>
          }
          {
            this.props.type == "pixelColor" &&
            <div className="tags has-addons">
              {
                this.props.customTagPixelColorAnimations.indexOf("is-hidden") == -1 &&
                <div className={"icon animated " + this.props.customTagPixelColorAnimations.join(" ")} >
                  <i className="fa fa-cog fa-spin fa-3x fa-fw" style={{width:"auto", height:"70%",margin:"auto"}}></i>
                </div>
              }
              <span className="tag">Pixel Color</span>
              <span className="tag " >
                <i className="fas fa-th" style={{color:toolTipTitle}}></i>
              </span>
            </div>
          }
        </div>
      </Tooltip>

    );
  }
}

export default withAnimationsContext(CustomTag);
