import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import '../assets/css/styles.css';

class Editor extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div id="Editor" >

        <canvas> </canvas>

      </div>
    );
  }
}

export default Editor;
