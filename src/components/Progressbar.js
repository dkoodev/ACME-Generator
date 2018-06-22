import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Steps from 'react-steps';

import '../assets/css/styles.css';

class Progressbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stepsList: [
          {
              "text": "Encode Link/Text",
              "isActive": true,
              "isDone": false
          },
          {
              "text": "Customize Color",
              "isActive": false,
              "isDone": false
          },
          {
              "text": "Upload Picture/Logo",
              "isActive": false,
              "isDone": false
          },
          {
              "text": "Choose Animation",
              "isActive": false,
              "isDone": false
          },
          {
              "text": "Pay",
              "isActive": false,
              "isDone": false
          }
      ]
    };
  } 

  progress(){
    // let change = false;
    // for each (step in this.state.stepsList){
    //   if(change){
    //     this.setState({
    //       gifUrl: url
    //     });
    //
    //   }
    //   if(step.isActive){
    //
    //   }
    // }
  }

  render() {
    return (
      <div id="Progressbar" >
        <Steps items={this.state.stepsList} type={'point'} flat={true}/>
        <Button onClick={this.progress} >Progress! </Button>
      </div>
    );
  }
}

export default Progressbar;
