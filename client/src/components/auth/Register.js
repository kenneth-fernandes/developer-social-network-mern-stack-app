import React, { Fragment, useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      console.log(formData);
    }
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Create your account
      </p>
      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            type='text'
            name='name'
            className='text'
            placeholder='Name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            className='text'
            placeholder='Email Address'
            required
          />
          <small className='form-text'>
            This site uses a Gravatar, so if you want a profile image, user a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='text'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            placeholder='Password'
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='text'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            minLength='6'
            placeholder='Confirm Password'
          />
        </div>

        <input type='submit' value='Register' className='btn btn-primary' />
      </form>

      <p className='my-1'>
        Already have an account? <a href='login.html'> Sign in</a>
      </p>
    </Fragment>
  );
};

export default Register;
