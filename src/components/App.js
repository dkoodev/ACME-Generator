// CSS
import '../assets/css/styles.css';

// Modules
import React, { Component } from 'react';
import {Columns, Column} from 'bloomer';

// Components
import Navbar from './Navbar';
import Progressbar from './Progressbar';
import Product from './Product';
import Editor from './Editor';


class App extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Progressbar />
        <div class="columns">
          <div class="column">
            <Product />
          </div>
          <div class="column">
            <Editor />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
