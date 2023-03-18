import { LOCATION_CHANGE } from 'connected-react-router';
import { ADD_INCOME_REASON_FAILURE,
  ADD_INCOME_REASON_REQUESTED,
  ADD_INCOME_REASON_SUCCESS,
  DELETE_INCOME_REASON_FAILURE,
  DELETE_INCOME_REASON_REQUESTED,
  DELETE_INCOME_REASON_SUCCESS,
  FETCH_INCOME_REASON_FAILURE,
  FETCH_INCOME_REASON_REQUESTED,
  FETCH_INCOME_REASON_SUCCESS,
  FETCH_SINGLE_INCOME_REASON_FAILURE,
  FETCH_SINGLE_INCOME_REASON_REQUESTED,
  FETCH_SINGLE_INCOME_REASON_SUCCESS,
  UPDATE_INCOME_REASON_FORM } from '../actions/income-reason-action-types';

const initialState = {
  addIncomeReasonStatus: 'pending',
  deleteIncomeReasonStatus: 'pending',
  fetchIncomeReasonStatus: 'pending',
  fetchSingleIncomeReasonStatus: 'pending',
  form: {
    income_reason_code: '',
    income_reason_description: '',
    source_of_income_id: '',
    status: null,
  },
  incomeReason: [],
};

export default function incomeReason(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case ADD_INCOME_REASON_FAILURE:
      return {
        ...state,
        addIncomeReasonStatus: 'failure',
      };

    case ADD_INCOME_REASON_REQUESTED:
      return {
        ...state,
        addIncomeReasonStatus: 'creating',
      };

    case ADD_INCOME_REASON_SUCCESS:
      return {
        ...state,
        addIncomeReasonStatus: 'success',
      };

    case DELETE_INCOME_REASON_FAILURE:
      return {
        ...state,
        deleteIncomeReasonStatus: 'failure',
      };

    case DELETE_INCOME_REASON_REQUESTED:
      return {
        ...state,
        deleteIncomeReasonStatus: 'deleting',
      };

    case DELETE_INCOME_REASON_SUCCESS:
      return {
        ...state,
        deleteIncomeReasonStatus: 'success',
        incomeReason: [...state.incomeReason].filter((income) => income.income_reason_id.toString() !== payload.toString()),
      };

    case FETCH_INCOME_REASON_FAILURE:
      return {
        ...state,
        fetchIncomeReasonStatus: 'failure',
      };

    case FETCH_INCOME_REASON_REQUESTED:
      return {
        ...state,
        fetchIncomeReasonStatus: 'fetching',
      };

    case FETCH_INCOME_REASON_SUCCESS:
      return {
        ...state,
        fetchIncomeReasonStatus: 'success',
        incomeReason: payload,
      };

    case FETCH_SINGLE_INCOME_REASON_FAILURE:
      return {
        ...state,
        fetchSingleIncomeReasonStatus: 'failure',
      };

    case FETCH_SINGLE_INCOME_REASON_REQUESTED:
      return {
        ...state,
        fetchSingleIncomeReasonStatus: 'fetching',
      };

    case FETCH_SINGLE_INCOME_REASON_SUCCESS:
      return {
        ...state,
        fetchSingleIncomeReasonStatus: 'success',
        form: {
          ...state.form,
          ...payload,
        },
      };
    case UPDATE_INCOME_REASON_FORM:
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
