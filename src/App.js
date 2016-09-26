import React, { Component } from 'react';
import IconGrid from './IconGrid.js';
import SadGhost from './sad-ghost.svg';
import './app.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      icons: []
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));

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
  }

  handleScroll() {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    if( this.iconSearchBar !== null) {
      if( top > 78 ) {
        this.iconSearchBar.classList.add('page-is-scrolled');
      } else {
        this.iconSearchBar.classList.remove('page-is-scrolled');
      }
    }
  }

  render() {
    var activeSearch = this.state.searchTerm;
    const filteredIcons = this.state.icons.filter(function(icon) {
      return icon.fileName.includes(activeSearch);
    });

    return (

      <main>
        { this.state.navClass }
        <div id="iconSearchBar" className="icon-search-bar" ref={(ref) => this.iconSearchBar = ref} >
          <input placeholder="Search for icons" className="search-input" value={this.state.searchTerm} onChange={this.searchUpdated.bind(this)} />
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
