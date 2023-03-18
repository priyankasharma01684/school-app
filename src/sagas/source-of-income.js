import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ADD_SOURCE_OF_INCOME,
  addSourceOfIncomeFailure,
  addSourceOfIncomeRequested,
  addSourceOfIncomeSuccess,
  DELETE_SOURCE_OF_INCOME,
  deleteSourceOfIncomeFailure,
  deleteSourceOfIncomeRequested,
  deleteSourceOfIncomeSuccess,
  FETCH_SOURCE_OF_INCOME,
  fetchSourceOfIncomeFailure,
  fetchSourceOfIncomeRequested,
  fetchSourceOfIncomeSuccess,
  FETCH_SINGLE_SOURCE_OF_INCOME,
  fetchSingleSourceOfIncomeFailure,
  fetchSingleSourceOfIncomeRequested,
  fetchSingleSourceOfIncomeSuccess,
  EDIT_SOURCE_OF_INCOME,
  editSourceOfIncomeFailure,
  editSourceOfIncomeRequested,
  editSourceOfIncomeSuccess } from '../actions/source-of-income-action-type';
import httpClient from './http-client';
import Alert from '../utility/alert';
import { history } from '../index';

export function* addSourceOfIncomeHandler({ payload }) {
  yield put(addSourceOfIncomeRequested());
  const body = new FormData();

  body.append('source_of_income_code', payload.source_of_income_code);
  body.append('source_of_income_description', payload.source_of_income_description);
  body.append('status', payload.status.value);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-sourceofincome',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(addSourceOfIncomeFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/source-of-income');
      },
      icon: 'success',
      message: 'Source of income created successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(addSourceOfIncomeSuccess());
  }
}

export function* editSourceOfIncomeHandler({ payload }) {
  yield put(editSourceOfIncomeRequested());

  const request = {
    method: 'PUT',
    params: {
      source_of_income_code: payload.source_of_income_code,
      source_of_income_description: payload.source_of_income_description,
      status: payload.status.value,
    },
    url: `update-sourceofincome/${payload.source_of_income_id}`,
  };
  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editSourceOfIncomeFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/source-of-income');
      },
      icon: 'success',
      message: 'Source of income updated successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(editSourceOfIncomeSuccess());
  }
}

export function* deleteSourceOfIncomeHandler({ payload }) {
  yield put(deleteSourceOfIncomeRequested());

  const request = {
    method: 'DELETE',
    url: `delete-sourceofincome/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteSourceOfIncomeFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'Source of income deleted successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(deleteSourceOfIncomeSuccess(payload));
  }
}

export function* fetchSourceOfIncomeHandler({ payload }) {
  yield put(fetchSourceOfIncomeRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-sourceofincome',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSourceOfIncomeFailure(error));
  } else {
    yield put(fetchSourceOfIncomeSuccess(data.data.result));
  }
}

export function* fetchSingleSourceOfIncomeHandler({ payload }) {
  yield put(fetchSingleSourceOfIncomeRequested());

  const request = {
    method: 'GET',
    url: `view-sourceofincome/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request, false);

  if (error) {
    yield put(fetchSingleSourceOfIncomeFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...data.data.result,
      id: result.source_of_income_id,
      status: result.status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      },
    };

    yield put(fetchSingleSourceOfIncomeSuccess(res));
  }
}

function* SourceOfIncome() {
  yield all([
    takeLatest(ADD_SOURCE_OF_INCOME, addSourceOfIncomeHandler),
    takeLatest(FETCH_SOURCE_OF_INCOME, fetchSourceOfIncomeHandler),
    takeLatest(DELETE_SOURCE_OF_INCOME, deleteSourceOfIncomeHandler),
    takeLatest(EDIT_SOURCE_OF_INCOME, editSourceOfIncomeHandler),
    takeLatest(FETCH_SINGLE_SOURCE_OF_INCOME, fetchSingleSourceOfIncomeHandler),
  ]);
}

export default SourceOfIncome;
