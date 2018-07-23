import React from 'react';

export const AnimationsContext = React.createContext(
  {
    animationsContext : {},
  }
);

export const withAnimationsContext = (Component) => {
  return (props) => {
    return (
      <AnimationsContext.Consumer>
        {
          ({ animationsContext }) =>
            <Component {...props}
              animationsContext={animationsContext}
            />
        }
      </AnimationsContext.Consumer>
    );
  };
}
