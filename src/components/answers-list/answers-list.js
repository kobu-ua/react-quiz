import React from 'react';
import classes from './answers-list.module.scss';

const AnswersList = ({ answerState, answers, onAnswerClick }) => {
  const items = answers.map(({text, id}) => {
    const state = answerState ? answerState[id] : null;
    const cls = [classes.item];
    if (state) {
      cls.push(classes[state]);
    }
    return (
      <li
        className={cls.join(' ')}
        key={id}
        onClick={()=> onAnswerClick(id)}
      >
        { text }
      </li>
    );
  });

  return (
    <ul className={classes.list}>
      { items }
    </ul>
  );
};

export default AnswersList;
