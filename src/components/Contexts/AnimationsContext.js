import React from 'react';

export const AnimationsContext = React.createContext(
  {
    stage1ButtonAppear: () => {},
    stage1ButtonDisappear: () => {},
    productStageNextButtonDisplay: "",
    editor0OutAnimation: "" ,
    triggerEditor0Out: () => {},

  }
);

export const withAnimationsContext = (Component) => {
  return (props) => {
    return (
      <AnimationsContext.Consumer>
        {
          ({stage1ButtonAppear, stage1ButtonDisappear, productStageNextButtonDisplay, editor0OutAnimation, triggerEditor0Out }) =>
            <Component {...props}
              stage1ButtonAppear={stage1ButtonAppear}
              stage1ButtonDisappear={stage1ButtonDisappear}
              productStageNextButtonDisplay={productStageNextButtonDisplay}
              editor0OutAnimation={editor0OutAnimation}
              triggerEditor0Out={triggerEditor0Out}
            />
        }
      </AnimationsContext.Consumer>
    );
  };
}
