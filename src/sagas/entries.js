import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_ENTRIES,
  createEntriesFailure,
  createEntriesRequested,
  createEntriesSuccess,
  DELETE_ENTRIES,
  deleteEntriesFailure,
  deleteEntriesRequested,
  deleteEntriesSuccess,
  EDIT_ENTRIES,
  editEntriesFailure,
  editEntriesRequested,
  editEntriesSuccess,
  FETCH_SINGLE_ENTRIES,
  fetchSingleEntriesFailure,
  fetchSingleEntriesRequested,
  fetchSingleEntriesSuccess,
  FETCH_ENTRIES,
  fetchEntriesFailure,
  fetchEntriesRequested,
  fetchEntriesSuccess, 
  FETCH_DAILY_ENTRIES,
  fetchDailyEntriesFailure,
  fetchDailyEntriesRequested,
  fetchDailyEntriesSuccess  } from '../actions/entries-action-type';
import httpClient from './http-client';
import Alert from '../utility/alert';
import { history } from '../index';

export function* createEntriesHandler({ payload }) {
  yield put(createEntriesRequested());
  const body = new FormData();

  body.append('student_id', payload.student_id.value);
  body.append('amount', payload.amount);
  body.append('bank_name', payload.bank_name);
  body.append('comment', payload.comment);
  body.append('income_reason_id', payload.income_reason_id.value);
  body.append('paid_by', payload.paid_by);
  body.append('payment_type_id', payload.payment_type_id.value);
  body.append('receipt_number', payload.receipt_number);
  body.append('status', payload.status.value);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-entries',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createEntriesFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/entries');
      },
      icon: 'success',
      message: 'Entries created successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(createEntriesSuccess());
  }
}

export function* editEntriesHandler({ payload }) {
  yield put(editEntriesRequested());

  const request = {
    method: 'PUT',
    params: {
      amount: payload.amount,
      bank_name: payload.bank_name,
      comment: payload.comment,
      income_reason_id: payload.income_reason_id.value,
      paid_by: payload.paid_by,
      payment_type_id: payload.payment_type_id.value,
      receipt_number: payload.receipt_number,
      status: payload.status.value,
      student_id: payload.student_id.value,
    },
    url: `update-entries/${payload.entry_reason_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editEntriesFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/entries');
      },
      icon: 'success',
      message: 'Entries updated successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(editEntriesSuccess());
  }
}

export function* deleteEntriesHandler({ payload }) {
  yield put(deleteEntriesRequested());

  const request = {
    method: 'DELETE',
    url: `delete-entries/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteEntriesFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'Entries deleted successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(deleteEntriesSuccess(payload));
  }
}

export function* fetchEntriesHandler({ payload }) {
  yield put(fetchEntriesRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-entries',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchEntriesFailure(error));
  } else {
    yield put(fetchEntriesSuccess(data.data.result));
  }
}

export function* fetchDailyEntriesHandler({ payload }) {
  yield put(fetchDailyEntriesRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'daily-report-entries',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchDailyEntriesFailure(error));
  } else {
    yield put(fetchDailyEntriesSuccess(data.data.result));
  }
}

export function* fetchSingleEntriesHandler({ payload }) {
  yield put(fetchSingleEntriesRequested());

  const request = {
    method: 'GET',
    url: `view-entries/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleEntriesFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...data.data.result,
      id: result.entry_reason_id,
      income_reason_id: {
        label: result.income_reason_description,
        value: result.income_reason_id,
      },
      payment_type_id: {
        label: result.payment_type_id,
        value: result.payment_type_id,
      },
      status: result.status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      },
      student_id: {
        label: result.student_first_name,
        value: result.student_id,
      },
    };

    yield put(fetchSingleEntriesSuccess(res));
  }
}

function* Entries() {
  yield all([
    takeLatest(CREATE_ENTRIES, createEntriesHandler),
    takeLatest(DELETE_ENTRIES, deleteEntriesHandler),
    takeLatest(EDIT_ENTRIES, editEntriesHandler),
    takeLatest(FETCH_DAILY_ENTRIES, fetchDailyEntriesHandler),
    takeLatest(FETCH_ENTRIES, fetchEntriesHandler),
    takeLatest(FETCH_SINGLE_ENTRIES, fetchSingleEntriesHandler),
  ]);
}

export default Entries;
