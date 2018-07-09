import React from 'react';

export const AnimationsContext = React.createContext(
  {
    stage1ButtonAppear: () => {},
    stage1ButtonDisappear: () => {},
    productStageNextButtonDisplay: "",
    editor0OutAnimation: "" ,
    productStage0OutAnimation : "",
    stageTransition0_1: () => {},
  }
);

export const withAnimationsContext = (Component) => {
  return (props) => {
    return (
      <AnimationsContext.Consumer>
        {
          ({stage1ButtonAppear,
            stage1ButtonDisappear,
            productStageNextButtonDisplay,
            editor0OutAnimation,
            productStage0OutAnimation,
            stageTransition0_1
            }) =>
            <Component {...props}
              stage1ButtonAppear={stage1ButtonAppear}
              stage1ButtonDisappear={stage1ButtonDisappear}
              productStageNextButtonDisplay={productStageNextButtonDisplay}
              editor0OutAnimation={editor0OutAnimation}
              productStage0OutAnimation={productStage0OutAnimation}
              stageTransition0_1={stageTransition0_1}
            />
        }
      </AnimationsContext.Consumer>
    );
  };
}
