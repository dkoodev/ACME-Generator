import React, { Component } from 'react';
import '../assets/css/styles.css';
import {StageContext, withStageContext} from './Contexts/StageContext';
import * as Editors from './Editors/';

class Editor extends React.Component {
  constructor(){
    super();

  }

  handleTextToConvert(text){ this.props.textToConvert(text); }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.stage != this.props.stage;
  }

  componentDidMount(){
    console.log("Editor Mounted");
  }

  render() {
    let EditorForCurrentStage;
    switch (this.props.stage) {
      case 0:
        EditorForCurrentStage = Editors.Editor0;
        break;

      default:
        EditorForCurrentStage = Editors.Editor0;

    }
    // might not be necessary
    EditorForCurrentStage = withStageContext(EditorForCurrentStage);
    return (
      <div id="Editor" className={"container " + "stage"+this.props.stage} >
        <EditorForCurrentStage textToConvert={this.handleTextToConvert.bind(this)} />
      </div>
    );
  }
}

export default withStageContext(Editor);
