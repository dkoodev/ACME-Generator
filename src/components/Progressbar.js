import React, { Component } from 'react';
import { Steps } from 'antd';
import '../assets/css/styles.css';
import {StageContext, withStageContext} from './Contexts/StageContext';


let Step = Steps.Step;

class Progressbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="Progressbar" className="container">
        <div className="box">
          <Steps current={this.props.stage}>
            <Step className="step1" title='Encode' />
            <Step title='Customize' />
            <Step title='Animate' />
            <Step title='Own' />
          </Steps>
        </div>
      </div>
    );
  }
}

export default withStageContext(Progressbar);
