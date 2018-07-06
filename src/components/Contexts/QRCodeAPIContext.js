import React from 'react';

export const QRCodeAPIContext = React.createContext(
  {
    textToConvertJS: () => {},
    textToConvertAPI : () => {},
    qrcodeString:"",
    orderId:"",
    frameUrl:"",
  }
);

export const withQRCodeAPIContext = (Component) => {
  return (props) => {
    return (
      <QRCodeAPIContext.Consumer>
        {
          ({textToConvertJS, textToConvertAPI, qrcodeString, orderId, frameUrl}) =>
            <Component {...props}
              textToConvertJS={textToConvertJS}
              textToConvertAPI={textToConvertAPI}
              qrcodeString={qrcodeString}
              orderId={orderId}
              frameUrl={frameUrl}

            />
        }
      </QRCodeAPIContext.Consumer>
    );
  };
}
