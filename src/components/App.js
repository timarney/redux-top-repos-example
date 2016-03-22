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
    const { onNext, onPrevious, num, loading, data } = this.props;

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
          <Title text={title} stars={stars} up={up} />
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
      </div>
   );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  num: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  getRepo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const num = state.items.num;
  const data = state.items.data;
  const loading = state.repos.isLoading;
  return {
    num, loading, data,
  };
};


const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    onNext: increment,
    onPrevious: decrement,
    getRepo: loadRepo,
  },

  dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
