import { LOCATION_CHANGE } from 'connected-react-router';
import { CREATE_SUB_USER_FAILURE,
  CREATE_SUB_USER_REQUESTED,
  CREATE_SUB_USER_SUCCESS,
  DELETE_SUB_USER_FAILURE,
  DELETE_SUB_USER_REQUESTED,
  DELETE_SUB_USER_SUCCESS,
  FETCH_SINGLE_SUB_USER_FAILURE,
  FETCH_SINGLE_SUB_USER_REQUESTED,
  FETCH_SINGLE_SUB_USER_SUCCESS,
  FETCH_SUB_USER_FAILURE,
  FETCH_SUB_USER_REQUESTED,
  FETCH_SUB_USER_SUCCESS,
  UPDATE_SUB_USER_FORM } from '../actions/sub-user-action-type';

const initialState = {
  createSubUserStatus: 'pending',
  deleteSubUserStatus: 'pending',
  fetchSingleSubUserStatus: 'pending',
  fetchSubUsersStatus: 'pending',
  form: {
    email: '',
    password: '',
    phone_number: '',
    status: null,
    username: '',
  },
  subUsers: [],
};

export default function SubUsers(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case CREATE_SUB_USER_FAILURE:
      return {
        ...state,
        createSubUserStatus: 'failure',
      };

    case CREATE_SUB_USER_REQUESTED:
      return {
        ...state,
        createSubUserStatus: 'creating',
      };

    case CREATE_SUB_USER_SUCCESS:
      return {
        ...state,
        createSubUserStatus: 'success',
      };

    case DELETE_SUB_USER_FAILURE:
      return {
        ...state,
        deleteSubUserStatus: 'failure',
      };

    case DELETE_SUB_USER_REQUESTED:
      return {
        ...state,
        deleteSubUserStatus: 'deleting',
      };

    case DELETE_SUB_USER_SUCCESS:
      return {
        ...state,
        deleteSubUserStatus: 'success',
        subUsers: [...state.subUsers].filter((subUser) => subUser.id.toString() !== payload.toString()),
      };

    case FETCH_SUB_USER_FAILURE:
      return {
        ...state,
        fetchSubUsersStatus: 'failure',
      };

    case FETCH_SUB_USER_REQUESTED:
      return {
        ...state,
        fetchSubUsersStatus: 'fetching',
      };

    case FETCH_SUB_USER_SUCCESS:
      return {
        ...state,
        fetchSubUsersStatus: 'success',
        subUsers: payload,
      };

    case FETCH_SINGLE_SUB_USER_FAILURE:
      return {
        ...state,
        fetchSingleSubUserStatus: 'failure',
      };

    case FETCH_SINGLE_SUB_USER_REQUESTED:
      return {
        ...state,
        fetchSingleSubUserStatus: 'fetching',
      };

    case FETCH_SINGLE_SUB_USER_SUCCESS:
      return {
        ...state,
        fetchSingleSubUserStatus: 'success',
        form: {
          ...state.form,
          ...payload,
        },
      };

    case UPDATE_SUB_USER_FORM:
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
