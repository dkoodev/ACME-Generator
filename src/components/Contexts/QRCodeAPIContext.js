import React from 'react';

export const QRCodeAPIContext = React.createContext(
  {
    qrcodeAPIContext : {},
  }
);

export const withQRCodeAPIContext = (Component) => {
  return (props) => {
    return (
      <QRCodeAPIContext.Consumer>
        {
          ({ qrcodeAPIContext }) =>
            <Component {...props}
              qrcodeAPIContext={qrcodeAPIContext}
            />
        }
      </QRCodeAPIContext.Consumer>
    );
  };
}
