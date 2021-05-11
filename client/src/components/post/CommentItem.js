import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import defaultImg from '../../images/default.png';

const CommentItem = ({
  comment: { _id, text, name, avatar, user, date },
  postId,
  auth,
  deleteComment,
}) => {
  return (
    <div class='post bg-white my-1 p-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img
            class='round-img'
            src={avatar ? avatar : defaultImg}
            alt={name}
          />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p class='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>{' '}
        {!auth.loading && user === auth.user._id && (
          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              deleteComment(_id);
            }}
            className='btn btn-danger'
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
