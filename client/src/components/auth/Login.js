import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Success');
  };
  return (
    <Fragment>
      <div className='alert alert-danger'>Invalid Credentials</div>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Sign into your account
      </p>
      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            className='text'
            onChange={(e) => onChange(e)}
            placeholder='Email Address'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            className='text'
            placeholder='Password'
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>

        <input type='submit' value='Register' className='btn btn-primary' />
      </form>

      <p className='my-1'>
        Don't have an account? <Link to='/register'> Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
