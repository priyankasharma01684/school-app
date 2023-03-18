import { createAction } from 'redux-actions';

export const FETCH_TILES = 'FETCH_TILES';
export const fetchTiles = createAction(FETCH_TILES);

export const FETCH_TILES_FAILURE = 'FETCH_TILES_FAILURE';
export const fetchTilesFailure = createAction(FETCH_TILES_FAILURE);

export const FETCH_TILES_REQUESTED = 'FETCH_TILES_REQUESTED';
export const fetchTilesRequested = createAction(FETCH_TILES_REQUESTED);

export const FETCH_TILES_SUCCESS = 'FETCH_TILES_SUCCESS';
export const fetchTilesSuccess = createAction(FETCH_TILES_SUCCESS);

export const FETCH_SELECTED_TILES = 'FETCH_SELECTED_TILES';
export const fetchSelectedTiles = createAction(FETCH_SELECTED_TILES);

export const FETCH_SELECTED_TILES_FAILURE = 'FETCH_SELECTED_TILES_FAILURE';
export const fetchSelectedTilesFailure = createAction(FETCH_SELECTED_TILES_FAILURE);

export const FETCH_SELECTED_TILES_REQUESTED = 'FETCH_SELECTED_TILES_REQUESTED';
export const fetchSelectedTilesRequested = createAction(FETCH_SELECTED_TILES_REQUESTED);

export const FETCH_SELECTED_TILES_SUCCESS = 'FETCH_SELECTED_TILES_SUCCESS';
export const fetchSelectedTilesSuccess = createAction(FETCH_SELECTED_TILES_SUCCESS);
