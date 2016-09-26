import React, { Component } from 'react';

class IconSearch extends Component {
  render() {
    return(
      <div className="icon-search-bar">
        <input placeholder="Search for icons" className="search-input" value={this.props.activeSearch} onChange={this.searchUpdated.bind(this)} />
        {
          /*
          this.state.searchTerm.length > 0 &&
          <button className="btn-clear-search">
            <img src={CloseIcon} alt="Clear Search" onClick={this.clearSearch.bind(this)} />
          </button>
          */
        }
      </div>
    );
  }
}

export default IconSearch;