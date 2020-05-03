import React from 'react';
import classes from './menu-toggle.module.scss';

const MenuToggle = ({onToggle, isOpen}) => {
  const cls = [
    classes.toggle,
    'fa',
  ];

  if (isOpen) {
    cls.push('fa-times');
    cls.push(classes.open);
  } else {
    cls.push('fa-bars');
  }

  return (
    <i
      className={cls.join(' ')}
      onClick={onToggle}
    ></i>
  );
};

export default MenuToggle;
