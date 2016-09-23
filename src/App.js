import React, { Component } from 'react';
import IconGrid from './IconGrid.js';
import SadGhost from './sad-ghost.svg';
import ReactSVG from 'react-svg/dist/react-svg.js';
import './app.scss';
var _ = require('lodash');


var req = require.context("./icons", true, /\.svg$/);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }

  filterIcons(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  getSVGs() {
    var icons = [];
    icons = req.keys().map(function(key){
      var fileName = req(key).replace(/^.*[\\\/]/, '').split('.')[0];

      return { 
        imageSrc: req(key),
        imageName: fileName
      };
    });

    return icons;
  }

  clearSearch() {
    this.setState({
      searchTerm: ''
    });
  };

  render() {
    var icons = this.getSVGs();
    var currentState = this.state.searchTerm;

    var filteredIcons = _.filter(icons, function(icon) {
      return icon.imageName.includes(currentState)
    });

    return (

      <main>
        <div className="icon-search-bar">
          <input type="text" placeholder="Search for icons" value={this.state.searchTerm} onChange={this.filterIcons.bind(this)} />
        </div>
        <div className="wrapper">
          <IconGrid icons={filteredIcons}></IconGrid>
          {
            filteredIcons.length === 0 &&
              <div className="empty-state">
                <ReactSVG path={SadGhost} className={'empty-state-icon'}/>
                <button className="btn btn-secondary" onClick={this.clearSearch.bind(this)}>Clear Search</button>
              </div>
          }
        </div>
      </main>
    );
  }
}

export default App;
