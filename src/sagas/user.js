import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { CHANGE_PASSWORD,
  changePasswordFailure,
  changePasswordRequested,
  changePasswordSuccess,
  FORGOT_PASSWORD,
  forgotPasswordFailure,
  forgotPasswordRequested,
  forgotPasswordSuccess,
  FETCH_MY_PROFILE_DETAIL,
  fetchMyProfileDetailFailure,
  fetchMyProfileDetailRequested,
  fetchMyProfileDetailSuccess,
  LOGIN,
  LOGIN_SUCCESS,
  loginFailure,
  loginRequested,
  loginSuccess,
  LOGOUT,
  logoutFailure,
  logoutRequested,
  logoutSuccess,
  UPDATE_PROFILE_DETAIL,
  updateProfileDetailFailure,
  updateProfileDetailRequested,
  updateProfileDetailSuccess } from '../actions/user-action-types';
import httpClient from './http-client';
import Alert from '../utility/alert';
import { history } from '../index';

export function* loginHandler({ payload }) {
  yield put(loginRequested());

  const request = {
    data: payload,
    method: 'POST',
    url: 'login',
  };

  const {
    data, error,
  } = yield call(httpClient, request, true, false);

  if (error) {
    yield put(loginFailure(error));
  } else {
    yield put(loginSuccess(data.data));
    yield delay(200);
    yield put(push('/dashboard'));
  }
}

export function* forgotPasswordHandler({ payload }) {
  yield put(forgotPasswordRequested());

  const request = {
    method: 'PUT',
    params: payload,
    url: 'forgot-password',
  };

  const { error } = yield call(httpClient, request, true, false);

  if (error) {
    yield put(forgotPasswordFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/');
      },
      icon: 'success',
      message: 'Password reset instructions has been sent on your registered email.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(forgotPasswordSuccess());
  }
}

export function* logoutHandler() {
  yield put(logoutRequested());

  const request = {
    method: 'PUT',
    url: 'logout',
  };

  const { error } = yield call(httpClient, request, true, true);

  if (error) {
    yield put(logoutFailure(error));
  } else {
    yield put(logoutSuccess());
    yield put(push('/'));
  }
}

export function* changePasswordHandler({ payload }) {
  yield put(changePasswordRequested());

  const request = {
    method: 'POST',
    params: payload,
    url: 'change-password',
  };

  const { error } = yield call(httpClient, request, true, true);

  if (error) {
    yield put(changePasswordFailure(error));
  } else {
    yield put(changePasswordSuccess());
    yield put(push('/my-profile'));
  }
}

export function* fetchProfileHandler({ payload }) {
  yield put(fetchMyProfileDetailRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'my-profile',
  };

  const {
    data, error,
  } = yield call(httpClient, request, true, true);

  if (error) {
    yield put(fetchMyProfileDetailFailure(error));
  } else {
    yield put(fetchMyProfileDetailSuccess(data.data));
  }
}

export function* updateProfileHandler({ payload }) {
  yield put(updateProfileDetailRequested());
  const body = new FormData();

  body.append('name', payload.name);
  body.append('password', payload.password);
  body.append('phone_number', payload.phone_number);

  if (payload.image) {
    body.append('image', payload.image);
  }

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'profile-update',
  };

  const { error } = yield call(httpClient, request, true, true);

  if (error) {
    yield put(updateProfileDetailFailure(error));
  } else {
    yield put(updateProfileDetailSuccess());
    yield put(push('/my-profile'));
  }
}

function* user() {
  yield all([
    takeLatest(CHANGE_PASSWORD, changePasswordHandler),
    takeLatest(FORGOT_PASSWORD, forgotPasswordHandler),
    takeLatest(LOGIN, loginHandler),
    takeLatest(LOGOUT, logoutHandler),
    takeLatest([LOGIN_SUCCESS, FETCH_MY_PROFILE_DETAIL], fetchProfileHandler),
    takeLatest(UPDATE_PROFILE_DETAIL, updateProfileHandler),
  ]);
}

export default user;
