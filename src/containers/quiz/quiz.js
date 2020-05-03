import React, { Component } from 'react';
import ActiveQuiz from '../../components/active-quiz';
import FinishedQuiz from '../../components/finished-quiz';
import Loader from '../../components/ui/loader';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

import classes from './quiz.module.scss';
import { connect } from 'react-redux';

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    const { answerState, currentQuestion, isFinished, quiz, results, loading, quizAnswerClick, retryQuiz } = this.props;
    return (
      <div className={classes.quiz}>
        <div className={classes.quiz__inner}>
          <h1>Answer for all Question!</h1>
          {
            loading || !quiz
              ? <Loader />
              : isFinished
                ? <FinishedQuiz
                    results={results}
                    quiz={quiz}
                    onRetry={retryQuiz}
                  />
                : <ActiveQuiz
                    onAnswerClick={quizAnswerClick}
                    question={quiz[currentQuestion].question}
                    answers={quiz[currentQuestion].answers}
                    total={quiz.length}
                    current={currentQuestion + 1}
                    answerState={answerState}
                  />
          }
        </div>
      </div>
    )
  };
}

const mapStateToProps = ({ quiz: { answerState, currentQuestion, isFinished, quiz, results, loading } }) => {
  return {
    answerState,
    currentQuestion,
    isFinished,
    quiz,
    results,
    loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);