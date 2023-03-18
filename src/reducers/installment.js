import { LOCATION_CHANGE } from 'connected-react-router';
import { CREATE_INSTALLMENT_FAILURE,
  CREATE_INSTALLMENT_REQUESTED,
  CREATE_INSTALLMENT_SUCCESS,
  DELETE_INSTALLMENT_FAILURE,
  DELETE_INSTALLMENT_REQUESTED,
  DELETE_INSTALLMENT_SUCCESS,
  FETCH_SINGLE_INSTALLMENT_FAILURE,
  FETCH_SINGLE_INSTALLMENT_REQUESTED,
  FETCH_SINGLE_INSTALLMENT_SUCCESS,
  FETCH_INSTALLMENT_FAILURE,
  FETCH_INSTALLMENT_REQUESTED,
  FETCH_INSTALLMENT_SUCCESS,
  UPDATE_INSTALLMENT_FORM } from '../actions/installment-action-type';

const initialState = {
  createInstallmentStatus: 'pending',
  deleteInstallmentStatus: 'pending',
  fetchInstallmentsStatus: 'pending',
  fetchSingleInstallmentStatus: 'pending',
  form: {
    amount_to_pay: '',
    deadline_installment: null,
    grade_id: '',
    installment: '',
    number_of_days_before_late_payment: '',
    school_year_id: '',
  },
  installments: [],
};

export default function installments(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case CREATE_INSTALLMENT_FAILURE:
      return {
        ...state,
        createInstallmentStatus: 'failure',
      };

    case CREATE_INSTALLMENT_REQUESTED:
      return {
        ...state,
        createInstallmentStatus: 'creating',
      };

    case CREATE_INSTALLMENT_SUCCESS:
      return {
        ...state,
        createInstallmentStatus: 'success',
      };

    case DELETE_INSTALLMENT_FAILURE:
      return {
        ...state,
        deleteInstallmentStatus: 'failure',
      };

    case DELETE_INSTALLMENT_REQUESTED:
      return {
        ...state,
        deleteInstallmentStatus: 'deleting',
      };

    case DELETE_INSTALLMENT_SUCCESS:
      return {
        ...state,
        deleteInstallmentStatus: 'success',
        installments: [...state.installments].filter((installment) => installment.installment_id.toString() !== payload.toString()),
      };

    case FETCH_INSTALLMENT_FAILURE:
      return {
        ...state,
        fetchInstallmentsStatus: 'failure',
      };

    case FETCH_INSTALLMENT_REQUESTED:
      return {
        ...state,
        fetchInstallmentsStatus: 'fetching',
      };

    case FETCH_INSTALLMENT_SUCCESS:
      return {
        ...state,
        fetchInstallmentsStatus: 'success',
        installments: payload,
      };

    case FETCH_SINGLE_INSTALLMENT_FAILURE:
      return {
        ...state,
        fetchSingleInstallmentStatus: 'failure',
      };

    case FETCH_SINGLE_INSTALLMENT_REQUESTED:
      return {
        ...state,
        fetchSingleInstallmentStatus: 'fetching',
      };

    case FETCH_SINGLE_INSTALLMENT_SUCCESS:
      return {
        ...state,
        fetchSingleInstallmentStatus: 'success',
        form: {
          ...state.form,
          ...payload,
        },
      };

    case UPDATE_INSTALLMENT_FORM:
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
