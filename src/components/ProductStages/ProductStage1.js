// Modules
import React, { Component } from 'react';
import QRCode from 'qrcode.react';

// Contexts
import {withStageContext, StageContext} from '../Contexts/StageContext';
import {withAnimationsContext, AnimationsContext} from '../Contexts/AnimationsContext';
import {withQRCodeAPIContext, QRCodeAPIContext} from '../Contexts/QRCodeAPIContext';

// Components
import CustomTag from '../CustomTag';
import CustomTags from '../CustomTags';

class ProductStage1 extends React.Component {
  constructor(){
    super();
  }


  render() {
    let tags = [
      {
        type:"message",
        tagInfo: this.props.frameUrl
      },
      {
        type:"backgroundColor",
        tagInfo: this.props.chosenBackgroundColor
      },
      {
        type:"pixelColor",
        tagInfo: this.props.chosenPixelColor
      }
    ];
    return (

      <div id="ProductStage1" className="columns" >
          <div id="qrcode-container-wrapper" className="column">
            <div id="qrcode-container" className="box " >
              <img src={this.props.frameUrl} style={{width:"100%",height:"100%", margin:"auto"}} />
            </div>
          </div>
          <div className="column is-one-fifth">
            <CustomTags tags={tags} />
          </div>
      </div>
    );
  }
}

export default  withAnimationsContext(
                withStageContext(
                withQRCodeAPIContext(
                  ProductStage1
                )));
