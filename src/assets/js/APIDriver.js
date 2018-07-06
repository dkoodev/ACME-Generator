
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
        console.log("status is 202");
        return fetchFrame(orderNumber, frameNumber);
      }else{
        console.log("status is " + response.status, response);
        return response.url;
      }
    })
}

export const requestPNGOnly = (text) => {
  let url = "https://api.acme.codes/new?msg=" + encodeURI(text);
  + text
  + "&anim=staticCodeOnly&gif=0";
  return fetch(url)
    .then((response)=>{
      return response.json();
    })
    .then((json)=>{
      return json.orderNumber;
    })
}

export const fetchPNGOnly = (orderNumber, frameNumber) => {
  let url = "https://api.acme.codes/orders/"
  + orderNumber
  + "/frames/"
  + frameNumber;

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
