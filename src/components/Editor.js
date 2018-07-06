// CSS
import '../assets/css/styles.css';

// Modules
import React, { Component } from 'react';

// Components
import * as Editors from './Editors/';

// Contexts
import {withStageContext, StageContext} from './Contexts/StageContext';
import {withAnimationsContext, AnimationsContext} from './Contexts/AnimationsContext';
import {withQRCodeAPIContext, QRCodeAPIContext} from './Contexts/QRCodeAPIContext';


class Editor extends React.Component {
  constructor(){
    super();

  }

  shouldComponentUpdate(nextProps, nextState){
    return (this.props.stage != nextProps.stage) || (nextProps.editor0OutAnimation == "fadeOutLeft");
  }

  render() {
    let EditorForCurrentStage;
    let editorClasses;
    switch (this.props.stage) {
      case 0:
        EditorForCurrentStage = Editors.Editor0;
        editorClasses = " container ";
        break;
      case 1:
        EditorForCurrentStage = Editors.Editor1;
        editorClasses = "";
        break;
      default:
        EditorForCurrentStage = Editors.Editor0;
    }
    EditorForCurrentStage = withAnimationsContext(
                            withStageContext(
                            withQRCodeAPIContext(
                              EditorForCurrentStage
                            )));
    return (
      <div id="Editor" className={editorClasses+ "stage" + this.props.stage} style={{maxWidth:"100vw"}} >
        <EditorForCurrentStage />
      </div>
    );
  }
}

export default  withAnimationsContext(
                withStageContext(
                  Editor
                ));
