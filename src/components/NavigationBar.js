import React, { Component } from 'react';
import '../assets/css/styles.css';

class NavigationBar extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div id="NavigationBar">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://www.acme.codes">
              <img src={require('../assets/images/logo.png')} id="logo-navbar" />
            </a>
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true">Home</span>
              <span aria-hidden="true">About</span>
              <span aria-hidden="true">FAQ</span>
            </a>
          </div>
        </nav>
        {/* Big Banner */}
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Animated Code Made Easy Generator
              </h1>
              <h2 className="subtitle">
                Nothing to explain! Just try it out below.
              </h2>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default NavigationBar;
