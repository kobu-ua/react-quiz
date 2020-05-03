import React from 'react';
import Layout from './components/hoc';
import {Route, Switch} from 'react-router-dom';
import Quiz from './containers/quiz';
import QuizList from './containers/quiz-list';
import QuizCreator from './containers/quiz-creator';
import Auth from './containers/auth';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz-creator' component={QuizCreator} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' component={QuizList} />
      </Switch>
    </Layout>
  );
}

export default App;
