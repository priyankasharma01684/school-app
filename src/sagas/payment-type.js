import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_PAYMENT_TYPE,
  createPaymentTypeFailure,
  createPaymentTypeRequested,
  createPaymentTypeSuccess,
  DELETE_PAYMENT_TYPE,
  deletePaymentTypeFailure,
  deletePaymentTypeRequested,
  deletePaymentTypeSuccess,
  EDIT_PAYMENT_TYPE,
  editPaymentTypeFailure,
  editPaymentTypeRequested,
  editPaymentTypeSuccess,
  FETCH_SINGLE_PAYMENT_TYPE,
  fetchSinglePaymentTypeFailure,
  fetchSinglePaymentTypeRequested,
  fetchSinglePaymentTypeSuccess,
  FETCH_PAYMENT_TYPE,
  fetchPaymentTypeFailure,
  fetchPaymentTypeRequested,
  fetchPaymentTypeSuccess } from '../actions/payment-type-action-type';
import httpClient from './http-client';
import Alert from '../utility/alert';
import { history } from '../index';

export function* createPaymentTypeHandler({ payload }) {
  yield put(createPaymentTypeRequested());
  const body = new FormData();

  body.append('payment_type_code', payload.payment_type_code);
  body.append('payment_type_label', payload.payment_type_label);
  body.append('status', payload.status.value);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-payment-type',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createPaymentTypeFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/payment-types');
      },
      icon: 'success',
      message: 'Payment type created successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(createPaymentTypeSuccess());
  }
}

export function* fetchPaymentTypeHandler({ payload }) {
  yield put(fetchPaymentTypeRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-payment-type',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchPaymentTypeFailure(error));
  } else {
    yield put(fetchPaymentTypeSuccess(data.data.result));
  }
}

export function* editPaymentTypeHandler({ payload }) {
  yield put(editPaymentTypeRequested());

  const request = {
    method: 'PUT',
    params: {
      payment_type_code: payload.payment_type_code,
      payment_type_label: payload.payment_type_label,
      status: payload.status.value,
    },
    url: `update-payment-type/${payload.payment_type_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editPaymentTypeFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/payment-types');
      },
      icon: 'success',
      message: 'Payment type updated successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(editPaymentTypeSuccess());
  }
}

export function* deletePaymentTypeHandler({ payload }) {
  yield put(deletePaymentTypeRequested());

  const request = {
    method: 'DELETE',
    url: `delete-payment-type/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deletePaymentTypeFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'Payment type deleted successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(deletePaymentTypeSuccess(payload));
  }
}

export function* fetchSinglePaymentTypeHandler({ payload }) {
  yield put(fetchSinglePaymentTypeRequested());

  const request = {
    method: 'GET',
    url: `view-payment-type/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSinglePaymentTypeFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...data.data.result,
      id: result.payment_type_id,
      status: result.status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      },
    };

    yield put(fetchSinglePaymentTypeSuccess(res));
  }
}

function* PaymentTypes() {
  yield all([
    takeLatest(CREATE_PAYMENT_TYPE, createPaymentTypeHandler),
    takeLatest(DELETE_PAYMENT_TYPE, deletePaymentTypeHandler),
    takeLatest(EDIT_PAYMENT_TYPE, editPaymentTypeHandler),
    takeLatest(FETCH_PAYMENT_TYPE, fetchPaymentTypeHandler),
    takeLatest(FETCH_SINGLE_PAYMENT_TYPE, fetchSinglePaymentTypeHandler),
  ]);
}

export default PaymentTypes;
