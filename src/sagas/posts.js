import { all, call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { CREATE_POST,
  CREATE_POST_SUCCESS,
  createPostFailure,
  createPostRequested,
  createPostSuccess,
  DELETE_POST,
  deletePostFailure,
  deletePostRequested,
  deletePostSuccess,
  EDIT_POST,
  editPostFailure,
  editPostRequested,
  editPostSuccess,
  FETCH_SINGLE_POST,
  fetchSinglePostFailure,
  fetchSinglePostRequested,
  fetchSinglePostSuccess,
  FETCH_POSTS,
  fetchPostsFailure,
  fetchPostsRequested,
  fetchPostsSuccess } from '../actions/posts-action-types';
import httpClient from './http-client';
import Alert from '../utility/alert';

export function* createPostHandler({ payload }) {
  yield put(createPostRequested());
  const body = new FormData();

  body.append('post_title', payload.title);
  body.append('post_description', payload.description);
  body.append('post_start_date', moment(payload.start_date).format('MM/DD/yyyy hh:mm a').toString());
  body.append('post_end_date', moment(payload.end_date).format('MM/DD/yyyy hh:mm a').toString());

  if (payload.school_wall_image) {
    body.append('school_wall_image', payload.school_wall_image);
  }
  if (payload.thumbnail) {
    body.append('thumbnail', payload.thumbnail);
  }

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'school-admin-add-posts',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createPostFailure(error));
  } else {
    yield put(createPostSuccess());
  }
}

export function* editPostHandler({ payload }) {
  yield put(editPostRequested());
  const body = new FormData();

  body.append('post_title', payload.title);
  body.append('post_description', payload.description);
  body.append('post_start_date', moment(payload.post_start_date).format('MM/DD/yyyy hh:mm a').toString());
  body.append('post_end_date', moment(payload.post_end_date).format('MM/DD/yyyy hh:mm a').toString());

  if (payload.school_wall_image) {
    body.append('school_wall_image', payload.school_wall_image);
  }

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: `school-admin-update-post/${payload.id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editPostFailure(error));
  } else {
    yield put(editPostSuccess());
  }
}

function* fetchPostsHandler({ payload }) {
  yield put(fetchPostsRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'school-admin-post-list',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchPostsFailure(error));
  } else {
    yield put(fetchPostsSuccess(data.wallPostList));
  }
}

function* deletePostHandler({ payload }) {
  yield put(deletePostRequested());

  const request = {
    method: 'DELETE',
    url: `school-admin-delete-post/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deletePostFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'Post deleted successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(deletePostSuccess(payload));
  }
}

function* fetchSinglePostHandler({ payload }) {
  yield put(fetchSinglePostRequested());
  const request = {
    method: 'GET',
    url: `school-admin-view-post/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSinglePostFailure(error));
  } else {
    yield put(fetchSinglePostSuccess());
  }
}

function* posts() {
  yield all([
    takeLatest(CREATE_POST, createPostHandler),
    takeLatest(DELETE_POST, deletePostHandler),
    takeLatest(EDIT_POST, editPostHandler),
    takeLatest([FETCH_POSTS, CREATE_POST_SUCCESS], fetchPostsHandler),
    takeLatest([FETCH_SINGLE_POST], fetchSinglePostHandler),
  ]);
}

export default posts;
