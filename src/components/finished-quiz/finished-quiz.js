import React from 'react';
import Button from '../ui/button';
import classes from './finished-quiz.module.scss';
import {Link} from 'react-router-dom';

const FinishedQuiz = ({results, quiz, onRetry}) => {

  // const succesAnswers = results.filter(item => item === 'success');
  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'success') {
      total += 1;
    }

    return total;
  }, 0);

  const items = quiz.map(({question, id}, index) => {
    const cls = [
      'fa',
      results[id] === 'success' ? 'fa-check' : 'fa-times',
      classes[results[id]]
    ];
    const icon = <i className={cls.join(' ')} />;
    return (
      <li key={index}>
        <strong>{`${index + 1}. `}</strong>
        {question}
        {icon}
      </li>
    );
  });

  return (
    <div className={classes.wrap}>
      <ul>
        {items}
      </ul>
      <p>{`You answered correctly for ${successCount} from ${quiz.length}`}</p>
      <div>
        <Button
          onClick={onRetry}
          type="button"
          theme="primary"
        >
          Retry
        </Button>
        <Link to='/'>
          <Button
            onClick={()=>{console.log('next test')}}
            type="button"
            theme="success"
          >
            Go To Test List
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
