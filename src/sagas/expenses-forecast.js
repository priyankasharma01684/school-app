import { all, call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { CREATE_EXPENSES_FORECAST,
  createExpensesForecastFailure,
  createExpensesForecastRequested,
  createExpensesForecastSuccess,
  DELETE_EXPENSES_FORECAST,
  deleteExpensesForecastFailure,
  deleteExpensesForecastRequested,
  deleteExpensesForecastSuccess,
  EDIT_EXPENSES_FORECAST,
  editExpensesForecastFailure,
  editExpensesForecastRequested,
  editExpensesForecastSuccess,
  FETCH_SINGLE_EXPENSES_FORECAST,
  fetchSingleExpensesForecastFailure,
  fetchSingleExpensesForecastRequested,
  fetchSingleExpensesForecastSuccess,
  FETCH_EXPENSES_FORECAST,
  fetchExpensesForecastFailure,
  fetchExpensesForecastRequested,
  fetchExpensesForecastSuccess } from '../actions/expenses-forecast-action-types';
import httpClient from './http-client';
import Alert from '../utility/alert';
import { history } from '../index';

export function* createExpenseForecastHandler({ payload }) {
  yield put(createExpensesForecastRequested());
  const body = new FormData();

  body.append('school_year_id', payload.school_year_id.value);
  body.append('month', payload.month.value);
  body.append('amount', payload.amount);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-expenses-forecaste',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createExpensesForecastFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/expenses-forecast');
      },
      icon: 'success',
      message: 'Forecast created successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(createExpensesForecastSuccess());
  }
}

export function* editExpenseForecastHandler({ payload }) {
  yield put(editExpensesForecastRequested());

  const request = {
    method: 'PUT',
    params: {
      amount: payload.amount,
      month: payload.month.value,
      school_year_id: payload.school_year_id.value,
    },
    url: `update-expenses-forecaste/${payload.publicId}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editExpensesForecastFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/expenses-forecast');
      },
      icon: 'success',
      message: 'Forecast updated successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(editExpensesForecastSuccess());
  }
}

export function* deleteExpenseForecastHandler({ payload }) {
  yield put(deleteExpensesForecastRequested());

  const request = {
    method: 'DELETE',
    url: `delete-expenses-forecaste/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteExpensesForecastFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'Forecast deleted successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(deleteExpensesForecastSuccess(payload));
  }
}

export function* fetchExpenseForecastHandler({ payload }) {
  yield put(fetchExpensesForecastRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-expenses-forecaste',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchExpensesForecastFailure(error));
  } else {
    yield put(fetchExpensesForecastSuccess(data.data));
  }
}

export function* fetchSingleExpenseForecastHandler({ payload }) {
  yield put(fetchSingleExpensesForecastRequested());

  const request = {
    method: 'GET',
    url: `view-expenses-forecaste/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleExpensesForecastFailure(error));
  } else {
    const { data: result } = data;
    const response = {
      ...result,
      amount: parseFloat(result.amount),
      month: {
        label: result.month,
        value: result.month,
      },
      school_year_id: {
        label: `From ${moment(result.back_to_school_date).format('MMM yyyy')} to ${moment(result.school_year_end_date).format('MMM yyyy')}`,
        value: result.school_year_id,
      },
    };

    yield put(fetchSingleExpensesForecastSuccess(response));
  }
}

function* expensesForecast() {
  yield all([
    takeLatest(CREATE_EXPENSES_FORECAST, createExpenseForecastHandler),
    takeLatest(DELETE_EXPENSES_FORECAST, deleteExpenseForecastHandler),
    takeLatest(EDIT_EXPENSES_FORECAST, editExpenseForecastHandler),
    takeLatest(FETCH_EXPENSES_FORECAST, fetchExpenseForecastHandler),
    takeLatest(FETCH_SINGLE_EXPENSES_FORECAST, fetchSingleExpenseForecastHandler),
  ]);
}

export default expensesForecast;
