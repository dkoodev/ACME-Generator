
exports.nextButtonDisable = function(){
  let animationsContext = this.state.animationsContext;
  animationsContext.nextButtonDisabled = true;
  this.setState({
    animationsContext : animationsContext,
  });
}

exports.nextButtonAble = function(){
  let animationsContext = this.state.animationsContext;
  animationsContext.nextButtonDisabled = false;
  this.setState({
    animationsContext : animationsContext,
  });
}

exports.nextButtonAppear = function(){
  let animationsContext = this.state.animationsContext;
  animationsContext.nextButtonDisplay = true;
  this.setState({
    animationsContext : animationsContext,
  });
}

exports.nextButtonDisappear = function(){
  let animationsContext = this.state.animationsContext;
  animationsContext.nextButtonDisplay = false;
  this.setState({
    animationsContext : animationsContext,
  });
}

exports.stageTransition0_1 = function(){
  let animationsContext = this.state.animationsContext;
  animationsContext.stageTransition0_1AnimationStage0BodyOut = true;
  this.setState({
    animationsContext : animationsContext,
  });
  setTimeout(() => {
    this.nextStage();
    setTimeout(()=> {
      animationsContext = this.state.animationsContext;
      animationsContext.stageTransition0_1AnimationStage0BodyOut = false;
      animationsContext.stageTransition0_1AnimationStage1BodyIn = true;
      this.setState({
        animationsContext : animationsContext,
      });
    }, 200);
  }, 1000);
}
