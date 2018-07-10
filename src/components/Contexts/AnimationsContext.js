import React from 'react';

export const AnimationsContext = React.createContext(
  {
    nextButtonAppear: () => {},
    nextButtonDisappear: () => {},
    productStageNextButtonDisplay: "",
    stageTransition0_1: () => {},
    stageTransitionAnimations: "",
  }
);

export const withAnimationsContext = (Component) => {
  return (props) => {
    return (
      <AnimationsContext.Consumer>
        {
          ({nextButtonAppear,
            nextButtonDisappear,
            productStageNextButtonDisplay,
            stageTransition0_1,
            stageTransitionAnimations
            }) =>
            <Component {...props}
              nextButtonAppear={nextButtonAppear}
              nextButtonDisappear={nextButtonDisappear}
              productStageNextButtonDisplay={productStageNextButtonDisplay}
              stageTransition0_1={stageTransition0_1}
              stageTransitionAnimations={stageTransitionAnimations}
            />
        }
      </AnimationsContext.Consumer>
    );
  };
}
