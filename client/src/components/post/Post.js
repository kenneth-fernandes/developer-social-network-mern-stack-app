import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPostById } from '../../actions/post';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

const Post = ({ getPostById, post: { post, loading }, match }) => {
  useEffect(() => {
    getPostById(match.params.id);
  }, [getPostById]);
  return loading || post == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn btn-light'>
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
    </Fragment>
  );
};

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPostById })(Post);
