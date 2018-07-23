// Modules
import React, { Component } from 'react';
import QRCode from 'qrcode.react';

// Contexts
import {withStageContext, StageContext} from '../Contexts/StageContext';
import {withAnimationsContext, AnimationsContext} from '../Contexts/AnimationsContext';
import {withQRCodeAPIContext, QRCodeAPIContext} from '../Contexts/QRCodeAPIContext';

// Components
import CustomTags from '../CustomTags';

// Assets
import img from '../../assets/images/loading.gif';


class ProductStage1 extends React.Component {
  constructor(){
    super();
  }

  reloadComponent(ev){
    ev.target.src = img;
    this.forceUpdate();
  }

  render() {
    let tags = this.props.qrcodeAPIContext.tags;
    tags = tags.concat(this.props.qrcodeAPIContext.warningTags);
    let frameUrl = this.props.qrcodeAPIContext.qrcodeInfo.url;
    // let qrcodeContainerClasses = this.props.qrcodeAPIContext.qrcodeInfo.stencil && this.props.qrcodeAPIContext.qrcodeInfo.requestCount == 0 ? "transparentBackground" : "";
    return (
      <div id="ProductStage1" className="columns" >
          <div id="qrcode-container-wrapper" className="column">
            <div id="qrcode-container" className={"box "} >
              <div className={"transparentBackground"}>
                <img onError={this.reloadComponent.bind(this)} src={frameUrl} style={{width:"100%",height:"100%", margin:"auto"}} />
              </div>
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
