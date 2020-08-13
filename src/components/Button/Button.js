import React from 'react';

import './Button.css';

const CN = 'default-btn';

const Button = props => {
  const { className = '', type = 'button', disabled = false, label = '', onClick } = props;

  const onClickHandler = () => {
    onClick && onClick();
  };

  return (
    <button
      className={`${CN} ${className}`}
      onClick={onClickHandler}
      disabled={disabled}
      type={type}>
      {label}
    </button>
  )
};

export default Button;
