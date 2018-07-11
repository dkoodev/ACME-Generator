import React from 'react';

export const AnimationsContext = React.createContext(
  {
    nextButtonAppear: () => {},
    nextButtonDisappear: () => {},
    productStageNextButtonDisplay: "",
    stageTransition0_1: () => {},
    stageTransitionAnimations: "",
    customTagBackgroundColorAnimations: [],
    customTagPixelColorAnimations: [],
    customTagBackgroundColorLoading:()=>{},
    customTagBackgroundColorDone:()=>{},
    customTagPixelColorLoading:()=>{},
    customTagPixelColorDone:()=>{},
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
            stageTransitionAnimations,
            customTagBackgroundColorAnimations,
            customTagPixelColorAnimations,
            customTagBackgroundColorLoading,
            customTagBackgroundColorDone,
            customTagPixelColorLoading,
            customTagPixelColorDone,
            }) =>
            <Component {...props}
              nextButtonAppear={nextButtonAppear}
              nextButtonDisappear={nextButtonDisappear}
              productStageNextButtonDisplay={productStageNextButtonDisplay}
              stageTransition0_1={stageTransition0_1}
              stageTransitionAnimations={stageTransitionAnimations}
              customTagBackgroundColorAnimations={customTagBackgroundColorAnimations}
              customTagPixelColorAnimations={customTagPixelColorAnimations}
              customTagBackgroundColorLoading={customTagBackgroundColorLoading}
              customTagBackgroundColorDone={customTagBackgroundColorDone}
              customTagPixelColorLoading={customTagPixelColorLoading}
              customTagPixelColorDone={customTagPixelColorDone}
            />
        }
      </AnimationsContext.Consumer>
    );
  };
}
