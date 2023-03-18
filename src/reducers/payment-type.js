import { LOCATION_CHANGE } from 'connected-react-router';
import { CREATE_PAYMENT_TYPE_FAILURE,
  CREATE_PAYMENT_TYPE_REQUESTED,
  CREATE_PAYMENT_TYPE_SUCCESS,
  DELETE_PAYMENT_TYPE_FAILURE,
  DELETE_PAYMENT_TYPE_REQUESTED,
  DELETE_PAYMENT_TYPE_SUCCESS,
  FETCH_SINGLE_PAYMENT_TYPE_FAILURE,
  FETCH_SINGLE_PAYMENT_TYPE_REQUESTED,
  FETCH_SINGLE_PAYMENT_TYPE_SUCCESS,
  FETCH_PAYMENT_TYPE_FAILURE,
  FETCH_PAYMENT_TYPE_REQUESTED,
  FETCH_PAYMENT_TYPE_SUCCESS,
  UPDATE_PAYMENT_TYPE_FORM } from '../actions/payment-type-action-type';

const initialState = {
  createPaymentTypeStatus: 'pending',
  deletePaymentTypeStatus: 'pending',
  fetchPaymentTypeStatus: 'pending',
  fetchSinglePaymentTypeStatus: 'pending',
  form: {
    payment_type_code: '',
    payment_type_label: '',
    status: null,
  },
  paymentType: [],
};

export default function paymentType(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case CREATE_PAYMENT_TYPE_FAILURE:
      return {
        ...state,
        createPaymentTypeStatus: 'failure',
      };

    case CREATE_PAYMENT_TYPE_REQUESTED:
      return {
        ...state,
        createPaymentTypeStatus: 'creating',
      };

    case CREATE_PAYMENT_TYPE_SUCCESS:
      return {
        ...state,
        createPaymentTypeStatus: 'success',
      };

    case DELETE_PAYMENT_TYPE_FAILURE:
      return {
        ...state,
        deletePaymentTypeStatus: 'failure',
      };

    case DELETE_PAYMENT_TYPE_REQUESTED:
      return {
        ...state,
        deletePaymentTypeStatus: 'deleting',
      };

    case DELETE_PAYMENT_TYPE_SUCCESS:
      return {
        ...state,
        deletePaymentTypeStatus: 'success',
        paymentType: [...state.paymentType].filter((pType) => pType.payment_type_id.toString() !== payload.toString()),
      };

    case FETCH_PAYMENT_TYPE_FAILURE:
      return {
        ...state,
        fetchPaymentTypeStatus: 'failure',
      };

    case FETCH_PAYMENT_TYPE_REQUESTED:
      return {
        ...state,
        fetchPaymentTypeStatus: 'fetching',
      };

    case FETCH_PAYMENT_TYPE_SUCCESS:
      return {
        ...state,
        fetchPaymentTypeStatus: 'success',
        paymentType: payload,
      };

    case FETCH_SINGLE_PAYMENT_TYPE_FAILURE:
      return {
        ...state,
        fetchSinglePaymentTypeStatus: 'failure',
      };

    case FETCH_SINGLE_PAYMENT_TYPE_REQUESTED:
      return {
        ...state,
        fetchSinglePaymentTypeStatus: 'fetching',
      };

    case FETCH_SINGLE_PAYMENT_TYPE_SUCCESS:
      return {
        ...state,
        fetchSinglePaymentTypeStatus: 'success',
        form: {
          ...state.form,
          ...payload,
        },
      };

    case UPDATE_PAYMENT_TYPE_FORM:
      return {
        ...state,
        form: payload,
      };

    case LOCATION_CHANGE:
      return { ...initialState };

    default:
      return state;
  }
}
