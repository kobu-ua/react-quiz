import React from 'react';


import classes from './loader.module.scss';

const Loader = () => {
  return (
  <div className={classes.slider}>
    <div className={classes.line}></div>
    <div className={`${classes.subline} ${classes.inc}`}></div>
    <div className={`${classes.subline} ${classes.dec}`}></div>
  </div>
  )
};

export default Loader;
