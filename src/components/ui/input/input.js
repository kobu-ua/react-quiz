import React from 'react';

import classes from './input.module.scss';

const isInvalid = ({valid, touched, shouldValidate}) => {
  return !valid && shouldValidate && touched;
};

const Input = (props) => {
  const {errorMessage, label, type, value, onChange} = props;
  const inputType = type || 'text';
  const cls = [classes.input];
  const htmlFor = `${inputType}-${Math.random()}`;
  let error = null;

  // const hasError = true;
  if (isInvalid(props)) {
    cls.push(classes.invalid);
    error = (<span>{errorMessage || 'Please, fill the field'}</span>)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>
        {label}
      </label>
      <input
        id={htmlFor}
        type={inputType}
        value={value}
        onChange={onChange}
      />
      {error}
    </div>
  )
};

export default Input;
