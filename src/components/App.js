import '../assets/css/styles.css';
import React, { Component } from 'react';
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
        <Product />
        <Editor />
      </div>
    );
  }
}

export default App;
