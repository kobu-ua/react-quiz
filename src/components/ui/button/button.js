import React from 'react';
import classes from './button.module.scss';

const Button = ({onClick, disabled, children, theme}) => {
  const cls = [
    classes.btn,
    classes[theme]
  ];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cls.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
