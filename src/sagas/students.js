import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import moment from 'moment';
import { CREATE_STUDENT,
  createStudentFailure,
  createStudentRequested,
  createStudentSuccess,
  DELETE_STUDENT,
  deleteStudentFailure,
  deleteStudentRequested,
  deleteStudentSuccess,
  EDIT_MORATORIUM_DATE,
  editMoratoriumDateFailure,
  editMoratoriumDateRequested,
  editMoratoriumDateSuccess,
  EDIT_STUDENT,
  editStudentFailure,
  editStudentRequested,
  editStudentSuccess,
  FETCH_SINGLE_STUDENT,
  fetchSingleStudentFailure,
  fetchSingleStudentRequested,
  fetchSingleStudentSuccess,
  FETCH_STUDENTS,
  fetchStudentsFailure,
  fetchStudentsRequested,
  fetchStudentsSuccess,
  FETCH_CLASS_STUDENTS,
  fetchClassStudentsFailure,
  fetchClassStudentsRequested,
  fetchClassStudentsSuccess } from '../actions/students-action-types';
import { CERTIFICATE_FORM, certificateFormFailure, certificateFormRequested, certificateFormSuccess } from '../actions/certificate-action-type';
import httpClient from './http-client';
import Alert from '../utility/alert';
import { history } from '../index';

export function* createStudentHandler({ payload }) {
  yield put(createStudentRequested());
  const body = new FormData();

  body.append('student_first_name', payload.student_first_name);
  body.append('student_last_name', payload.student_last_name);
  body.append('student_registration_no', payload.student_registration_no);
  body.append('student_address', payload.student_address);
  body.append('student_email', payload.student_email);
  body.append('student_phone_no', payload.student_phone_no);
  body.append('place_of_birth', payload.place_of_birth);
  body.append('date_of_birth', moment(payload.date_of_birth).format('MM/DD/yyyy').toString());
  body.append('age', payload.age);
  body.append('student_profile_picture', payload.student_profile_picture);
  body.append('gender', payload.gender.value);
  body.append('country_id', payload.country_id.value);
  body.append('city_id', payload.city_id.value);
  body.append('class_id', payload.class_id.value);
  body.append('status', payload.status.value);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-student',
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(createStudentFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/school-students');
      },
      icon: 'success',
      message: 'Student created successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(createStudentSuccess());
    yield put(push('/school-students'));
  }
}

export function* editStudentHandler({ payload }) {
  yield put(editStudentRequested());
  const body = new FormData();

  body.append('student_first_name', payload.student_first_name);
  body.append('student_last_name', payload.student_last_name);
  body.append('student_registration_no', payload.student_registration_no);
  body.append('student_address', payload.student_address);
  body.append('student_email', payload.student_email);
  body.append('student_phone_no', payload.student_phone_no);
  body.append('place_of_birth', payload.place_of_birth);
  body.append('date_of_birth', moment(payload.date_of_birth).format('MM/DD/yyyy').toString());
  body.append('age', payload.age);
  body.append('gender', payload.gender.value);
  body.append('country_id', payload.country_id.value);
  body.append('class_id', payload.class_id.value);
  body.append('status', payload.status.value);

  body.append('file', payload.file);
  body.append('enrollment_date', moment(payload.enrollment_date).format('MM/DD/yyyy').toString());
  body.append('school_year_id', payload.school_year_id.value);
  body.append('section', payload.section.value);
  body.append('type_of_student', payload.type_of_student.value);
  body.append('neighborhood', payload.neighborhood);
  body.append('street', payload.street);

  if (payload.student_profile_picture) {
    body.append('student_profile_picture', payload.student_profile_picture);
  }

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: `update-student/${payload.student_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editStudentFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/school-students');
      },
      icon: 'success',
      message: 'Student updated successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(editStudentSuccess());
  }
}

export function* editMoratoriumDateHandler({ payload }) {
  yield put(editMoratoriumDateRequested());
  const body = new FormData();

  body.append('moratorium_deadline', moment(payload.moratorium_deadline).format('MM/DD/yyyy').toString());
  body.append('installment_id', payload.installment_id.value);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: `moratorium-update/${payload.id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editMoratoriumDateFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'Moratorium date updated successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(editMoratoriumDateSuccess());
  }
}

export function* deleteStudentHandler({ payload }) {
  yield put(deleteStudentRequested());

  const request = {
    method: 'DELETE',
    url: `delete-student/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteStudentFailure(error));
  } else {
    yield put(deleteStudentSuccess(payload));
    const alertProps = {
      icon: 'success',
      message: 'Student deleted successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
  }
}

export function* fetchStudentsHandler({ payload }) {
  yield put(fetchStudentsRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-student',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchStudentsFailure(error));
  } else {
    yield put(fetchStudentsSuccess(data.data.result));
  }
}

export function* fetchClassStudentsHandler({ payload }) {
  yield put(fetchClassStudentsRequested());

  const request = {
    method: 'GET',
    url: `list-student-class/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchClassStudentsFailure(error));
  } else {
    yield put(fetchClassStudentsSuccess(data.data.result));
  }
}

export function* downloadCertificateHandler({ payload }) {
  yield put(certificateFormRequested());

  const request = {
    method: 'GET',
    responseType: 'blob',
    url: payload.url,
  };
  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(certificateFormFailure(error));
  } else {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');

    link.setAttribute('download', payload.filename);
    link.href = url;

    document.body.appendChild(link);

    link.click();

    yield put(certificateFormSuccess());
  }
}

export function* fetchSingleStudentHandler({ payload }) {
  yield put(fetchSingleStudentRequested());

  const request = {
    method: 'GET',
    url: `view-student/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleStudentFailure(error));
  } else {
    const { result } = data.data;
    const res = {
      ...data.data.result,
      city_id: {
        label: result.city_name,
        value: result.city_id,
      },
      class_id: {
        label: result.class_name,
        value: result.class_id,
      },
      country_id: {
        label: result.country_name,
        value: result.country_id,
      },
      date_of_birth: moment(result.date_of_birth, 'X').toDate(),
      enrollment_date: moment(result.enrollment_date, 'X').toDate(),
      gender: {
        label: result.gender,
        value: result.gender,
      },
     
      status: result.status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      }, 
      type_of_student: {
        label: result.type_of_student,
        value: result.type_of_student,
      },
    };

    yield put(fetchSingleStudentSuccess(res));
  }
}

function* students() {
  yield all([
    takeLatest(CERTIFICATE_FORM, downloadCertificateHandler),
    takeLatest(CREATE_STUDENT, createStudentHandler),
    takeLatest(DELETE_STUDENT, deleteStudentHandler),
    takeLatest(EDIT_MORATORIUM_DATE, editMoratoriumDateHandler),
    takeLatest(EDIT_STUDENT, editStudentHandler),
    takeLatest(FETCH_STUDENTS, fetchStudentsHandler),
    takeLatest(FETCH_CLASS_STUDENTS, fetchClassStudentsHandler),
    takeLatest(FETCH_SINGLE_STUDENT, fetchSingleStudentHandler),
  ]);
}

export default students;
