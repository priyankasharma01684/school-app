import { LOCATION_CHANGE } from 'connected-react-router';
import { CREATE_EXPENSES_FORECAST_FAILURE,
  CREATE_EXPENSES_FORECAST_REQUESTED,
  CREATE_EXPENSES_FORECAST_SUCCESS,
  DELETE_EXPENSES_FORECAST_FAILURE,
  DELETE_EXPENSES_FORECAST_REQUESTED,
  DELETE_EXPENSES_FORECAST_SUCCESS,
  FETCH_EXPENSES_FORECAST_FAILURE,
  FETCH_EXPENSES_FORECAST_REQUESTED,
  FETCH_EXPENSES_FORECAST_SUCCESS,
  FETCH_SINGLE_EXPENSES_FORECAST_FAILURE,
  FETCH_SINGLE_EXPENSES_FORECAST_REQUESTED,
  FETCH_SINGLE_EXPENSES_FORECAST_SUCCESS,
  UPDATE_EXPENSES_FORECAST_FORM } from '../actions/expenses-forecast-action-types';

const initialState = {
  classes: [],
  createExpenseStatus: 'pending',
  deleteExpenseStatus: 'pending',
  expenses: [],
  fetchExpensesStatus: 'pending',
  fetchSingleExpenseStatus: 'pending',
  form: {
    amount: '',
    month: null,
    school_year_id: null,
  },
  totalAmount: 0,
};

export default function classes(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case CREATE_EXPENSES_FORECAST_FAILURE:
      return {
        ...state,
        createExpenseStatus: 'failure',
      };

    case CREATE_EXPENSES_FORECAST_REQUESTED:
      return {
        ...state,
        createExpenseStatus: 'creating',
      };

    case CREATE_EXPENSES_FORECAST_SUCCESS:
      return {
        ...state,
        createExpenseStatus: 'success',
      };

    case DELETE_EXPENSES_FORECAST_FAILURE:
      return {
        ...state,
        deleteExpenseStatus: 'failure',
      };

    case DELETE_EXPENSES_FORECAST_REQUESTED:
      return {
        ...state,
        deleteExpenseStatus: 'deleting',
      };

    case DELETE_EXPENSES_FORECAST_SUCCESS: {
      const list = [...state.expenses];
      const isExist = list.find((expense) => expense.expenses_forecaste_id.toString() === payload.toString());

      return {
        ...state,
        deleteExpenseStatus: 'success',
        expenses: list.filter((expense) => expense.expenses_forecaste_id.toString() !== payload.toString()),
        totalAmount: isExist ? (state.totalAmount - parseFloat(isExist.amount)) : state.totalAmount,
      };
    }

    case FETCH_EXPENSES_FORECAST_FAILURE:
      return {
        ...state,
        fetchExpensesStatus: 'failure',
      };

    case FETCH_EXPENSES_FORECAST_REQUESTED:
      return {
        ...state,
        fetchExpensesStatus: 'fetching',
      };

    case FETCH_EXPENSES_FORECAST_SUCCESS:
      return {
        ...state,
        expenses: payload.result,
        fetchExpensesStatus: 'success',
        totalAmount: payload.total_amount,
      };

    case FETCH_SINGLE_EXPENSES_FORECAST_FAILURE:
      return {
        ...state,
        fetchSingleExpenseStatus: 'failure',
      };

    case FETCH_SINGLE_EXPENSES_FORECAST_REQUESTED:
      return {
        ...state,
        fetchSingleExpenseStatus: 'fetching',
      };

    case FETCH_SINGLE_EXPENSES_FORECAST_SUCCESS:
      return {
        ...state,
        fetchSingleExpenseStatus: 'success',
        form: {
          ...state.form,
          ...payload,
        },
      };

    case UPDATE_EXPENSES_FORECAST_FORM:
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
