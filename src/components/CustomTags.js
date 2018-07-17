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
      return item.tagInfo != "" && item.type != "";
    });
    const Tags = tags.map((item,index) =>
        <CustomTag key={index} id={index} type={item.type} tagInfo={item.tagInfo} />
    );
    return (
      <div className="field is-grouped is-grouped-multiline">
        {Tags}
      </div>
    )
  }
}

export default CustomTags;
