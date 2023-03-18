import { LOCATION_CHANGE } from 'connected-react-router';
import { CREATE_ENTRIES_FAILURE,
  CREATE_ENTRIES_REQUESTED,
  CREATE_ENTRIES_SUCCESS,
  DELETE_ENTRIES_FAILURE,
  DELETE_ENTRIES_REQUESTED,
  DELETE_ENTRIES_SUCCESS,
  FETCH_SINGLE_ENTRIES_FAILURE,
  FETCH_SINGLE_ENTRIES_REQUESTED,
  FETCH_SINGLE_ENTRIES_SUCCESS,
  FETCH_ENTRIES_FAILURE,
  FETCH_ENTRIES_REQUESTED,
  FETCH_ENTRIES_SUCCESS,
  FETCH_DAILY_ENTRIES_FAILURE,
  FETCH_DAILY_ENTRIES_REQUESTED,
  FETCH_DAILY_ENTRIES_SUCCESS,
  UPDATE_ENTRIES_FORM } from '../actions/entries-action-type';

const initialState = {
  createEntriesStatus: 'pending',
  deleteEntriesStatus: 'pending',
  entries: [],
  fetchEntriesStatus: 'pending',
  fetchSingleEntriesStatus: 'pending',
  form: {
    amount: '',
    bank_name: '',
    comment: '',
    income_reason_id: null,
    paid_by: '',
    payment_type_id: null,
    receipt_number: '',
    status: null,
    student_id: null,
  },
};

export default function entries(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case CREATE_ENTRIES_FAILURE:
      return {
        ...state,
        createEntriesStatus: 'failure',
      };

    case CREATE_ENTRIES_REQUESTED:
      return {
        ...state,
        createEntriesStatus: 'creating',
      };

    case CREATE_ENTRIES_SUCCESS:
      return {
        ...state,
        createEntriesStatus: 'success',
      };

    case DELETE_ENTRIES_FAILURE:
      return {
        ...state,
        deleteEntriesStatus: 'failure',
      };

    case DELETE_ENTRIES_REQUESTED:
      return {
        ...state,
        deleteEntriesStatus: 'deleting',
      };

    case DELETE_ENTRIES_SUCCESS:
      return {
        ...state,
        deleteEntriesStatus: 'success',
        entries: [...state.entries].filter((entry) => entry.entry_reason_id.toString() !== payload.toString()),
      };

    case FETCH_ENTRIES_FAILURE:
      return {
        ...state,
        fetchEntriesStatus: 'failure',
      };

    case FETCH_ENTRIES_REQUESTED:
      return {
        ...state,
        fetchEntriesStatus: 'fetching',
      };

    case FETCH_ENTRIES_SUCCESS:
      return {
        ...state,
        entries: payload,
        fetchEntriesStatus: 'success',
      };

    case FETCH_DAILY_ENTRIES_FAILURE:
      return {
        ...state,
        fetchEntriesStatus: 'failure',
      };

    case FETCH_DAILY_ENTRIES_REQUESTED:
      return {
        ...state,
        fetchEntriesStatus: 'fetching',
      };

    case FETCH_DAILY_ENTRIES_SUCCESS:
      return {
        ...state,
        entries: payload,
        fetchEntriesStatus: 'success',
      };

    case FETCH_SINGLE_ENTRIES_FAILURE:
      return {
        ...state,
        fetchSingleEntriesStatus: 'failure',
      };

    case FETCH_SINGLE_ENTRIES_REQUESTED:
      return {
        ...state,
        fetchSingleEntriesStatus: 'fetching',
      };

    case FETCH_SINGLE_ENTRIES_SUCCESS:
      return {
        ...state,
        fetchSingleEntriesStatus: 'success',
        form: {
          ...state.form,
          ...payload,
        },
      };

    case UPDATE_ENTRIES_FORM:
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
