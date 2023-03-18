import { LOCATION_CHANGE } from 'connected-react-router';
import { CREATE_ENROLLMENT_FAILURE,
  CREATE_ENROLLMENT_REQUESTED,
  CREATE_ENROLLMENT_SUCCESS,
  DELETE_ENROLLMENT_FAILURE,
  DELETE_ENROLLMENT_REQUESTED,
  DELETE_ENROLLMENT_SUCCESS,
  FETCH_SINGLE_ENROLLMENT_FAILURE,
  FETCH_SINGLE_ENROLLMENT_REQUESTED,
  FETCH_SINGLE_ENROLLMENT_SUCCESS,
  FETCH_ENROLLMENT_FAILURE,
  FETCH_ENROLLMENT_REQUESTED,
  FETCH_ENROLLMENT_SUCCESS,
  FETCH_ENROLLED_STUDENTS_FAILURE,
  FETCH_ENROLLED_STUDENTS_REQUESTED,
  FETCH_ENROLLED_STUDENTS_SUCCESS,
  FETCH_STUDENTS_INSTALLMENT_FAILURE,
  FETCH_STUDENTS_INSTALLMENT_REQUESTED,
  FETCH_STUDENTS_INSTALLMENT_SUCCESS,
  UPDATE_ENROLLMENT_FORM } from '../actions/enrollment-action-type';

const initialState = {
  createEnrollmentStatus: 'pending',
  deleteEnrollmentStatus: 'pending',
  enrollments: [],
  fetchEnrolledStudentsStatus: 'pending',
  fetchEnrollmentStatus: 'pending',
  fetchSingleEnrollmentStatus: 'pending',
  fetchStudentsInstallmentStatus: 'pending',
  form: {
    allergy: '',
    amount_paid: '',
    amount_to_pay: '',
    balance: '',
    class_id: '',
    country_id: '',
    date_of_birth: null,
    deadline: null,
    discount: 0,
    enrollment_date: null,
    father_email_address: '',
    father_first_name: '',
    father_last_name: '',
    father_phone_no: '',
    file: null,
    first_enrollment_date: null,
    gender: null,
    grade_id: '',
    id: null,
    moreinfo: '',
    mother_email_address: '',
    mother_first_name: '',
    mother_last_name: '',
    mother_phone_no: '',
    neighborhood: '',
    payment_already_amount_paid: '',
    payment_amount_paid: '',
    payment_amount_to_pay: '',
    payment_balance: '',
    payment_date: '',
    place_of_birth: '',
    quater_name: '',
    reference_hospital: '',
    reference_hospital_address: '',
    school_year: '',
    section: '',
    seniority: null,
    status: '',
    street: '',
    student_address: '',
    student_email: '',
    student_first_name: '',
    student_id: null,
    student_last_name: '',
    student_phone_no: '',
    student_profile_picture: '',
    tutor_date_of_birth: null,
    tutor_email_address: '',
    tutor_first_name: '',
    tutor_gender: null,
    tutor_last_name: '',
    tutor_phone_no: '',
    type_of_student: null,
  },
  installmentsList: [],
  students: [],
};

export default function enrollment(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case CREATE_ENROLLMENT_FAILURE:
      return {
        ...state,
        createEnrollmentStatus: 'failure',
      };

    case CREATE_ENROLLMENT_REQUESTED:
      return {
        ...state,
        createEnrollmentStatus: 'creating',
      };

    case CREATE_ENROLLMENT_SUCCESS:
      return {
        ...state,
        createEnrollmentStatus: 'success',
        form: {
          ...state.form,
          student_id: payload.student_id || state.form.student_id,
        },
      };

    case DELETE_ENROLLMENT_FAILURE:
      return {
        ...state,
        deleteEnrollmentStatus: 'failure',
      };

    case DELETE_ENROLLMENT_REQUESTED:
      return {
        ...state,
        deleteEnrollmentStatus: 'deleting',
      };

    case DELETE_ENROLLMENT_SUCCESS:
      return {
        ...state,
        deleteEnrollmentStatus: 'success',
        enrollments: [...state.enrollments].filter((singleEnrollment) => singleEnrollment.enrollment_id.toString() !== payload.toString()),
      };

    case FETCH_ENROLLMENT_FAILURE:
      return {
        ...state,
        fetchEnrollmentStatus: 'failure',
      };

    case FETCH_ENROLLMENT_REQUESTED:
      return {
        ...state,
        fetchEnrollmentStatus: 'fetching',
      };

    case FETCH_ENROLLMENT_SUCCESS:
      return {
        ...state,
        enrollments: payload,
        fetchEnrollmentStatus: 'success',
      };

    case FETCH_STUDENTS_INSTALLMENT_FAILURE:
      return {
        ...state,
        fetchEnrollmentStatus: 'failure',
      };

    case FETCH_STUDENTS_INSTALLMENT_REQUESTED:
      return {
        ...state,
        fetchEnrollmentStatus: 'fetching',
      };

    case FETCH_STUDENTS_INSTALLMENT_SUCCESS:

      return {
        ...state,
        fetchEnrollmentStatus: 'success',
        installmentsList: payload,
      };

    case FETCH_ENROLLED_STUDENTS_FAILURE:
      return {
        ...state,
        fetchEnrolledStudentsStatus: 'failure',
      };

    case FETCH_ENROLLED_STUDENTS_REQUESTED:
      return {
        ...state,
        fetchEnrolledStudentsStatus: 'fetching',
      };

    case FETCH_ENROLLED_STUDENTS_SUCCESS:
      return {
        ...state,
        fetchEnrolledStudentsStatus: 'success',
        students: payload,
      };

    case FETCH_SINGLE_ENROLLMENT_FAILURE:
      return {
        ...state,
        fetchSingleEnrollmentStatus: 'failure',
      };

    case FETCH_SINGLE_ENROLLMENT_REQUESTED:
      return {
        ...state,
        fetchSingleEnrollmentStatus: 'fetching',
      };

    case FETCH_SINGLE_ENROLLMENT_SUCCESS:
      return {
        ...state,
        fetchSingleEnrollmentStatus: 'success',
        form: {
          ...state.form,
          ...payload,
          file: encodeURI(payload.student_profile_picture),
          student_profile_picture: null,
        },
      };

    case UPDATE_ENROLLMENT_FORM:
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
