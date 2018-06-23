import React, { Component } from 'react';
import '../assets/css/styles.css';
// import StageContext from './Contexts/StageContext';


class Editor extends React.Component {
  constructor(){
    super();
    this.state = {
      "stage": 0,
    }
  }

  render() {
    return (
      <div id="Editor" >
        <div className="field">
          <label className="label">
            {/* <StageContext.Consumer>
              {stage => (
                <button/>
              )}
            </StageContext.Consumer> */}

          </label>
          <div className="control">
            <input className="input" type="text" placeholder="text or https:// " />
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-left has-icons-right">
            <input className="input is-success" type="text" placeholder="Text input" value="bulma" />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </div>
          <p className="help is-success">This username is available</p>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input className="input is-danger" type="email" placeholder="Email input" value="hello@" />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          </div>
          <p className="help is-danger">This email is invalid</p>
        </div>

        <div className="field">
          <label className="label">Subject</label>
          <div className="control">
            <div className="select">
              <select>
                <option>Select dropdown</option>
                <option>With options</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Message</label>
          <div className="control">
            <textarea className="textarea" placeholder="Textarea"></textarea>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
