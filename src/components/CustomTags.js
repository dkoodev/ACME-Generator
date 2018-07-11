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
        <CustomTag key={item.type} id={index} type={item.type} tagInfo={item.tagInfo} />
    );
    return (
      <div className="field is-grouped is-grouped-multiline">
        {Tags}
      </div>
    )
  }
}

export default CustomTags;
