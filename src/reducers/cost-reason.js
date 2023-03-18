import { LOCATION_CHANGE } from 'connected-react-router';
import { ADD_COST_OF_REASON_FAILURE,
  ADD_COST_OF_REASON_REQUESTED,
  ADD_COST_OF_REASON_SUCCESS,
  DELETE_COST_OF_REASON_FAILURE,
  DELETE_COST_OF_REASON_REQUESTED,
  DELETE_COST_OF_REASON_SUCCESS,
  FETCH_COST_OF_REASON_FAILURE,
  FETCH_COST_OF_REASON_REQUESTED,
  FETCH_COST_OF_REASON_SUCCESS,
  FETCH_SINGLE_COST_OF_REASON_FAILURE,
  FETCH_SINGLE_COST_OF_REASON_REQUESTED,
  FETCH_SINGLE_COST_OF_REASON_SUCCESS,
  UPDATE_COST_OF_REASON_FORM } from '../actions/cost-reason-action-types';

const initialState = {
  addCostOfReasonStatus: 'pending',
  costOfReason: [],
  deleteCostOfReasonStatus: 'pending',
  fetchCostOfReasonStatus: 'pending',
  fetchSingleCostOfReasonStatus: 'pending',
  form: {
    cost_item_id: null,
    cost_reason_code: '',
    cost_reason_label: '',
    status: null,
  },
};

export default function costOfReason(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case ADD_COST_OF_REASON_FAILURE:
      return {
        ...state,
        addCostOfReasonStatus: 'failure',
      };

    case ADD_COST_OF_REASON_REQUESTED:
      return {
        ...state,
        addCostOfReasonStatus: 'creating',
      };

    case ADD_COST_OF_REASON_SUCCESS:
      return {
        ...state,
        addCostOfReasonStatus: 'success',
      };

    case DELETE_COST_OF_REASON_FAILURE:
      return {
        ...state,
        deleteCostOfReasonStatus: 'failure',
      };

    case DELETE_COST_OF_REASON_REQUESTED:
      return {
        ...state,
        deleteCostOfReasonStatus: 'deleting',
      };

    case DELETE_COST_OF_REASON_SUCCESS:
      return {
        ...state,
        costOfReason: [...state.costOfReason].filter((costReason) => costReason.cost_reason_id.toString() !== payload.toString()),
        deleteCostOfReasonStatus: 'success',
      };

    case FETCH_COST_OF_REASON_FAILURE:
      return {
        ...state,
        fetchCostOfReasonStatus: 'failure',
      };

    case FETCH_COST_OF_REASON_REQUESTED:
      return {
        ...state,
        fetchCostOfReasonStatus: 'fetching',
      };

    case FETCH_COST_OF_REASON_SUCCESS:
      return {
        ...state,
        costOfReason: payload,
        fetchCostOfReasonStatus: 'success',
      };

    case FETCH_SINGLE_COST_OF_REASON_FAILURE:
      return {
        ...state,
        fetchSingleCostOfReasonStatus: 'failure',
      };

    case FETCH_SINGLE_COST_OF_REASON_REQUESTED:
      return {
        ...state,
        fetchSingleCostOfReasonStatus: 'fetching',
      };

    case FETCH_SINGLE_COST_OF_REASON_SUCCESS:
      return {
        ...state,
        fetchSingleCostOfReasonStatus: 'success',
        form: {
          ...state.form,
          ...payload,
        },
      };
    case UPDATE_COST_OF_REASON_FORM:
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
