import axios from 'axios';

import { setAlert } from './alert';

import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POSTS,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES,
} from '../actions/types';

// Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    // Get all posts
    const res = await axios.get('/api/posts');

    // Dispatch the response
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    // Dispatch error
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    // Add like to post
    const res = await axios.put(`/api/posts/like/${postId}`);

    // Dispatch the response
    dispatch({ type: UPDATE_LIKES, payload: { id: postId, likes: res.data } });
  } catch (error) {
    // Dispatch error

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    // Delete like from a post
    const res = await axios.delete(`/api/posts/like/${postId}`);

    // Dispatch the response
    dispatch({ type: UPDATE_LIKES, payload: { id: postId, likes: res.data } });
  } catch (error) {
    // Dispatch error

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    // Get created post data
    const res = await axios.post('/api/posts', formData, config);

    // Dispatch the response
    dispatch({ type: ADD_POST, payload: res.data });

    // Dispatch alert
    dispatch(setAlert('Post Created', 'success'));
  } catch (error) {
    // Dispatch error

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete post
export const deletePost = (postId) => async (dispatch) => {
  try {
    // Delete a post
    const res = await axios.delete(`/api/posts/${postId}`);

    // Dispatch the response
    dispatch({ type: DELETE_POSTS, payload: postId });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (error) {
    // Dispatch error

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Get Posts
export const getPostById = (postId) => async (dispatch) => {
  try {
    // Get all posts
    const res = await axios.get(`/api/posts/${postId}`);

    // Dispatch the response
    dispatch({ type: GET_POST, payload: res.data });
  } catch (error) {
    // Dispatch error
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add Comment
export const addComment = (postId, formData) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    // Add a comment to a post
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    // Dispatch the response
    dispatch({ type: ADD_COMMENT, payload: res.data });

    // Dispatch alert
    dispatch(setAlert('Comment Added', 'success'));
  } catch (error) {
    // Dispatch error

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    // Get created post data
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    // Dispatch the response
    dispatch({ type: REMOVE_COMMENT, payload: commentId });

    // Dispatch alert
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (error) {
    // Dispatch error

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
