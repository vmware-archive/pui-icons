import React, { Component } from 'react';
import InlineSVG from 'react-inline-svg';

class IconGridItem extends Component {
  
  render() {
    return(
      <li key={this.props.index} className="icon-list-item">
        <div className="icon-list-item-content">
          <InlineSVG src={this.props.path} className="icon-preview"/>
          <pre className="icon-classname">{ this.props.name }</pre>
        </div>
      </li>
    ); 
  }
}

export default IconGridItem;