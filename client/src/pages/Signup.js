import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log(data);

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h4 className="title has-text-black">Sign Up</h4>
          <hr class="login-hr"></hr>
          <div className="box">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="field control">
                <input
                  className="input is-large"
                  placeholder="Enter your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                </div>
                <div className="field control">
                <input
                  className="input is-large"
                  placeholder="Choose a username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                </div>
                <input
                  className="input is-large"
                  placeholder="Choose a password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <hr class="login-hr"></hr>
                <button
                  className="button is-block is-info is-large is-fullwidth"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
