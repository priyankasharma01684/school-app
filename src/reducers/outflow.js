import { LOCATION_CHANGE } from 'connected-react-router';
import { CREATE_OUTFLOW_FAILURE,
  CREATE_OUTFLOW_REQUESTED,
  CREATE_OUTFLOW_SUCCESS,
  DELETE_OUTFLOW_FAILURE,
  DELETE_OUTFLOW_REQUESTED,
  DELETE_OUTFLOW_SUCCESS,
  FETCH_SINGLE_OUTFLOW_FAILURE,
  FETCH_SINGLE_OUTFLOW_REQUESTED,
  FETCH_SINGLE_OUTFLOW_SUCCESS,
  FETCH_OUTFLOW_FAILURE,
  FETCH_OUTFLOW_REQUESTED,
  FETCH_OUTFLOW_SUCCESS,
  UPDATE_OUTFLOW_FORM } from '../actions/outflow-action-types';

const initialState = {
  createOutflowStatus: 'pending',
  deleteOutflowStatus: 'pending',
  fetchOutflowsStatus: 'pending',
  fetchSingleOutflowStatus: 'pending',
  form: {
    amount: '',
    bank_name: '',
    comments: '',
    cost_reason_id: null,
    payment_type_id: null,
    receipt_number: '',
    status: null,
  },
  outflows: [],
};

export default function outflows(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case CREATE_OUTFLOW_FAILURE:
      return {
        ...state,
        createOutflowStatus: 'failure',
      };

    case CREATE_OUTFLOW_REQUESTED:
      return {
        ...state,
        createOutflowStatus: 'creating',
      };

    case CREATE_OUTFLOW_SUCCESS:
      return {
        ...state,
        createOutflowStatus: 'success',
      };

    case DELETE_OUTFLOW_FAILURE:
      return {
        ...state,
        deleteOutflowStatus: 'failure',
      };

    case DELETE_OUTFLOW_REQUESTED:
      return {
        ...state,
        deleteOutflowStatus: 'deleting',
      };

    case DELETE_OUTFLOW_SUCCESS:
      return {
        ...state,
        deleteOutflowStatus: 'success',
        outflows: [...state.outflows].filter((outflow) => outflow.outflow_reason_id.toString() !== payload.toString()),
      };

    case FETCH_OUTFLOW_FAILURE:
      return {
        ...state,
        fetchOutflowsStatus: 'failure',
      };

    case FETCH_OUTFLOW_REQUESTED:
      return {
        ...state,
        fetchOutflowsStatus: 'fetching',
      };

    case FETCH_OUTFLOW_SUCCESS:
      return {
        ...state,
        fetchOutflowsStatus: 'success',
        outflows: payload,
      };

    case FETCH_SINGLE_OUTFLOW_FAILURE:
      return {
        ...state,
        fetchSingleOutflowStatus: 'failure',
      };

    case FETCH_SINGLE_OUTFLOW_REQUESTED:
      return {
        ...state,
        fetchSingleOutflowStatus: 'fetching',
      };

    case FETCH_SINGLE_OUTFLOW_SUCCESS:
      return {
        ...state,
        fetchSingleOutflowStatus: 'success',
        form: {
          ...state.form,
          ...payload,
        },
      };

    case UPDATE_OUTFLOW_FORM:
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
