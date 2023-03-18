import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { ADD_SCHOOL,
  addSchoolFailure,
  addSchoolRequested,
  addSchoolSuccess,
  DELETE_SCHOOL,
  deleteSchoolFailure,
  deleteSchoolRequested,
  deleteSchoolSuccess,
  EDIT_SCHOOL,
  editSchoolFailure,
  editSchoolRequested,
  editSchoolSuccess,
  FETCH_CITIES,
  fetchCitiesFailure,
  fetchCitiesRequested,
  fetchCitiesSuccess,
  FETCH_COUNTRIES,
  fetchCountriesFailure,
  fetchCountriesRequested,
  fetchCountriesSuccess,
  FETCH_SCHOOL_CATEGORIES,
  fetchSchoolCategoriesFailure,
  fetchSchoolCategoriesRequested,
  fetchSchoolCategoriesSuccess,
  FETCH_SCHOOLS,
  fetchSchoolsFailure,
  fetchSchoolsRequested,
  fetchSchoolsSuccess,
  FETCH_SINGLE_SCHOOL,
  fetchSingleSchoolFailure,
  fetchSingleSchoolRequested,
  fetchSingleSchoolSuccess } from '../actions/schools-action-types';
import httpClient from './http-client';
import { USER_SUPER_ADMIN } from '../constants';
import Alert from '../utility/alert';
import { history } from '../index';

export function* addSchoolHandler({ payload }) {
  yield put(addSchoolRequested());
  const body = new FormData();

  body.append('school_name', payload.school_name);
  body.append('school_email', payload.school_email);
  body.append('school_phone_no', payload.school_phone_no);
  body.append('school_address', payload.school_address);
  body.append('school_licence_number', payload.school_licence_number);
  body.append('region', payload.region);
  body.append('street', payload.street);
  body.append('number', payload.number);
  body.append('neighborhood', payload.neighborhood);
  body.append('regional_delegation', payload.regional_delegation);
  body.append('subdivision_delegation', payload.subdivision_delegation);

  body.append('status', payload.school_status.value);
  body.append('country_id', payload.country_id.value);
  body.append('city_id', payload.city_id.value);
  body.append('school_category_id', payload.school_category_id.value);

  if (payload.school_logo) {
    body.append('school_logo', payload.school_logo, payload.school_logo.name);
  }

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-school',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(addSchoolFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/schools');
      },
      icon: 'success',
      message: 'School created successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(addSchoolSuccess());
  }
}

export function* editSchoolHandler({ payload }) {
  yield put(editSchoolRequested());
  const body = new FormData();

  body.append('school_name', payload.school_name);
  body.append('school_email', payload.school_email);
  body.append('school_phone_no', payload.school_phone_no);
  body.append('school_address', payload.school_address);
  body.append('school_licence_number', payload.school_licence_number);
  body.append('region', payload.region);
  body.append('street', payload.street);
  body.append('number', payload.number);
  body.append('neighborhood', payload.neighborhood);
  body.append('regional_delegation', payload.regional_delegation);
  body.append('subdivision_delegation', payload.subdivision_delegation);

  body.append('status', payload.school_status.value);
  body.append('country_id', payload.country_id.value);
  body.append('city_id', payload.city_id.value);
  body.append('school_category_id', payload.school_category_id.value);

  if (payload.school_logo) {
    body.append('school_logo', payload.school_logo, payload.school_logo.name);
  }

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: `update-school/${payload.school_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editSchoolFailure(error));
  } else {
    const user = yield select((store) => store.user.userDetail);
    const route = USER_SUPER_ADMIN === user.user_type_id ? '/schools' : '/dashboard';
    const alertProps = {
      callback: () => {
        history.push(route);
      },
      icon: 'success',
      message: 'School created successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(editSchoolSuccess());
  }
}

export function* fetchSchoolsHandler({ payload }) {
  yield put(fetchSchoolsRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'school-list',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSchoolsFailure(error));
  } else {
    yield put(fetchSchoolsSuccess(data.data.result));
  }
}

export function* deleteSchoolsHandler({ payload }) {
  yield put(deleteSchoolRequested());

  const request = {
    method: 'DELETE',
    url: `delete-school/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteSchoolFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'School deleted successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(deleteSchoolSuccess(payload));
  }
}

export function* fetchCitiesHandler() {
  yield put(fetchCitiesRequested());

  const request = {
    method: 'GET',
    url: 'get-city',
  };

  const {
    data, error,
  } = yield call(httpClient, request, false);

  if (error) {
    yield put(fetchCitiesFailure(error));
  } else {
    yield put(fetchCitiesSuccess(data.result.data));
  }
}

export function* fetchCountriesHandler() {
  yield put(fetchCountriesRequested());

  const request = {
    method: 'GET',
    url: 'get-country',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchCountriesFailure(error));
  } else {
    yield put(fetchCountriesSuccess(data.result.data));
  }
}

export function* fetchSchoolCategoriesHandler() {
  yield put(fetchSchoolCategoriesRequested());

  const request = {
    method: 'GET',
    url: 'get-school-category',
  };

  const {
    data, error,
  } = yield call(httpClient, request, false);

  if (error) {
    yield put(fetchSchoolCategoriesFailure(error));
  } else {
    yield put(fetchSchoolCategoriesSuccess(data.result.data));
  }
}

export function* fetchSingleSchoolHandler({ payload }) {
  yield delay(500);
  yield put(fetchSingleSchoolRequested());

  const request = {
    method: 'GET',
    url: `view-school/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request, true);

  if (error) {
    yield put(fetchSingleSchoolFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...data.data.result,
      city_id: {
        label: result.city_name,
        value: result.city_id,
      },
      class_id: {
        label: result.class_name,
        value: result.class_id,
      },
      country_id: {
        label: result.country_name,
        value: result.country_id,
      },
      neighborhood: result.neighborhood || '',
      number: result.number || '',
      region: result.region || '',
      regional_delegation: result.regional_delegation || '',
      school_category_id: {
        label: result.school_category,
        value: result.school_category_id,
      },
      school_status: result.school_status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      },
      street: result.street || '',
      subdivision_delegation: result.subdivision_delegation || '',
    };

    yield put(fetchSingleSchoolSuccess(res));
  }
}

function* schools() {
  yield all([
    takeLatest(ADD_SCHOOL, addSchoolHandler),
    takeLatest(EDIT_SCHOOL, editSchoolHandler),
    takeLatest(DELETE_SCHOOL, deleteSchoolsHandler),
    takeLatest(FETCH_CITIES, fetchCitiesHandler),
    takeLatest(FETCH_COUNTRIES, fetchCountriesHandler),
    takeLatest(FETCH_SCHOOL_CATEGORIES, fetchSchoolCategoriesHandler),
    takeLatest(FETCH_SCHOOLS, fetchSchoolsHandler),
    takeLatest(FETCH_SINGLE_SCHOOL, fetchSingleSchoolHandler),
  ]);
}

export default schools;
