// CSS
import '../assets/css/styles.css';

// Modules
import React, { Component } from 'react';

// Components
import NavigationBar from './NavigationBar';
import Progressbar from './Progressbar';
import ProductStage from './ProductStage';
import Editor from './Editor';


// Contexts
import { StageContext } from './Contexts/StageContext';



class App extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <NavigationBar  />
        <StageContext.Provider value={0}>
          <Progressbar />
          <br />
          <br />
          <div className="container">
            <div className="columns">
              <div className="column">
                <ProductStage />
              </div>
              <div className="column">
                <Editor />
              </div>
            </div>
          </div>
        </StageContext.Provider>
      </div>
    );
  }
}

export default App;
