import { all, call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { CREATE_SCHOOL_YEAR,
  createSchoolYearFailure,
  createSchoolYearRequested,
  createSchoolYearSuccess,
  DELETE_SCHOOL_YEAR,
  deleteSchoolYearFailure,
  deleteSchoolYearRequested,
  deleteSchoolYearSuccess,
  EDIT_SCHOOL_YEAR,
  editSchoolYearFailure,
  editSchoolYearRequested,
  editSchoolYearSuccess,
  FETCH_SINGLE_SCHOOL_YEAR,
  fetchSingleSchoolYearFailure,
  fetchSingleSchoolYearRequested,
  fetchSingleSchoolYearSuccess,
  FETCH_SCHOOL_YEAR,
  fetchSchoolYearFailure,
  fetchSchoolYearRequested,
  fetchSchoolYearSuccess } from '../actions/school-year-action-type';
import httpClient from './http-client';
import Alert from '../utility/alert';
import { history } from '../index';

export function* createSchoolYearHandler({ payload }) {
  yield put(createSchoolYearRequested());
  const body = new FormData();

  body.append('school_start_year', moment(payload.school_start_year).format('yyyy').toString());
  body.append('back_to_school_date', moment(payload.back_to_school_date).format('MM/DD/yyyy').toString());
  body.append('school_end_year', moment(payload.school_end_year).format('yyyy').toString());
  body.append('registration_start_date', moment(payload.registration_start_date).format('MM/DD/yyyy').toString());
  body.append('school_year_end_date', moment(payload.school_year_end_date).format('MM/DD/YYYY').toString());

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-schoolyear',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createSchoolYearFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/school-year');
      },
      icon: 'success',
      message: 'School year created successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(createSchoolYearSuccess());
  }
}

export function* editSchoolYearHandler({ payload }) {
  yield put(editSchoolYearRequested());

  const request = {
    method: 'PUT',
    params: {
      back_to_school_date: moment(payload.back_to_school_date).format('MM/DD/yyyy').toString(),
      registration_start_date: moment(payload.registration_start_date).format('MM/DD/yyyy').toString(),
      school_end_year: moment(payload.school_end_year).format('yyyy').toString(),
      school_start_year: moment(payload.school_start_year).format('yyyy').toString(),
      school_year_end_date: moment(payload.school_year_end_date).format('MM/DD/YYYY').toString(),
    },
    url: `update-schoolyear/${payload.school_year_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editSchoolYearFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/school-year');
      },
      icon: 'success',
      message: 'School year updated successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(editSchoolYearSuccess());
  }
}

export function* deleteSchoolYearHandler({ payload }) {
  yield put(deleteSchoolYearRequested());

  const request = {
    method: 'DELETE',
    url: `delete-schoolyear/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteSchoolYearFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'School year deleted successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(deleteSchoolYearSuccess(payload));
  }
}

export function* fetchSchoolYearHandler({ payload }) {
  yield put(fetchSchoolYearRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-schoolyear',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSchoolYearFailure(error));
  } else {
    yield put(fetchSchoolYearSuccess(data.data.result));
  }
}

export function* fetchSingleSchoolYearHandler({ payload }) {
  yield put(fetchSingleSchoolYearRequested());

  const request = {
    method: 'GET',
    url: `view-schoolyear/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleSchoolYearFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...data.data.result,
      back_to_school_date: moment(result.back_to_school_date, 'X').toDate(),
      registration_start_date: moment(result.registration_start_date, 'X').toDate(),
      school_end_year: moment(result.school_end_year, 'YYYY').toDate(),
      school_start_year: moment(result.school_start_year, 'YYYY').toDate(),
      school_year_end_date: moment(result.school_year_end_date, 'X').toDate(),
      school_year_id: result.school_year_id,
    };

    yield put(fetchSingleSchoolYearSuccess(res));
  }
}

function* SchoolYears() {
  yield all([
    takeLatest(CREATE_SCHOOL_YEAR, createSchoolYearHandler),
    takeLatest(DELETE_SCHOOL_YEAR, deleteSchoolYearHandler),
    takeLatest(EDIT_SCHOOL_YEAR, editSchoolYearHandler),
    takeLatest(FETCH_SCHOOL_YEAR, fetchSchoolYearHandler),
    takeLatest(FETCH_SINGLE_SCHOOL_YEAR, fetchSingleSchoolYearHandler),
  ]);
}

export default SchoolYears;
