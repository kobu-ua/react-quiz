import React from 'react';
import AnswersList from '../answers-list';
import classes from './active-quiz.module.scss';

const ActiveQuiz = props => {
  const { answers, answerState, question, onAnswerClick, total, current } = props;
  return (
    <div className={classes['active-quiz']}>
      <p className={classes['active-quiz__question']}>
        <span>
          <strong>{current}. </strong>
          {question}
        </span>
        <small>{`${current} from ${total}`}</small>
      </p>
      <AnswersList
        answerState={answerState}
        onAnswerClick={onAnswerClick}
        answers={answers}
      />
    </div>
  );
};

export default ActiveQuiz;