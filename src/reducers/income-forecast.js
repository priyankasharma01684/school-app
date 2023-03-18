import { LOCATION_CHANGE } from 'connected-react-router';
import { CREATE_INCOME_FORECAST_FAILURE,
  CREATE_INCOME_FORECAST_REQUESTED,
  CREATE_INCOME_FORECAST_SUCCESS,
  DELETE_INCOME_FORECAST_FAILURE,
  DELETE_INCOME_FORECAST_REQUESTED,
  DELETE_INCOME_FORECAST_SUCCESS,
  FETCH_INCOME_FORECAST_FAILURE,
  FETCH_INCOME_FORECAST_REQUESTED,
  FETCH_INCOME_FORECAST_SUCCESS,
  FETCH_SINGLE_INCOME_FORECAST_FAILURE,
  FETCH_SINGLE_INCOME_FORECAST_REQUESTED,
  FETCH_SINGLE_INCOME_FORECAST_SUCCESS,
  UPDATE_INCOME_FORECAST_FORM } from '../actions/income-forecast-action-types';

const initialState = {
  classes: [],
  createIncomeStatus: 'pending',
  deleteIncomeStatus: 'pending',
  fetchIncomesStatus: 'pending',
  fetchSingleIncomeStatus: 'pending',
  form: {
    amount: '',
    month: null,
    school_year_id: null,
  },
  income: [],
  totalAmount: 0,
};

export default function classes(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case CREATE_INCOME_FORECAST_FAILURE:
      return {
        ...state,
        createIncomeStatus: 'failure',
      };

    case CREATE_INCOME_FORECAST_REQUESTED:
      return {
        ...state,
        createIncomeStatus: 'creating',
      };

    case CREATE_INCOME_FORECAST_SUCCESS:
      return {
        ...state,
        createIncomeStatus: 'success',
      };

    case DELETE_INCOME_FORECAST_FAILURE:
      return {
        ...state,
        deleteIncomeStatus: 'failure',
      };

    case DELETE_INCOME_FORECAST_REQUESTED:
      return {
        ...state,
        deleteIncomeStatus: 'deleting',
      };

    case DELETE_INCOME_FORECAST_SUCCESS: {
      const list = [...state.income];
      const isExist = list.find((income) => income.income_forecaste_id.toString() === payload.toString());

      return {
        ...state,
        deleteIncomeStatus: 'success',
        income: list.filter((income) => income.income_forecaste_id.toString() !== payload.toString()),
        totalAmount: isExist && state.totalAmount ? (state.totalAmount - parseFloat(isExist.amount)) : state.totalAmount,
      };
    }

    case FETCH_INCOME_FORECAST_FAILURE:
      return {
        ...state,
        fetchIncomesStatus: 'failure',
      };

    case FETCH_INCOME_FORECAST_REQUESTED:
      return {
        ...state,
        fetchIncomesStatus: 'fetching',
      };

    case FETCH_INCOME_FORECAST_SUCCESS:
      return {
        ...state,
        fetchIncomesStatus: 'success',
        income: payload.result,
        totalAmount: payload.total_amount,
      };

    case FETCH_SINGLE_INCOME_FORECAST_FAILURE:
      return {
        ...state,
        fetchSingleIncomeStatus: 'failure',
      };

    case FETCH_SINGLE_INCOME_FORECAST_REQUESTED:
      return {
        ...state,
        fetchSingleIncomeStatus: 'fetching',
      };

    case FETCH_SINGLE_INCOME_FORECAST_SUCCESS:
      return {
        ...state,
        fetchSingleIncomeStatus: 'success',
        form: {
          ...state.form,
          ...payload,
        },
      };

    case UPDATE_INCOME_FORECAST_FORM:
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
