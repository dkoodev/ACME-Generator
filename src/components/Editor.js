import React, { Component } from 'react';
import '../assets/css/styles.css';
import {StageContext, withStageContext} from './Contexts/StageContext';
import * as Editors from './Editors/';

class Editor extends React.Component {
  constructor(){
    super();

  }

  handleTextToConvertJS(text){ this.props.textToConvertJS(text); }

  handleTextToConvertAPI(text){ this.props.textToConvertAPI(text); }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.stage != this.props.stage;
  }


  render() {
    let EditorForCurrentStage;
    switch (this.props.stage) {
      case 0:
        EditorForCurrentStage = Editors.Editor0;
        break;
      case 1:
        EditorForCurrentStage = Editors.Editor1;
        break;
      default:
        EditorForCurrentStage = Editors.Editor0;

    }
    // might not be necessary
    EditorForCurrentStage = withStageContext(EditorForCurrentStage);
    return (
      <div id="Editor" className={"container " + "stage" + this.props.stage} style={{maxWidth:"100vw"}} >
        <EditorForCurrentStage  textToConvertJS={this.handleTextToConvertJS.bind(this)}
                                textToConvertAPI={this.handleTextToConvertAPI.bind(this)}
                                stage1ButtonAppear={this.props.stage1ButtonAppear}
                                stage1ButtonDisappear={this.props.stage1ButtonDisappear}
                              />
        {/* <button type="button" onClick={this.props.nextStage}>next stage</button> */}
      </div>
    );
  }
}

export default withStageContext(Editor);
