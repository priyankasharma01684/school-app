import { all, call, put, takeLatest } from 'redux-saga/effects';
import SweetAlert from 'sweetalert2';
import { CREATE_ENROLLMENT,
  createEnrollmentFailure,
  createEnrollmentRequested,
  createEnrollmentSuccess,
  DELETE_ENROLLMENT,
  deleteEnrollmentFailure,
  deleteEnrollmentRequested,
  deleteEnrollmentSuccess,
  EDIT_ENROLLMENT,
  editEnrollmentFailure,
  editEnrollmentRequested,
  editEnrollmentSuccess,
  FETCH_SINGLE_ENROLLMENT,
  fetchSingleEnrollmentFailure,
  fetchSingleEnrollmentRequested,
  fetchSingleEnrollmentSuccess,
  FETCH_ENROLLMENT,
  fetchEnrollmentFailure,
  fetchEnrollmentRequested,
  fetchEnrollmentSuccess,
  FETCH_ENROLLED_STUDENTS,
  fetchEnrolledStudentsFailure,
  fetchEnrolledStudentsRequested,
  fetchEnrolledStudentsSuccess,
  FETCH_STUDENTS_INSTALLMENT,
  fetchStudentsInstallmentFailure,
  fetchStudentsInstallmentRequested,
  fetchStudentsInstallmentSuccess } from '../actions/enrollment-action-type';
import httpClient from './http-client';
import EnrolmentHelper from '../utility/enrollment-methods';
import { history } from '../index';

export function* createEnrollmentHandler({ payload }) {
  yield put(createEnrollmentRequested());
  const body = EnrolmentHelper.getRequestBody(payload.form, payload.type);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-enrollment',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(createEnrollmentFailure(error));
  } else {
    if (payload.type === 5 && payload.isSubmission) {
      SweetAlert.fire({
        allowOutsideClick: false,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        icon: 'success',
        showCancelButton: false,
        text: 'Enrollment created successfully',
        title: '',
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/enrollments');
        }
      });
    }
    const response = { student_id: data.data.data.id };

    if (payload.callback) {
      payload.callback();
    }

    yield put(createEnrollmentSuccess(response));
  }
}

export function* editEnrollmentHandler({ payload }) {
  yield put(editEnrollmentRequested());
  const body = EnrolmentHelper.getRequestBody(payload.form, payload.type);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'update-enrollment',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editEnrollmentFailure(error));
  } else {
    if (payload.type === 5 && payload.isSubmission) {
      SweetAlert.fire({
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        icon: 'success',
        showCancelButton: false,
        text: 'Enrollment completed successfully',
        title: '',
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/enrollments');
        }
      });
    }
    if (payload.callback) {
      payload.callback();
    }
    yield put(editEnrollmentSuccess());
  }
}

export function* deleteEnrollmentHandler({ payload }) {
  yield put(deleteEnrollmentRequested());

  const request = {
    method: 'DELETE',
    url: `delete-enrollment/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteEnrollmentFailure(error));
  } else {
    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
      icon: 'success',
      showCancelButton: false,
      text: 'Enrollment deleted successfully',
      title: '',
    });
    yield put(deleteEnrollmentSuccess(payload));
  }
}

export function* fetchEnrollmentHandler({ payload }) {
  yield put(fetchEnrollmentRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-enrollment',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchEnrollmentFailure(error));
  } else {
    yield put(fetchEnrollmentSuccess(data.data.result));
  }
}

export function* fetchSingleEnrollmentHandler({ payload }) {
  yield put(fetchSingleEnrollmentRequested());
  yield put(fetchStudentsInstallmentRequested());

  const request = {
    method: 'GET',
    url: `view-enrollment/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleEnrollmentFailure(error));
  } else {
    const response = EnrolmentHelper.mapResponse(data);

    yield put(fetchSingleEnrollmentSuccess(response));
    yield put(fetchStudentsInstallmentSuccess(data.data.installment_dropdown));
  }
}

export function* fetchEnrolledStudentsHandler({ payload }) {
  yield put(fetchEnrolledStudentsRequested());

  const request = {
    method: 'POST',
    url: `auto-complete?name=${payload.keyword}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request, false);

  if (error) {
    yield put(fetchEnrolledStudentsFailure(error));
  } else {
    yield put(fetchEnrolledStudentsSuccess(data.result.data));
    if (payload.callback) {
      payload.callback(data.result.data);
    }
  }
}

function* Enrollment() {
  yield all([
    takeLatest(CREATE_ENROLLMENT, createEnrollmentHandler),
    takeLatest(DELETE_ENROLLMENT, deleteEnrollmentHandler),
    takeLatest(EDIT_ENROLLMENT, editEnrollmentHandler),
    takeLatest(FETCH_ENROLLMENT, fetchEnrollmentHandler),
    takeLatest(FETCH_SINGLE_ENROLLMENT, fetchSingleEnrollmentHandler),
    takeLatest(FETCH_ENROLLED_STUDENTS, fetchEnrolledStudentsHandler),
  ]);
}

export default Enrollment;
