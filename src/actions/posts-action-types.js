import { createAction } from 'redux-actions';

export const CREATE_POST = 'CREATE_POST';
export const createPost = createAction(CREATE_POST);

export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';
export const createPostFailure = createAction(CREATE_POST_FAILURE);

export const CREATE_POST_REQUESTED = 'CREATE_POST_REQUESTED';
export const createPostRequested = createAction(CREATE_POST_REQUESTED);

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const createPostSuccess = createAction(CREATE_POST_SUCCESS);

export const DELETE_POST = 'DELETE_POST';
export const deletePost = createAction(DELETE_POST);

export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';
export const deletePostFailure = createAction(DELETE_POST_FAILURE);

export const DELETE_POST_REQUESTED = 'DELETE_POST_REQUESTED';
export const deletePostRequested = createAction(DELETE_POST_REQUESTED);

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS);

export const EDIT_POST = 'EDIT_POST';
export const editPost = createAction(EDIT_POST);

export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';
export const editPostFailure = createAction(EDIT_POST_FAILURE);

export const EDIT_POST_REQUESTED = 'EDIT_POST_REQUESTED';
export const editPostRequested = createAction(EDIT_POST_REQUESTED);

export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const editPostSuccess = createAction(EDIT_POST_SUCCESS);

export const FETCH_POSTS = 'FETCH_POSTS';
export const fetchPosts = createAction(FETCH_POSTS);

export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const fetchPostsFailure = createAction(FETCH_POSTS_FAILURE);

export const FETCH_POSTS_REQUESTED = 'FETCH_POSTS_REQUESTED';
export const fetchPostsRequested = createAction(FETCH_POSTS_REQUESTED);

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const fetchPostsSuccess = createAction(FETCH_POSTS_SUCCESS);

export const FETCH_SINGLE_POST = 'FETCH_SINGLE_POST';
export const fetchSinglePost = createAction(FETCH_SINGLE_POST);

export const FETCH_SINGLE_POST_FAILURE = 'FETCH_SINGLE_POST_FAILURE';
export const fetchSinglePostFailure = createAction(FETCH_SINGLE_POST_FAILURE);

export const FETCH_SINGLE_POST_REQUESTED = 'FETCH_SINGLE_POST_REQUESTED';
export const fetchSinglePostRequested = createAction(FETCH_SINGLE_POST_REQUESTED);

export const FETCH_SINGLE_POST_SUCCESS = 'FETCH_SINGLE_POST_SUCCESS';
export const fetchSinglePostSuccess = createAction(FETCH_SINGLE_POST_SUCCESS);
