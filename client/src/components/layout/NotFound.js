import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <h2 className='large text-primary'>
        <i className='fas fa-exclamation-triangle'></i>
        Page Not Found
      </h2>
      <p className='large'>Sorry, this page does not exist.</p>
    </Fragment>
  );
};

export default NotFound;
