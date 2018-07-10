// Modules
import React, { Component } from 'react';

// Components
import CustomTag from './CustomTag';

class CustomTags extends React.Component {
  constructor(){
    super();

  }

  render() {
    let tags = this.props.tags.filter((item)=>{
      return item.tagInfo != "";
    });
    const Tags = tags.map((item,index) =>
      <div>
      <CustomTag id={index} key={index} type={item.type} tagInfo={item.tagInfo} />
      <br />
      <br />

      </div>
    );
    return (
      <div>
        {Tags}
      </div>
    )
  }
}

export default CustomTags;
