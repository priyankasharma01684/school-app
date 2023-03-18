import { CREATE_POST_FAILURE,
  CREATE_POST_REQUESTED,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUESTED,
  DELETE_POST_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUESTED,
  FETCH_POSTS_SUCCESS } from '../actions/posts-action-types';

const initialState = {
  createPostStatus: 'pending',
  deletePostStatus: 'pending',
  fetchPostsStatus: 'pending',
  records: [],
};

export default function schools(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case CREATE_POST_FAILURE:
      return {
        ...state,
        createPostStatus: 'failure',
      };

    case CREATE_POST_REQUESTED:
      return {
        ...state,
        createPostStatus: 'creating',
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        createPostStatus: 'success',
      };

    case DELETE_POST_FAILURE:
      return {
        ...state,
        deletePostStatus: 'failure',
      };

    case DELETE_POST_REQUESTED:
      return {
        ...state,
        deletePostStatus: 'deleting',
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        deletePostStatus: 'success',
        records: [...state.records].filter((post) => post.post_id.toString() !== payload.toString()),
      };

    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        fetchPostsStatus: 'failure',
      };

    case FETCH_POSTS_REQUESTED:
      return {
        ...state,
        fetchPostsStatus: 'fetching',
      };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        fetchPostsStatus: 'success',
        records: payload,
      };

    default:
      return state;
  }
}
