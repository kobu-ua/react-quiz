import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';
import Loader from '../../components/ui/loader';

import classes from './quiz-list.module.scss';

class QuizList extends Component {

  componentDidMount() {
    this.props.fetchQuizes();
  }

  renderQuizes() {
    return this.props.quizes.map(({id, name}) => {
      return (
        <li key={id}>
          <NavLink to={'/quiz/' + id}>
            {name}
          </NavLink>
        </li>
      );
    })
  }

  render() {
    const {loading, quizes} = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.inner}>
          <h1>Tests</h1>
          {
            loading && quizes.length !== 0
              ? <Loader />
              :
              <ul>
                { this.renderQuizes() }
              </ul>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ quiz: { quizes, loading } }) => {
  return {
    quizes,
    loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
