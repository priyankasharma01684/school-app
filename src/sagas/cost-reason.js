import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ADD_COST_OF_REASON,
  addCostOfReasonFailure,
  addCostOfReasonRequested,
  addCostOfReasonSuccess,
  DELETE_COST_OF_REASON,
  deleteCostOfReasonFailure,
  deleteCostOfReasonRequested,
  deleteCostOfReasonSuccess,
  FETCH_COST_OF_REASON,
  fetchCostOfReasonFailure,
  fetchCostOfReasonRequested,
  fetchCostOfReasonSuccess,
  FETCH_SINGLE_COST_OF_REASON,
  fetchSingleCostOfReasonFailure,
  fetchSingleCostOfReasonRequested,
  fetchSingleCostOfReasonSuccess,
  EDIT_COST_OF_REASON,
  editCostOfReasonFailure,
  editCostOfReasonRequested,
  editCostOfReasonSuccess } from '../actions/cost-reason-action-types';
import httpClient from './http-client';
import Alert from '../utility/alert';
import { history } from '../index';

export function* addCostOfReasonHandler({ payload }) {
  yield put(addCostOfReasonRequested());
  const body = new FormData();

  body.append('cost_reason_code', payload.cost_reason_code);
  body.append('cost_reason_label', payload.cost_reason_label);
  body.append('cost_item_id', payload.cost_item_id.value);
  body.append('status', payload.status.value);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-cost-reason',
  };
  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(addCostOfReasonFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/cost-reason');
      },
      icon: 'success',
      message: 'Cost of reason created successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(addCostOfReasonSuccess());
  }
}

export function* editCostOfReasonHandler({ payload }) {
  yield put(editCostOfReasonRequested());

  const request = {
    method: 'PUT',
    params: {
      cost_item_id: payload.cost_item_id.value,
      cost_reason_code: payload.cost_reason_code,
      cost_reason_label: payload.cost_reason_label,
      status: payload.status.value,
    },
    url: `update-cost-reason/${payload.cost_reason_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editCostOfReasonFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/cost-reason');
      },
      icon: 'success',
      message: 'Cost of reason updated successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
    yield put(editCostOfReasonSuccess());
  }
}

export function* deleteCostOfReasonHandler({ payload }) {
  yield put(deleteCostOfReasonRequested());

  const request = {
    method: 'DELETE',
    url: `delete-cost-reason/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteCostOfReasonFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'Cost of reason deleted successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(deleteCostOfReasonSuccess(payload));
  }
}

export function* fetchCostOfReasonHandler({ payload }) {
  yield put(fetchCostOfReasonRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-cost-reason',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchCostOfReasonFailure(error));
  } else {
    yield put(fetchCostOfReasonSuccess(data.data.result));
  }
}

export function* fetchSingleCostOfReasonHandler({ payload }) {
  yield put(fetchSingleCostOfReasonRequested());

  const request = {
    method: 'GET',
    url: `view-cost-reason/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleCostOfReasonFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...result,
      cost_item_id: {
        label: result.cost_item_label,
        value: result.cost_item_id,
      },
      id: result.cost_reason_id,
      status: result.status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      },
    };

    yield put(fetchSingleCostOfReasonSuccess(res));
  }
}

function* CostOfReason() {
  yield all([
    takeLatest(ADD_COST_OF_REASON, addCostOfReasonHandler),
    takeLatest(DELETE_COST_OF_REASON, deleteCostOfReasonHandler),
    takeLatest(FETCH_COST_OF_REASON, fetchCostOfReasonHandler),
    takeLatest(FETCH_SINGLE_COST_OF_REASON, fetchSingleCostOfReasonHandler),
    takeLatest(EDIT_COST_OF_REASON, editCostOfReasonHandler),
  ]);
}

export default CostOfReason;
