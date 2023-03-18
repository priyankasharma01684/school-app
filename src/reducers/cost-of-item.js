import { LOCATION_CHANGE } from 'connected-react-router';
import { ADD_COST_OF_ITEM_FAILURE,
  ADD_COST_OF_ITEM_REQUESTED,
  ADD_COST_OF_ITEM_SUCCESS,
  DELETE_COST_OF_ITEM_FAILURE,
  DELETE_COST_OF_ITEM_REQUESTED,
  DELETE_COST_OF_ITEM_SUCCESS,
  FETCH_COST_OF_ITEM_FAILURE,
  FETCH_COST_OF_ITEM_REQUESTED,
  FETCH_COST_OF_ITEM_SUCCESS,
  FETCH_SINGLE_COST_OF_ITEM_FAILURE,
  FETCH_SINGLE_COST_OF_ITEM_REQUESTED,
  FETCH_SINGLE_COST_OF_ITEM_SUCCESS,
  UPDATE_COST_OF_ITEM_FORM } from '../actions/cost-item-action-types';

const initialState = {
  addCostOfItemStatus: 'pending',
  costOfItems: [],
  deleteCostOfItemStatus: 'pending',
  fetchCostOfItemStatus: 'pending',
  fetchSingleCostOfItemStatus: 'pending',
  form: {
    cost_item_code: '',
    cost_item_label: '',
    status: null,
  },
};

export default function costOfItems(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case ADD_COST_OF_ITEM_FAILURE:
      return {
        ...state,
        addCostOfItemStatus: 'failure',
      };

    case ADD_COST_OF_ITEM_REQUESTED:
      return {
        ...state,
        addCostOfItemStatus: 'creating',
      };

    case ADD_COST_OF_ITEM_SUCCESS:
      return {
        ...state,
        addCostOfItemStatus: 'success',
      };

    case DELETE_COST_OF_ITEM_FAILURE:
      return {
        ...state,
        deleteCostOfItemStatus: 'failure',
      };

    case DELETE_COST_OF_ITEM_REQUESTED:
      return {
        ...state,
        deleteCostOfItemStatus: 'deleting',
      };

    case DELETE_COST_OF_ITEM_SUCCESS:
      return {
        ...state,
        costOfItems: [...state.costOfItems].filter((costitem) => costitem.cost_item_id.toString() !== payload.toString()),
        deleteCostOfItemStatus: 'success',
      };

    case FETCH_COST_OF_ITEM_FAILURE:
      return {
        ...state,
        fetchCostOfItemStatus: 'failure',
      };

    case FETCH_COST_OF_ITEM_REQUESTED:
      return {
        ...state,
        fetchCostOfItemStatus: 'fetching',
      };

    case FETCH_COST_OF_ITEM_SUCCESS:
      return {
        ...state,
        costOfItems: payload,
        fetchCostOfItemStatus: 'success',
      };

    case FETCH_SINGLE_COST_OF_ITEM_FAILURE:
      return {
        ...state,
        fetchSingleCostOfItemStatus: 'failure',
      };

    case FETCH_SINGLE_COST_OF_ITEM_REQUESTED:
      return {
        ...state,
        fetchSingleCostOfItemStatus: 'fetching',
      };

    case FETCH_SINGLE_COST_OF_ITEM_SUCCESS:
      return {
        ...state,
        fetchSingleCostOfItemStatus: 'success',
        form: {
          ...state.form,
          ...payload,
        },
      };
    case UPDATE_COST_OF_ITEM_FORM:
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
