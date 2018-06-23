import React, { Component } from 'react';
import '../assets/css/styles.css';

class ProductStage extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div id="ProductStage" >
        <div className="box">
          {/* <div className="box"> */}
            <figure className="image ">
              <img src="https://bulma.io/images/placeholders/128x128.png" />
            </figure>
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default ProductStage;
