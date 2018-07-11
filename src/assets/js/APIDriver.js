const timeoutPromise = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

export const standardRequest = (text) => {
  let url = "https://api.acme.codes/new?msg=" + encodeURI(text)
  + "/gif";
  return fetch(url)
    .then((response)=>{
      return response.json();
    })
    .then((json)=>{
      return json.orderNumber;
    })
}

export const checkProgress = (orderNumber) => {
  let url = "https://api.acme.codes/orders/"
  + orderNumber
  + "/progress";
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json.progress;
    });
}

export const fetchFrame = (orderNumber, frameNumber) => {
  let url = "https://api.acme.codes/orders/"
  + orderNumber
  + "/frames/"
  + frameNumber;

  return fetch(url)
    .then((response) => {
      if (response.status == 202 ) {
        // console.log("status is 202");
        return fetchFrame(orderNumber, frameNumber);
      }else{
        // console.log("status is " + response.status, response);
        return response.url;
      }
    })
}

export const requestPNGOnly = (text) => {
  console.log("Requesting pngonly");
  let url = "https://api.acme.codes/new?msg=" + encodeURI(text)
  + "&anim=staticCodeOnly&xres=400&yres=400&gif=0";
  return fetch(url)
    .then((response)=>{
      return response.json();
    })
    .then((json)=>{
      return json.orderNumber;
    });
}

export const fetchPNGOnly = async (orderNumber, frameNumber) => {
  console.log("Fetching pngonly");
  let url = "https://api.acme.codes/orders/"
  + orderNumber
  + "/frames/"
  + frameNumber;
  await timeoutPromise(2000);
  return fetch(url)
    .then((response) => {
      if (response.status == 202 ) {
        console.log("status is 202");
        return fetchPNGOnly(orderNumber, frameNumber);
      }else{
        console.log("status is " + response.status, response);
        return response.url;
      }
    })
}

export const requestPNGOnlyWithColor = (text, backgroundColor, pixelColor) => {
  console.log("Requesting pngonly");
  let url = "https://api.acme.codes/new?msg=" + encodeURI(text)
  + "&anim=staticCodeOnly&xres=400&yres=400&gif=0";

  console.log("text:",text, " backgroundColor:", backgroundColor, " pixelColor:" ,pixelColor);

  if (backgroundColor != "") {
    url += "&bgpColor=" + backgroundColor;
  }

  if (pixelColor != "") {
    url += "&pixelColor=" + pixelColor;
  }

  return fetch(url)
    .then((response)=>{
      return response.json();
    })
    .then((json)=>{
      return json.orderNumber;
    });
}
