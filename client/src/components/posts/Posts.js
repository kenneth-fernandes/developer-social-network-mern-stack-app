import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import { post } from 'request';
import PostItem from './PostItem';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p class='lead'>
        <i class='fas fa-user'></i> Welcome to the community
      </p>
      {/* Post form */}
      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post}></PostItem>
        ))}
      </div>
    </Fragment>
  );
};

// Proptypes
Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

// Mapping state to props
const mapStateToProps = (state) => ({ post: state.post });

export default connect(mapStateToProps, { getPosts })(Posts);