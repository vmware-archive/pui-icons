import React, { Component } from 'react';
import ReactSVG from 'react-svg/dist/react-svg.js';

class IconGridItem extends Component {
  
  render() {
    return(
      <li key={this.props.path} className="icon-list-item">
        <div className="icon-list-item-content">
          <div className="svgicon">
            <ReactSVG
              path={this.props.path}
              className="icon-preview"
            />
          </div>
          <pre className="icon-classname">{ this.props.name }</pre>
        </div>
      </li>
    ); 
  }
}

export default IconGridItem;