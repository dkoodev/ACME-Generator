import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import '../assets/css/styles.css';

class Navbar extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div id="Navbar">
        <Jumbotron >
          <h1>Animated Codes Made Easy Client</h1>
          <p>
            This is a simple client for demoing the ACME API.
          </p>
        </Jumbotron>

      </div>
    );
  }
}

export default Navbar;
