import React, { Component } from 'react';
import IconGrid from './IconGrid.js';
import './app.scss';

var req = require.context("./icons", true, /\.svg$/);

class App extends Component {
  render() {
    var icons = req.keys().map(function(key){
      var fileName = req(key).replace(/^.*[\\\/]/, '').split('.')[0];

      return { 
        imageSrc: req(key),
        imageName: fileName
      };
    });

    return (
      <div className="wrapper">
        <IconGrid icons={icons}></IconGrid>
      </div>
    );
  }
}

export default App;
