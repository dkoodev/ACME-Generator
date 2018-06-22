import '../assets/css/App.css';
import React, { Component } from 'react';
import BasicRequestForm from './BasicRequestForm';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      orderId:"",
      requestProgressState: 0,
      requestIntervalId: 0,
      progressBarStyle: {display: "none"},
      progressBarValue: 0,
      gifUrl : ""
    }
  }

  fetchGif(){
    let url = "https://api.acme.codes/orders/"
              + this.state.orderId
              + "/gif";
    this.setState({
      gifUrl: url
    });
  }

  checkProgress(){
    let url = "https://api.acme.codes/orders/"
              + this.state.orderId
              + "/progress";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log("progress: " + json.progress);
        let displayOption = "";
        if(json.progress < 100 ){
          displayOption = "block";
          this.setState({
            progressBarValue: json.progress,
            progressBarStyle: {display:displayOption}
          });
          this.checkProgress();
        }else{
          displayOption = "none";
          this.setState({
            progressBarValue: json.progress,
            progressBarStyle: {display:displayOption}
          });
          this.fetchGif();
        }

      });
  }

  handleMakeRequest(message){
    let url = "https://api.acme.codes/new?msg=" + encodeURI(message);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .catch(error => console.error(error))
      .then((json) => {
        this.setState({orderId:json.orderNumber});
        this.checkProgress();
      });
      // this.interval = setInterval(() => this.checkProgress.bind(this), 10);
  }

  render() {
    return (
      <div>
        <BasicRequestForm makeRequest={this.handleMakeRequest.bind(this)} gifUrl={this.state.gifUrl}/>
        <p>{this.state.orderId}</p>
        <progress style={this.state.progressBarStyle} value={this.state.progressBarValue} max="100" > </progress>

      </div>
    );
  }
}

export default App;
