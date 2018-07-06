import React, { Component } from 'react';

// import '../assets/css/styles.css';
// import {StageContext, withStageContext} from './Contexts/StageContext';

class Editor1 extends React.Component {
  constructor(){
    super();
    this.state = {
      iconRightClasses: "is-hidden",
      titleAnimations: "animated",
      spacingAnimations: "spacing ",
      inputControlClasses: "",
      inputStatusClasses: "",
    }
  }

  inputChangeHandler(e){

  }

  componentDidMount(){
    let animate = ()=>{
      this.setState((prevState,props)=> {return {
        titleAnimations: prevState.titleAnimations + " bounce",
      }});
    }
    setTimeout(animate, 1000);
  }

  render() {
    return (
      <div>
        <div className="field">
          <div className={"title is-2 has-text-grey-dark has-text-centered " + this.state.titleAnimations}>
            Stage 2!
          </div>
          <div className={"control has-icons-left has-icons-right is-large " + this.state.inputControlClasses} >
            <span className="icon is-medium is-left">
              <i className="fas fa-qrcode"></i>
            </span>
            <span className={"icon is-medium is-right " + this.state.iconRightClasses}>
              <i className="fas fa-check "></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor1;
