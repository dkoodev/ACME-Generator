// Modules
import React, { Component } from 'react';

// Components
import {Tooltip} from 'antd';

class CustomTag extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div className="customTagWrapper">
        <div id={"customTag" + this.props.id} className="customTag">
          <Tooltip title={this.props.tagInfo} placement="right" mouseLeaveDelay={0}>
            {
              this.props.type == "message" &&
              <div className="tags has-addons">
                <span className="tag">URL</span>
                <span className="tag is-primary">
                  <i className="fas fa-link"></i>
                </span>
              </div>
            }
            {
              this.props.type == "backgroundColor" &&
              <div className="tags has-addons">
                <span className="tag">background color</span>
                <span className="tag is-primary">
                  <i className="fas fa-square"></i>
                </span>
              </div>
            }
            {
              this.props.type == "pixelColor" &&
              <div className="tags has-addons">
                <span className="tag">pixel color</span>
                <span className="tag is-primary">
                  <i className="fas fa-th"></i>
                </span>
              </div>
            }
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default CustomTag;
