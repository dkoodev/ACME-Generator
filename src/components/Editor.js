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
    let editorClasses;
    switch (this.props.stage) {
      case 0:
        editorClasses = " container ";
        break;
      case 1:
        editorClasses = "";
    }

    return (
      <div id="Editor" className={editorClasses + "stage" + this.props.stage} style={{maxWidth:"100vw"}} >
        {this.props.stage == 0 && <Editors.Editor0 /> }
        {this.props.stage == 1 && <Editors.Editor1 /> }
        {this.props.stage == 2 && <Editors.Editor2 /> }

      </div>
    );
  }
}

export default  withAnimationsContext(
                withStageContext(
                  Editor
                ));
