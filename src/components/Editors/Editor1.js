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

      this.setState({
        inputControlClasses: "is-loading",
      });

      this.props.textToConvert(e.target.value);

      let inputValue = e.target.value;
      setTimeout(()=>{
        if(inputValue == ""){
          this.setState({
            inputStatusClasses: "",
          });
        }else {
          this.setState({
            inputStatusClasses: "is-success",
          });
        }
        this.setState({
          iconRightClasses: "",
          inputControlClasses: "",
        });
      }, 1000);
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
            Stage 2!
          </div>
          <div className={"control has-icons-left has-icons-right is-large " + this.state.inputControlClasses} >
            <input className={"input is-large is-rounded " + this.state.inputStatusClasses} maxLength="2953" onChange={this.inputChangeHandler.bind(this)} type="text" placeholder="https:// " />
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
