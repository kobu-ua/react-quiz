import React from 'react';
import classes from './backdrop.module.scss';

const Backdrop = ({onClick}) => {
  return (
    <div
      onClick={onClick}
      className={classes.backdrop}>
    </div>
  )
};

export default Backdrop;
