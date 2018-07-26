import * as APIDriver from '../../assets/js/APIDriver';

exports.textToConvertJS = function(text){
  // QR code generation through javascript engine
  let prevState = this.state;
  let qrcodeAPIContext = prevState.qrcodeAPIContext;

  qrcodeAPIContext.qrcodeInfo.message = text;

  this.setState({
    qrcodeAPIContext : qrcodeAPIContext,
  });
}

exports.textToConvertAPI = async function(text){
  // QR Code generation through API
  let qrcodeAPIContext = this.state.qrcodeAPIContext;

  if(text != ""){
    // If using ACME API for qrcode generation, orderId and frameurl is necesary.
    this.state.qrcodeAPIContext.textToConvertJS(text);
    // If using ACME API for qrcode generation, orderId and frameurl is necesary.
    let orderId = await APIDriver.requestPNGOnly(text);
    qrcodeAPIContext.qrcodeInfo.orderId = orderId;
    qrcodeAPIContext.qrcodeInfo.url = await APIDriver.fetchPNG(orderId, 1);
  }else {
    qrcodeAPIContext.qrcodeInfo.orderId = "";
    qrcodeAPIContext.qrcodeInfo.url = "";
  }

  this.setState({
    qrcodeAPIContext : qrcodeAPIContext,
  });
}

exports.setPixelColor = function(color){
  let qrcodeAPIContext = this.state.qrcodeAPIContext;
  qrcodeAPIContext.qrcodeInfo.pixelColor = color;
  this.setState({
    qrcodeAPIContext : qrcodeAPIContext,
  });
}

exports.setBackgroundColor = function(color){
  let qrcodeAPIContext = this.state.qrcodeAPIContext;
  qrcodeAPIContext.qrcodeInfo.backgroundColor = color;
  this.setState({
    qrcodeAPIContext : qrcodeAPIContext,
  });
}

exports.requestStatic = async function(){
  console.log("request static with color");

  let prevState = this.state;
  let qrcodeAPIContext = prevState.qrcodeAPIContext;

  let orderId = await APIDriver.requestStaticPNG(this.state.qrcodeAPIContext.qrcodeInfo);
  if (orderId == -1) {
    console.log("something went wrong with requestStaticPng");
    return;
  }
  let url = await APIDriver.fetchPNG(orderId, 1);
  if (this.state.qrcodeAPIContext.qrcodeInfo.requestCount != 1) {
    return false;
  }
  qrcodeAPIContext.qrcodeInfo.orderId = orderId;
  qrcodeAPIContext.qrcodeInfo.url = url;

  this.setState({
    qrcodeAPIContext : qrcodeAPIContext,
  });
  return true;
}

exports.requestAnimation = async function(){
  console.log("request animation");
  this.state.qrcodeAPIContext.setIsAnimation(true);

  let prevState = this.state;
  let qrcodeAPIContext = prevState.qrcodeAPIContext;

  let orderId = await APIDriver.requestAnimation(this.state.qrcodeAPIContext.qrcodeInfo);
  if (orderId == -1) {
    console.log("something went wrong with requestStaticPng");
    return;
  }
  let progress = 0;
  while( progress < 100 && this.state.qrcodeAPIContext.qrcodeInfo.isAnimation){
    progress = await APIDriver.checkProgressAnimation(orderId);
    this.state.qrcodeAPIContext.updateTag('userUploadedImage', "Image will be animated when animation is chosen" , false, false, true , progress);
  }
  if (!this.state.qrcodeAPIContext.qrcodeInfo.isAnimation) {
    this.state.qrcodeAPIContext.updateTag('userUploadedImage', "" , false, false, false);
    return;
  }
  let url = await APIDriver.fetchAnimation(orderId);

  qrcodeAPIContext.qrcodeInfo.orderId = orderId;
  qrcodeAPIContext.qrcodeInfo.url = url;

  this.setState({
    qrcodeAPIContext : qrcodeAPIContext,
  });
}

exports.setResolutionValue = function(value){
  let qrcodeAPIContext = this.state.qrcodeAPIContext;
  qrcodeAPIContext.qrcodeInfo.resolutionValue = value;
  this.setState({
    qrcodeAPIContext : qrcodeAPIContext
  });
}

exports.setStencil = function(value){
  console.log("from contextfunctions: ", value)
  let qrcodeAPIContext = this.state.qrcodeAPIContext;
  qrcodeAPIContext.qrcodeInfo.stencil = value;
  this.setState({
    qrcodeAPIContext : qrcodeAPIContext
  });
}

exports.setTileShape = function(value){
  let qrcodeAPIContext = this.state.qrcodeAPIContext;
  qrcodeAPIContext.qrcodeInfo.tileShape = value;
  this.setState({
    qrcodeAPIContext : qrcodeAPIContext
  });
}

exports.setUserUploadedImageUrl = function(value) {
  let qrcodeAPIContext = this.state.qrcodeAPIContext;
  qrcodeAPIContext.qrcodeInfo.userUploadedImageUrl = value;
  this.setState({
    qrcodeAPIContext : qrcodeAPIContext
  });
}



exports.setTags = function(newTags){
  let qrcodeAPIContext = this.state.qrcodeAPIContext;
  qrcodeAPIContext.qrcodeInfo.tags = newTags;
  this.setState({
    qrcodeAPIContext : qrcodeAPIContext
  });
}

exports.setWarningTags = function(newWarningTags){
  let qrcodeAPIContext = this.state.qrcodeAPIContext;
  qrcodeAPIContext.warningTags = newWarningTags;
  this.setState({
    qrcodeAPIContext : qrcodeAPIContext
  });
}

exports.updateTag = function(type, tagInfo, gearLoadingAnimationIn, gearLoadingAnimationOut, gearLoadingAnimationDisplay, data=""){
  console.log("Updating Tag");
  let qrcodeAPIContext = this.state.qrcodeAPIContext;
  if (qrcodeAPIContext.tags.some((item)=>{ return item.type == type})) {
    // Delete Tag if it already exists
    qrcodeAPIContext.tags = qrcodeAPIContext.tags.filter((item)=>{
      return item.type != type;
    });
  }
  // Create new tag
  qrcodeAPIContext.tags.push({
    type : type,
    tagInfo : tagInfo,
    gearLoadingAnimationIn : gearLoadingAnimationIn,
    gearLoadingAnimationOut : gearLoadingAnimationOut,
    gearLoadingAnimationDisplay : gearLoadingAnimationDisplay,
    data : data,
  });
  this.setState({ qrcodeAPIContext : qrcodeAPIContext });
}

exports.incrementRequestCount = function(){
  let qrcodeAPIContext = this.state.qrcodeAPIContext;
  qrcodeAPIContext.qrcodeInfo.requestCount++;
  this.setState({ qrcodeAPIContext : qrcodeAPIContext });
  console.log("request incremented", this.state.qrcodeAPIContext.qrcodeInfo.requestCount);
}

exports.decrementRequestCount = function(){
  let qrcodeAPIContext = this.state.qrcodeAPIContext;
  qrcodeAPIContext.qrcodeInfo.requestCount--;
  this.setState({ qrcodeAPIContext : qrcodeAPIContext });
}

exports.clearRequestCount = function(){
  let qrcodeAPIContext = this.state.qrcodeAPIContext;
  qrcodeAPIContext.qrcodeInfo.requestCount = 0;
  this.setState({ qrcodeAPIContext : qrcodeAPIContext });
}

exports.clearAllTags = function(){
  let qrcodeAPIContext = this.state.qrcodeAPIContext;
  qrcodeAPIContext.tags.forEach((item)=>{
    if (item.gearLoadingAnimationDisplay) {
      this.state.qrcodeAPIContext.updateTag(item.type, item.tagInfo, false, true, true);
      setTimeout( ()=>{
        this.state.qrcodeAPIContext.updateTag(item.type, item.tagInfo, false, false, false);
      }, 700);
    }
  });
}

exports.setIsAnimation = function(value ){
  let qrcodeAPIContext = this.state.qrcodeAPIContext;
  qrcodeAPIContext.qrcodeInfo.isAnimation = value;
  this.setState({
    qrcodeAPIContext : qrcodeAPIContext
  });
}
