import React, { useEffect } from 'react';
import Layout from './components/hoc';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Quiz from './containers/quiz';
import QuizList from './containers/quiz-list';
import QuizCreator from './containers/quiz-creator';
import Auth from './containers/auth';
import { connect } from 'react-redux';
import Logout from './components/logout/logout';
import { authLogin } from './store/actions/auth';

const App = props => {

  useEffect(() => {
    props.authLogin();
  }, []);

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/quiz/:id' component={Quiz} />
      <Route path='/' exact component={QuizList} />
      <Redirect to='/' />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/quiz-creator' component={QuizCreator} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={QuizList} />
        <Redirect to='/' />
      </Switch>
    );
  };
  return (
    <Layout>
      {routes}
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    authLogin: () => dispatch(authLogin())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
