import { FETCH_TILES_FAILURE,
  FETCH_TILES_REQUESTED,
  FETCH_TILES_SUCCESS,
  FETCH_SELECTED_TILES_FAILURE,
  FETCH_SELECTED_TILES_REQUESTED,
  FETCH_SELECTED_TILES_SUCCESS } from '../actions/tiles-action-types';

const initialState = {
  fetchSelectedTilesStatus: 'pending',
  fetchTilesStatus: 'pending',
  form: {
    from: null,
    to: null,
  },
  records: {
    totalStudent: 0,
    totalTeacher: 0,
    totalUsers: 0,
    totalclass: 0,
  },
  selectedRecords: {
    totalStudent: 0,
    totalTeacher: 0,
    totalUsers: 0,
    totalclass: 0,
  },
};

export default function tiles(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case FETCH_TILES_FAILURE:
      return {
        ...state,
        fetchTilesStatus: 'failure',
      };

    case FETCH_TILES_REQUESTED:
      return {
        ...state,
        fetchTilesStatus: 'creating',
      };

    case FETCH_TILES_SUCCESS:
      return {
        ...state,
        fetchTilesStatus: 'success',
        records: payload,
      };
    case FETCH_SELECTED_TILES_FAILURE:
      return {
        ...state,
        fetchSelectedTilesStatus: 'failure',
      };

    case FETCH_SELECTED_TILES_REQUESTED:
      return {
        ...state,
        fetchSelectedTilesStatus: 'creating',
      };

    case FETCH_SELECTED_TILES_SUCCESS:
      return {
        ...state,
        fetchSelectedTilesStatus: 'success',
        selectedRecords: payload,
      };

    default:
      return state;
  }
}
