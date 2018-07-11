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

// Assets
import img from '../../assets/images/loading.gif';


class ProductStage1 extends React.Component {
  constructor(){
    super();
    this.state = {
      url: "nope"
    }
  }

  reloadComponent(ev){
    ev.target.src = img;
    this.forceUpdate();
  }

  render() {
    let tags = [
      {
        type:"message",
        tagInfo: this.props.qrcodeString
      },
      {
        type:"pixelColor",
        tagInfo: this.props.chosenPixelColor
      },
      {
        type:"backgroundColor",
        tagInfo: this.props.chosenBackgroundColor
      }
    ];

    return (
      <div id="ProductStage1" className="columns" >
          <div id="qrcode-container-wrapper" className="column">
            <div id="qrcode-container" className="box " >
              <img onError={this.reloadComponent.bind(this)} src={this.props.frameUrl} style={{width:"100%",height:"100%", margin:"auto"}} />
            </div>
          </div>
          <div className="column is-one-quarter customTags">
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
