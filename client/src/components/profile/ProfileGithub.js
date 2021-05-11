import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';
import { Fragment } from 'react';

const ProfileGithub = ({ username, getGithubRepos, repos, loading }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);

  const finalElem = (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i>Github Repos
      </h2>
      {repos.length > 0 ? (
        repos.map((repo) => (
          <div key={repo._id} className='repo bg-white my-1 p-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge badge-light'>Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <h4>Could not find repos for this user - "{username}"</h4>
      )}
    </div>
  );
  return repos === null ? <Spinner /> : finalElem;
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
