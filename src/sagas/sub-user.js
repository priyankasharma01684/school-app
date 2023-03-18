import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_SUB_USER,
  createSubUserFailure,
  createSubUserRequested,
  createSubUserSuccess,
  DELETE_SUB_USER,
  deleteSubUserFailure,
  deleteSubUserRequested,
  deleteSubUserSuccess,
  EDIT_SUB_USER,
  editSubUserFailure,
  editSubUserRequested,
  editSubUserSuccess,
  FETCH_SINGLE_SUB_USER,
  fetchSingleSubUserFailure,
  fetchSingleSubUserRequested,
  fetchSingleSubUserSuccess,
  FETCH_SUB_USER,
  fetchSubUserFailure,
  fetchSubUserRequested,
  fetchSubUserSuccess } from '../actions/sub-user-action-type';
import httpClient from './http-client';
import Alert from '../utility/alert';
import { history } from '../index';

export function* createSubUserHandler({ payload }) {
  yield put(createSubUserRequested());
  const body = new FormData();

  body.append('username', payload.username);
  body.append('email', payload.email);
  body.append('password', payload.password);
  body.append('phone_number', payload.phone_number);
  body.append('status', payload.status.value);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-school-subadmin',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createSubUserFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/sub-user');
      },
      icon: 'success',
      message: 'Sub User created successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(createSubUserSuccess());
  }
}

export function* editSubUserHandler({ payload }) {
  yield put(editSubUserRequested());

  const request = {
    method: 'POST',
    params: {
      email: payload.email,
      password: payload.password,
      phone_number: payload.phone_number,
      status: payload.status.value,
      username: payload.username,
    },
    url: `edit-school-subadmin/${payload.id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editSubUserFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/sub-user');
      },
      icon: 'success',
      message: 'SubUser updated successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(editSubUserSuccess());
  }
}

export function* deleteSubUserHandler({ payload }) {
  yield put(deleteSubUserRequested());

  const request = {
    method: 'DELETE',
    url: `delete-school-subadmin/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteSubUserFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'SubUser deleted successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(deleteSubUserSuccess(payload));
  }
}

export function* fetchSubUserHandler({ payload }) {
  yield put(fetchSubUserRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-school-subadmin',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSubUserFailure(error));
  } else {
    // console.log(data.data.result)
    yield put(fetchSubUserSuccess(data.data.result));
  }
}

export function* fetchSingleSubUserHandler({ payload }) {
  yield put(fetchSingleSubUserRequested());

  const request = {
    method: 'GET',
    url: `view-school-subadmin/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleSubUserFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...data.data.result,
      id: result.id,
      status: result.status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      },
    };

    yield put(fetchSingleSubUserSuccess(res));
  }
}

function* SubUsers() {
  yield all([
    takeLatest(CREATE_SUB_USER, createSubUserHandler),
    takeLatest(DELETE_SUB_USER, deleteSubUserHandler),
    takeLatest(EDIT_SUB_USER, editSubUserHandler),
    takeLatest(FETCH_SUB_USER, fetchSubUserHandler),
    takeLatest(FETCH_SINGLE_SUB_USER, fetchSingleSubUserHandler),
  ]);
}

export default SubUsers;
