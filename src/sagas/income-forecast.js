import { all, call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { CREATE_INCOME_FORECAST,
  createIncomeForecastFailure,
  createIncomeForecastRequested,
  createIncomeForecastSuccess,
  DELETE_INCOME_FORECAST,
  deleteIncomeForecastFailure,
  deleteIncomeForecastRequested,
  deleteIncomeForecastSuccess,
  EDIT_INCOME_FORECAST,
  editIncomeForecastFailure,
  editIncomeForecastRequested,
  editIncomeForecastSuccess,
  FETCH_SINGLE_INCOME_FORECAST,
  fetchSingleIncomeForecastFailure,
  fetchSingleIncomeForecastRequested,
  fetchSingleIncomeForecastSuccess,
  FETCH_INCOME_FORECAST,
  fetchIncomeForecastFailure,
  fetchIncomeForecastRequested,
  fetchIncomeForecastSuccess } from '../actions/income-forecast-action-types';
import httpClient from './http-client';
import Alert from '../utility/alert';
import { history } from '../index';

export function* createIncomeForecastHandler({ payload }) {
  yield put(createIncomeForecastRequested());
  const body = new FormData();

  body.append('school_year_id', payload.school_year_id.value);
  body.append('month', payload.month.value);
  body.append('amount', payload.amount);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-income-forecaste',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createIncomeForecastFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/income-forecast');
      },
      icon: 'success',
      message: 'Forecast created successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(createIncomeForecastSuccess());
  }
}

export function* editIncomeForecastHandler({ payload }) {
  yield put(editIncomeForecastRequested());

  const request = {
    method: 'PUT',
    params: {
      amount: payload.amount,
      month: payload.month.value,
      school_year_id: payload.school_year_id.value,
    },
    url: `update-income-forecaste/${payload.publicId}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editIncomeForecastFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/income-forecast');
      },
      icon: 'success',
      message: 'Forecast updated successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(editIncomeForecastSuccess());
  }
}

export function* deleteIncomeForecastHandler({ payload }) {
  yield put(deleteIncomeForecastRequested());

  const request = {
    method: 'DELETE',
    url: `delete-income-forecaste/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteIncomeForecastFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'Forecast deleted successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(deleteIncomeForecastSuccess(payload));
  }
}

export function* fetchIncomeForecastHandler({ payload }) {
  yield put(fetchIncomeForecastRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-income-forecaste',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchIncomeForecastFailure(error));
  } else {
    yield put(fetchIncomeForecastSuccess(data.data));
  }
}

export function* fetchSingleIncomeForecastHandler({ payload }) {
  yield put(fetchSingleIncomeForecastRequested());

  const request = {
    method: 'GET',
    url: `view-income-forecaste/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleIncomeForecastFailure(error));
  } else {
    const { result } = data.data;
    const response = {
      ...result,
      amount: parseFloat(result.amount),
      month: {
        label: result.month,
        value: result.month,
      },
      school_year_id: {
        label: `From ${moment(result.back_to_school_date, 'X').format('MMM yyyy')} to ${moment(result.school_year_end_date, 'X').format('MMM yyyy')}`,
        value: result.school_year_id,
      },
    };

    yield put(fetchSingleIncomeForecastSuccess(response));
  }
}

function* incomeForecast() {
  yield all([
    takeLatest(CREATE_INCOME_FORECAST, createIncomeForecastHandler),
    takeLatest(DELETE_INCOME_FORECAST, deleteIncomeForecastHandler),
    takeLatest(EDIT_INCOME_FORECAST, editIncomeForecastHandler),
    takeLatest(FETCH_INCOME_FORECAST, fetchIncomeForecastHandler),
    takeLatest(FETCH_SINGLE_INCOME_FORECAST, fetchSingleIncomeForecastHandler),
  ]);
}

export default incomeForecast;
