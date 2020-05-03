import React from 'react';

import classes from './select.module.scss';

const Select = ({label, value, options, onChange}) => {
  const htmlFor = `${label}-${Math.random()}`;
  return (
    <div className={classes.wrapper}>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        id={htmlFor}
        value={value}
        onChange={onChange}
      >
        {
          options.map(({value, text}, index) => {
            return (
              <option
                value={value}
                key={value + index}
              >
                {text}
              </option>
            )
          })
        }
      </select>
    </div>
  );
};

export default Select;
