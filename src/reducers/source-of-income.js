import { LOCATION_CHANGE } from 'connected-react-router';
import { ADD_SOURCE_OF_INCOME_FAILURE,
  ADD_SOURCE_OF_INCOME_REQUESTED,
  ADD_SOURCE_OF_INCOME_SUCCESS,
  DELETE_SOURCE_OF_INCOME_FAILURE,
  DELETE_SOURCE_OF_INCOME_REQUESTED,
  DELETE_SOURCE_OF_INCOME_SUCCESS,
  FETCH_SOURCE_OF_INCOME_FAILURE,
  FETCH_SOURCE_OF_INCOME_REQUESTED,
  FETCH_SOURCE_OF_INCOME_SUCCESS,
  FETCH_SINGLE_SOURCE_OF_INCOME_FAILURE,
  FETCH_SINGLE_SOURCE_OF_INCOME_REQUESTED,
  FETCH_SINGLE_SOURCE_OF_INCOME_SUCCESS,
  UPDATE_SOURCE_OF_INCOME } from '../actions/source-of-income-action-type';

const initialState = {
  addSourceOfIncomeStatus: 'pending',
  deleteSourceOfIncomeStatus: 'pending',
  fetchSingleSourceOfIncomeStatus: 'pending',
  fetchSourceOfIncomeStatus: 'pending',
  form: {
    source_of_income_code: '',
    source_of_income_description: '',
    status: '',
  },
  sourceofincome: [],
};

export default function sourceOfIncome(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case ADD_SOURCE_OF_INCOME_FAILURE:
      return {
        ...state,
        addSourceOfIncomeStatus: 'failure',
      };

    case ADD_SOURCE_OF_INCOME_REQUESTED:
      return {
        ...state,
        addSourceOfIncomeStatus: 'creating',
      };

    case ADD_SOURCE_OF_INCOME_SUCCESS:
      return {
        ...state,
        addSourceOfIncomeStatus: 'success',
      };

    case DELETE_SOURCE_OF_INCOME_FAILURE:
      return {
        ...state,
        deleteSourceOfIncomeStatus: 'failure',
      };

    case DELETE_SOURCE_OF_INCOME_REQUESTED:
      return {
        ...state,
        deleteSourceOfIncomeStatus: 'deleting',
      };

    case DELETE_SOURCE_OF_INCOME_SUCCESS:
      return {
        ...state,
        deleteSourceOfIncomeStatus: 'success',
        sourceofincome: [...state.sourceofincome].filter((source) => source.source_of_income_id.toString() !== payload.toString()),
      };
    case FETCH_SOURCE_OF_INCOME_FAILURE:
      return {
        ...state,
        fetchSourceOfIncomeStatus: 'failure',
      };

    case FETCH_SOURCE_OF_INCOME_REQUESTED:
      return {
        ...state,
        fetchSourceOfIncomeStatus: 'fetching',
      };

    case FETCH_SOURCE_OF_INCOME_SUCCESS:
      return {
        ...state,
        fetchSourceOfIncomeStatus: 'success',
        sourceofincome: payload,
      };

    case FETCH_SINGLE_SOURCE_OF_INCOME_FAILURE:
      return {
        ...state,
        fetchSingleSourceOfIncomeStatus: 'failure',
      };

    case FETCH_SINGLE_SOURCE_OF_INCOME_REQUESTED:
      return {
        ...state,
        fetchSingleSourceOfIncomeStatus: 'fetching',
      };

    case FETCH_SINGLE_SOURCE_OF_INCOME_SUCCESS:
      return {
        ...state,
        fetchSingleSourceOfIncomeStatus: 'success',
        form: {
          ...state.form,
          ...payload,
        },
      };
    case UPDATE_SOURCE_OF_INCOME:
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
