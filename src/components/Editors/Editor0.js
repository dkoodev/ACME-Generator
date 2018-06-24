import React, { Component } from 'react';

// import '../assets/css/styles.css';
// import {StageContext, withStageContext} from './Contexts/StageContext';

class Editor0 extends React.Component {
  constructor(){
    super();
    this.state = {
      iconRightClasses: "is-hidden",
      titleAnimations: "animated",
      spacingAnimations: "spacing ",
    }
  }

  inputChangeHandler(e){
      let prevState = this.state;
      if(e.target.value == ""){
        this.setState({
          spacingAnimations:  "spacing" ,
        })
      }else{
        this.setState({
          spacingAnimations:  "spacing squish",
        })
      }
      this.props.textToConvert(e.target.value);
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
        <canvas className={this.state.spacingAnimations}></canvas>
        <div className="field">
          <div className={"title is-2 has-text-grey-dark has-text-centered " + this.state.titleAnimations}>
            Encode a message or a website
          </div>
          <div className="control has-icons-left has-icons-right" >
            <input className="input is-large is-rounded" onChange={this.inputChangeHandler.bind(this)} type="text" placeholder="https:// " />
            <span className="icon is-medium is-left">
              <i className="fas fa-qrcode"></i>
            </span>
            <span className="icon is-medium is-right ">
              <i className={"fas fa-check " + this.state.iconRightClasses}></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor0;
