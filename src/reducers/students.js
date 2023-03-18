import { LOCATION_CHANGE } from 'connected-react-router';
import { CERTIFICATE_FORM_FAILURE,
  CERTIFICATE_FORM_REQUESTED,
  CERTIFICATE_FORM_SUCCESS } from '../actions/certificate-action-type';
import { CREATE_STUDENT_FAILURE,
  CREATE_STUDENT_REQUESTED,
  CREATE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILURE,
  DELETE_STUDENT_REQUESTED,
  DELETE_STUDENT_SUCCESS,
  EDIT_MORATORIUM_FAILURE,
  EDIT_MORATORIUM_REQUESTED,
  EDIT_MORATORIUM_SUCCESS,
  FETCH_SINGLE_STUDENT_FAILURE,
  FETCH_SINGLE_STUDENT_REQUESTED,
  FETCH_SINGLE_STUDENT_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  FETCH_STUDENTS_REQUESTED,
  FETCH_STUDENTS_SUCCESS,
  FETCH_CLASS_STUDENTS_FAILURE,
  FETCH_CLASS_STUDENTS_REQUESTED,
  FETCH_CLASS_STUDENTS_SUCCESS,
  UPDATE_STUDENT_FORM } from '../actions/students-action-types';

const initialState = {

  certificateData: {},
  createStudentStatus: 'pending',
  deleteStudentStatus: 'pending',
  fetchSingleStudentStatus: 'pending',
  fetchStudentsStatus: 'pending',
  form: {
    age: '',
    class_id: null,
    country_id: null,
    date_of_birth: null,
    enrollment_date: '',
    file: '',
    gender: '',
    neighborhood: '',
    parents: [],
    place_of_birth: '',
    school_id: null,
    school_year_id: null,
    section: '',
    status: null,
    street: '',
    student_address: '',
    student_email: '',
    student_first_name: '',
    student_last_name: '',
    student_phone_no: '',
    student_profile_picture: null,
    student_registration_no: '',
    type_of_student: null,
  },
  students: [],
};

export default function schools(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case CREATE_STUDENT_FAILURE:
      return {
        ...state,
        createStudentStatus: 'failure',
      };

    case CREATE_STUDENT_REQUESTED:
      return {
        ...state,
        createStudentStatus: 'creating',
      };

    case CREATE_STUDENT_SUCCESS:
      return {
        ...state,
        createStudentStatus: 'success',
      };

    case DELETE_STUDENT_FAILURE:
      return {
        ...state,
        deleteStudentStatus: 'failure',
      };

    case DELETE_STUDENT_REQUESTED:
      return {
        ...state,
        deleteStudentStatus: 'deleting',
      };

    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        deleteStudentStatus: 'success',
        students: [...state.students].filter((student) => student.student_id.toString() !== payload.toString()),
      };

    case EDIT_MORATORIUM_FAILURE:
      return {
        ...state,
        editMoratoriumDateStatus: 'failure',
      };

    case EDIT_MORATORIUM_REQUESTED:
      return {
        ...state,
        editMoratoriumDateStatus: 'fetching',
      };

    case EDIT_MORATORIUM_SUCCESS:
      return {
        ...state,
        editMoratoriumDateStatus: 'success',
      };

    case FETCH_STUDENTS_FAILURE:
      return {
        ...state,
        fetchStudentsStatus: 'failure',
      };

    case FETCH_STUDENTS_REQUESTED:
      return {
        ...state,
        fetchStudentsStatus: 'fetching',
      };

    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        fetchStudentsStatus: 'success',
        students: payload,
      };

    case FETCH_CLASS_STUDENTS_FAILURE:
      return {
        ...state,
        fetchClassStudentsStatus: 'failure',
      };

    case FETCH_CLASS_STUDENTS_REQUESTED:
      return {
        ...state,
        fetchClassStudentsStatus: 'fetching',
      };

    case FETCH_CLASS_STUDENTS_SUCCESS:
      return {
        ...state,
        fetchStudentsStatus: 'success',
        students: payload,
      };
    case FETCH_SINGLE_STUDENT_FAILURE:
      return {
        ...state,
        fetchSingleStudentStatus: 'failure',
      };

    case FETCH_SINGLE_STUDENT_REQUESTED:
      return {
        ...state,
        fetchSingleStudentStatus: 'fetching',
      };

    case FETCH_SINGLE_STUDENT_SUCCESS:
      return {
        ...state,
        fetchSingleStudentStatus: 'success',
        form: {
          ...state.form,
          ...payload,
          file: encodeURI(payload.student_profile_picture),
          student_profile_picture: null,
        },
      };
    case CERTIFICATE_FORM_FAILURE:
      return {
        ...state,
        certificateFormStatus: 'failure',
      };

    case CERTIFICATE_FORM_REQUESTED:
      return {
        ...state,
        certificateFormStatus: 'fetching',
      };

    case CERTIFICATE_FORM_SUCCESS:
      return {
        ...state,
        certificateData: payload,
        certificateFormStatus: 'success',
        // file: encodeURI(payload.student_profile_picture),
        // student_profile_picture: null,

      };
    case UPDATE_STUDENT_FORM:
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
