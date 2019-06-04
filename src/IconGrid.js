import React, { Component } from 'react';
import {FlexCol} from 'pivotal-ui/react/flex-grids';
import IconGridItem from './IconGridItem.js';

class IconGrid extends Component {
  createGrid() {
    return this.props.icons.map(function(icon, index) {
      return(
        <IconGridItem
          key={index}
          path={icon.imageSrc}
          name={icon.fileName}>
        </IconGridItem> 
      );
    })
  }

  render() {
    return(
      <FlexCol className="icon-list centered">
        { this.createGrid() }
      </FlexCol>
    );
  }
}

export default IconGrid;