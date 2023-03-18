import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_CLASS,
  createClassFailure,
  createClassRequested,
  createClassSuccess,
  DELETE_CLASS,
  deleteClassFailure,
  deleteClassRequested,
  deleteClassSuccess,
  EDIT_CLASS,
  editClassFailure,
  editClassRequested,
  editClassSuccess,
  FETCH_SINGLE_CLASS,
  fetchSingleClassFailure,
  fetchSingleClassRequested,
  fetchSingleClassSuccess,
  FETCH_CLASSES,
  fetchClassesFailure,
  fetchClassesRequested,
  fetchClassesSuccess } from '../actions/classes-action-types';
import httpClient from './http-client';
import Alert from '../utility/alert';
import { history } from '../index';

export function* createClassHandler({ payload }) {
  yield put(createClassRequested());
  const body = new FormData();

  body.append('class_code', payload.class_code);
  body.append('class_name', payload.class_name);
  body.append('grade_id', payload.grade_id.value);
  body.append('max_no_of_student', payload.max_no_of_student);
  body.append('status', payload.status.value);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-class',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createClassFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/classes');
      },
      icon: 'success',
      message: 'Class created successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(createClassSuccess());
  }
}

export function* editClassHandler({ payload }) {
  yield put(editClassRequested());
  const request = {

    method: 'PUT',
    params: {
      class_code: payload.class_code,
      class_name: payload.class_name,
      grade_id: payload.grade_id.value,
      max_no_of_student: payload.max_no_of_student,
      status: payload.status.value,

    },
    url: `update-class/${payload.class_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editClassFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/classes');
      },
      icon: 'success',
      message: 'Class updated successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(editClassSuccess());
  }
}

export function* deleteClassHandler({ payload }) {
  yield put(deleteClassRequested());
  const request = {
    method: 'DELETE',
    url: `delete-class/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteClassFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'Class deleted successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(deleteClassSuccess(payload));
  }
}

export function* fetchClassesHandler({ payload }) {
  yield put(fetchClassesRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'class',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchClassesFailure(error));
  } else {
    yield put(fetchClassesSuccess(data.data.result));
  }
}

export function* fetchSingleClassHandler({ payload }) {
  yield put(fetchSingleClassRequested());
  const request = {
    method: 'GET',
    url: `view-class/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleClassFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...data.data.result,
      class_id: result.class_id,

      grade_id: {
        label: result.grade_name,
        value: result.grade_id,
      },
      school_id: {
        label: result.school_name,
        value: result.school_id,
      },
      status: result.status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      },
    };

    yield put(fetchSingleClassSuccess(res));
  }
}

function* classes() {
  yield all([
    takeLatest(CREATE_CLASS, createClassHandler),
    takeLatest(DELETE_CLASS, deleteClassHandler),
    takeLatest(EDIT_CLASS, editClassHandler),
    takeLatest(FETCH_CLASSES, fetchClassesHandler),
    takeLatest(FETCH_SINGLE_CLASS, fetchSingleClassHandler),
  ]);
}

export default classes;
