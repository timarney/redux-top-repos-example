import React, { Component, PropTypes } from 'react';
import Icon from 'react-fa';

export default class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text, stars, up } = this.props;

    return (
      <div className="stats">
        <h2>{text}</h2>
        <span className="stars"><Icon name="star" /> {stars} </span>
        <span className="up"><Icon name="arrow-up" /> {up}</span>
        <a href="#" className="more">more details</a>
      </div>
   );
  }
}
