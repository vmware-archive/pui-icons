import React, { Component } from 'react';
import IconGrid from './IconGrid.js';
import SadGhost from './sad-ghost.svg';
import CloseIcon from './icons/close.svg';
import './app.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      icons: []
    }
  }

  componentWillMount() {
    var req = require.context("./icons", true, /\.svg$/);
    var icons = [];

    icons = req.keys().map(function(key){
      var fileName = req(key).replace(/^.*[\\\/]/, '').split('.')[0];

      return { 
        imageSrc: req(key),
        fileName: fileName
      };
    });

    this.setState({icons: icons});
  }

  searchUpdated(event) {
    this.setState({searchTerm: event.target.value})
  }

  clearSearch() {
    this.setState({
      searchTerm: ''
    });
  };

  render() {
    var activeSearch = this.state.searchTerm;

    const filteredIcons = this.state.icons.filter(function(icon) {
      return icon.fileName.includes(activeSearch);
    });

    return (

      <main>
        <div className="icon-search-bar">
          <input placeholder="Search for icons" className="search-input" value={this.state.searchTerm} onChange={this.searchUpdated.bind(this)} />
          {
            this.state.searchTerm.length > 0 &&
            <button className="btn-clear-search">
              <img src={CloseIcon} alt="Clear Search" onClick={this.clearSearch.bind(this)} />
            </button>
          }
        </div>
        <div className="wrapper">
          <IconGrid icons={ filteredIcons }></IconGrid>
          {
            filteredIcons.length === 0 &&
              <div className="empty-state">
                <img src={SadGhost} className={'empty-state-icon'}/>
                <button className="btn btn-secondary" onClick={this.clearSearch.bind(this)}>Clear Search</button>
              </div>
          }
        </div>
      </main>
    );
  }
}

export default App;
