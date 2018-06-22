import '../assets/css/App.css';
import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

class BasicRequestForm extends React.Component {

  handleSubmit(e){
    e.preventDefault();
    this.props.makeRequest(this.refs.message.value);

  }



  render() {
    return (
      <div>
        <Jumbotron >
          <h1>Animated Codes Made Easy Client</h1>
          <p>
            This is a simple client for demoing the ACME API.
          </p>
        </Jumbotron>
        <form onSubmit={this.handleSubmit.bind(this)} >
          <label>Message to encode: </label> <input type="text" ref="message" />
          <br />
          <input type='submit' value='Submit' />
        </form>
        <img src={this.props.gifUrl}/>

      </div>
    );
  }
}

export default BasicRequestForm;
