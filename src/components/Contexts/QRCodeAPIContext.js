import React from 'react';

export const QRCodeAPIContext = React.createContext(
  {
    textToConvertJS: () => {},
    textToConvertAPI : () => {},
    qrcodeString:"",
    orderId:"",
    frameUrl:"",
    chosenPixelColor:"",
    changePixelColor:()=>{},
    chosenBackgroundColor:"",
    changeBackgroundColor:()=>{},
    requestStaticWithColor:()=>{},
    extraTags : [],
    setExtraTags : ()=> {},
  }
);

export const withQRCodeAPIContext = (Component) => {
  return (props) => {
    return (
      <QRCodeAPIContext.Consumer>
        {
          ({textToConvertJS,
            textToConvertAPI,
            qrcodeString,
            orderId,
            frameUrl,
            chosenPixelColor,
            changePixelColor,
            chosenBackgroundColor,
            changeBackgroundColor,
            requestStaticWithColor,
            extraTags,
            setExtraTags,
          }) =>
            <Component {...props}
              textToConvertJS={textToConvertJS}
              textToConvertAPI={textToConvertAPI}
              qrcodeString={qrcodeString}
              orderId={orderId}
              frameUrl={frameUrl}
              chosenPixelColor={chosenPixelColor}
              changePixelColor={changePixelColor}
              chosenBackgroundColor={chosenBackgroundColor}
              changeBackgroundColor={changeBackgroundColor}
              requestStaticWithColor={requestStaticWithColor}
              extraTags={extraTags}
              setExtraTags={setExtraTags}
            />
        }
      </QRCodeAPIContext.Consumer>
    );
  };
}
