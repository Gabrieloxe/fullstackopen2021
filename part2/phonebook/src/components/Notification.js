import React from 'react';

const Success = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className='success'>{message}</div>;
};

const Error = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className='error'>{message}</div>;
  };

export {Success, Error};
