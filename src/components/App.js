import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Icon from 'react-fa';
import Title from './Title';
import { increment, decrement, loadRepo } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.getRepo = this.getRepo.bind(this);
  }

  getRepo() {
    this.props.getRepo('https://github.com/timarney/changelog-web-scrape');
  }

  render() {
    const { onNext, onPrevious, num, loading, data, getDetails, json } = this.props;

    let spinner = '';
    if (loading) {
      spinner = <Icon name="cog" spin />;
    } else {
      spinner = '';
    }

    const previousClass = classNames({ disabled: num === 0, button: 'button' });
    const nextClass = classNames({ disabled: num === data.length - 1, button: 'button' });

    const title = data[num].text;
    const stars = data[num].stats.stars;
    const up = data[num].stats.up;

    return (
      <div>
        <div id="repo-loader">
          <Title text={title} stars={stars} up={up} getDetails={ getDetails} />
          <a href="#" className={previousClass} onClick={ onPrevious }>
            <Icon name="arrow-left" /> Previous
          </a>
          <a href="#" className={nextClass} onClick={ onNext }>
            <Icon name="arrow-right" /> Next
          </a>
        </div>
        <div className="loader">
        {spinner}
        </div>
        {json}
      </div>
   );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  num: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  getDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const num = state.items.num;
  const data = state.items.data;
  const loading = state.repo.isLoading;
  const json = state.repo.json;

  return {
    num, loading, data, json
  };
};


const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    onNext: increment,
    onPrevious: decrement,
    getDetails: loadRepo,
  },

  dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
