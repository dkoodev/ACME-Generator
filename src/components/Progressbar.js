import React, { Component } from 'react';
import { Steps } from 'antd';
import '../assets/css/styles.css';
import {StageContext, withStageContext} from './Contexts/StageContext';

let Step = Steps.Step;

class Progressbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }


  render() {
    return (
      <div id="Progressbar" className="container">
        <div className="box">
          <Steps>
            {/* Needs to be funtional */}
            <Step title="first step" />
            <Step title="second step" />
            <Steps.Step title="third step" />
          </Steps>
        </div>
      </div>
    );
  }
}

export default withStageContext(Progressbar);
