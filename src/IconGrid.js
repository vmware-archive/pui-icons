import React, { Component } from 'react';
import IconGridItem from './IconGridItem.js';

class IconGrid extends Component {
  createGrid() {
    return this.props.icons.map(function(icon, index) {
      return(
        <IconGridItem
          key={index}
          path={icon.imageSrc}
          name={icon.imageName}>
        </IconGridItem> 
      );
    })
  }

  render() {
    return(
      <ul className="icon-list list-unstyled">
        { this.createGrid() }
      </ul>
    );
  }
}

export default IconGrid;