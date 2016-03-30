import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Connect extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch } = this.props;

    console.log(dispatch)

    return (
      <div>
      </div>
   );
  }
}

//passing nothing to connect gives us the dispatcher as a prop
export default connect()(Connect);
