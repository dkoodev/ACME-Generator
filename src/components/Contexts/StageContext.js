import React from 'react';

export const StageContext = React.createContext(
  {
    stage: 0,
    nextStage: () => {},
    prevStage: () => {},
  }
);

export const withStageContext = (Component) => {
  return (props) => {
    return (
      <StageContext.Consumer>
        {
          ({stage, nextStage, prevStage}) =>
            <Component {...props}
              stage={stage}
              nextStage={nextStage}
              prevStage={prevStage}
            />
        }
      </StageContext.Consumer>
    );
  };
}
