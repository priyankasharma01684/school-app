import { createAction } from 'redux-actions';

export const CREATE_ENTRIES = 'CREATE_ENTRIES';
export const createEntries = createAction(CREATE_ENTRIES);

export const CREATE_ENTRIES_FAILURE = 'CREATE_ENTRIES_FAILURE';
export const createEntriesFailure = createAction(CREATE_ENTRIES_FAILURE);

export const CREATE_ENTRIES_REQUESTED = 'CREATE_ENTRIES_REQUESTED';
export const createEntriesRequested = createAction(CREATE_ENTRIES_REQUESTED);

export const CREATE_ENTRIES_SUCCESS = 'CREATE_ENTRIES_SUCCESS';
export const createEntriesSuccess = createAction(CREATE_ENTRIES_SUCCESS);

export const DELETE_ENTRIES = 'DELETE_ENTRIES';
export const deleteEntries = createAction(DELETE_ENTRIES);

export const DELETE_ENTRIES_FAILURE = 'DELETE_ENTRIES_FAILURE';
export const deleteEntriesFailure = createAction(DELETE_ENTRIES_FAILURE);

export const DELETE_ENTRIES_REQUESTED = 'DELETE_ENTRIES_REQUESTED';
export const deleteEntriesRequested = createAction(DELETE_ENTRIES_REQUESTED);

export const DELETE_ENTRIES_SUCCESS = 'DELETE_ENTRIES_SUCCESS';
export const deleteEntriesSuccess = createAction(DELETE_ENTRIES_SUCCESS);

export const EDIT_ENTRIES = 'EDIT_ENTRIES';
export const editEntries = createAction(EDIT_ENTRIES);

export const EDIT_ENTRIES_FAILURE = 'EDIT_ENTRIES_FAILURE';
export const editEntriesFailure = createAction(EDIT_ENTRIES_FAILURE);

export const EDIT_ENTRIES_REQUESTED = 'EDIT_ENTRIES_REQUESTED';
export const editEntriesRequested = createAction(EDIT_ENTRIES_REQUESTED);

export const EDIT_ENTRIES_SUCCESS = 'EDIT_ENTRIES_SUCCESS';
export const editEntriesSuccess = createAction(EDIT_ENTRIES_SUCCESS);

export const FETCH_SINGLE_ENTRIES = 'FETCH_SINGLE_ENTRIES';
export const fetchSingleEntries = createAction(FETCH_SINGLE_ENTRIES);

export const FETCH_SINGLE_ENTRIES_FAILURE = 'FETCH_SINGLE_ENTRIES_FAILURE';
export const fetchSingleEntriesFailure = createAction(FETCH_SINGLE_ENTRIES_FAILURE);

export const FETCH_SINGLE_ENTRIES_REQUESTED = 'FETCH_SINGLE_ENTRIES_REQUESTED';
export const fetchSingleEntriesRequested = createAction(FETCH_SINGLE_ENTRIES_REQUESTED);

export const FETCH_SINGLE_ENTRIES_SUCCESS = 'FETCH_SINGLE_ENTRIES_SUCCESS';
export const fetchSingleEntriesSuccess = createAction(FETCH_SINGLE_ENTRIES_SUCCESS);

export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const fetchEntries = createAction(FETCH_ENTRIES);

export const FETCH_ENTRIES_FAILURE = 'FETCH_ENTRIES_FAILURE';
export const fetchEntriesFailure = createAction(FETCH_ENTRIES_FAILURE);

export const FETCH_ENTRIES_REQUESTED = 'FETCH_ENTRIES_REQUESTED';
export const fetchEntriesRequested = createAction(FETCH_ENTRIES_REQUESTED);

export const FETCH_ENTRIES_SUCCESS = 'FETCH_ENTRIES_SUCCESS';
export const fetchEntriesSuccess = createAction(FETCH_ENTRIES_SUCCESS);

export const FETCH_DAILY_ENTRIES = 'FETCH_DAILY_ENTRIES';
export const fetchDailyEntries = createAction(FETCH_DAILY_ENTRIES);

export const FETCH_DAILY_ENTRIES_FAILURE = 'FETCH_DAILY_ENTRIES_FAILURE';
export const fetchDailyEntriesFailure = createAction(FETCH_DAILY_ENTRIES_FAILURE);

export const FETCH_DAILY_ENTRIES_REQUESTED = 'FETCH_DAILY_ENTRIES_REQUESTED';
export const fetchDailyEntriesRequested = createAction(FETCH_DAILY_ENTRIES_REQUESTED);

export const FETCH_DAILY_ENTRIES_SUCCESS = 'FETCH_DAILY_ENTRIES_SUCCESS';
export const fetchDailyEntriesSuccess = createAction(FETCH_DAILY_ENTRIES_SUCCESS);

export const UPDATE_ENTRIES_FORM = 'UPDATE_ENTRIES_FORM';
export const updateEntriesForm = createAction(UPDATE_ENTRIES_FORM);
