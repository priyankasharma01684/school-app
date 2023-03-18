import moment from 'moment';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_INSTALLMENT,
  createInstallmentFailure,
  createInstallmentRequested,
  createInstallmentSuccess,
  DELETE_INSTALLMENT,
  deleteInstallmentFailure,
  deleteInstallmentRequested,
  deleteInstallmentSuccess,
  EDIT_INSTALLMENT,
  editInstallmentFailure,
  editInstallmentRequested,
  editInstallmentSuccess,
  FETCH_SINGLE_INSTALLMENT,
  fetchSingleInstallmentFailure,
  fetchSingleInstallmentRequested,
  fetchSingleInstallmentSuccess,
  FETCH_INSTALLMENT,
  fetchInstallmentFailure,
  fetchInstallmentRequested,
  fetchInstallmentSuccess } from '../actions/installment-action-type';
import httpClient from './http-client';
import Alert from '../utility/alert';
import { history } from '../index';

export function* createInstallmentHandler({ payload }) {
  yield put(createInstallmentRequested());
  const body = new FormData();

  body.append('school_year_id', payload.school_year_id.value);
  body.append('grade_id', payload.grade_id.value);
  body.append('amount_to_pay', payload.amount_to_pay);
  body.append('deadline_installment', moment(payload.deadline_installment).format('MM/DD/yyyy').toString());
  body.append('installment', payload.installment);
  body.append('number_of_days_before_late_payment', payload.number_of_days_before_late_payment);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-installment',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createInstallmentFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/installments');
      },
      icon: 'success',
      message: 'Installment created successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(createInstallmentSuccess());
  }
}

export function* editInstallmentHandler({ payload }) {
  yield put(editInstallmentRequested());

  const request = {
    method: 'PUT',
    params: {
      amount_to_pay: payload.amount_to_pay,
      deadline_installment: moment(payload.deadline_installment).format('MM/DD/yyyy').toString(),
      grade_id: payload.grade_id.value,
      installment: payload.installment,
      number_of_days_before_late_payment: payload.number_of_days_before_late_payment,
      school_year_id: payload.school_year_id.value,
    },
    url: `update-installment/${payload.installment_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editInstallmentFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/installments');
      },
      icon: 'success',
      message: 'Installment updated successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(editInstallmentSuccess());
  }
}

export function* deleteInstallmentHandler({ payload }) {
  yield put(deleteInstallmentRequested());

  const request = {
    method: 'DELETE',
    url: `delete-installment/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteInstallmentFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'Installment deleted successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(deleteInstallmentSuccess(payload));
  }
}

export function* fetchInstallmentHandler({ payload }) {
  yield put(fetchInstallmentRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-installment',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchInstallmentFailure(error));
  } else {
    yield put(fetchInstallmentSuccess(data.data.result));
  }
}

export function* fetchSingleInstallmentHandler({ payload }) {
  yield put(fetchSingleInstallmentRequested());

  const request = {
    method: 'GET',
    url: `view-installment/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleInstallmentFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...data.data.result,
      deadline_installment: moment(result.deadline_installment, 'X').toDate(),
      grade_id: {
        label: result.grade_name,
        value: result.grade_id,
      },
      id: result.Installment_id,
      school_year_id: {
        label: `${result.school_start_year} / ${result.school_end_year}`,
        value: result.school_year_id,
      },

    };

    yield put(fetchSingleInstallmentSuccess(res));
  }
}

function* Installments() {
  yield all([
    takeLatest(CREATE_INSTALLMENT, createInstallmentHandler),
    takeLatest(DELETE_INSTALLMENT, deleteInstallmentHandler),
    takeLatest(EDIT_INSTALLMENT, editInstallmentHandler),
    takeLatest(FETCH_INSTALLMENT, fetchInstallmentHandler),
    takeLatest(FETCH_SINGLE_INSTALLMENT, fetchSingleInstallmentHandler),
  ]);
}

export default Installments;
