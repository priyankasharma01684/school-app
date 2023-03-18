
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { func, object, string, number } from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { push } from 'connected-react-router';
import Button from '../../components/button';
import DateCalenderInput from '../../components/date-calender-input';
import Utils from '../../utility';
import { createEnrollment, editEnrollment, fetchSingleEnrollment, updateEnrollmentForm } from '../../actions/enrollment-action-type';
import { fetchClasses } from '../../actions/classes-action-types';
import { fetchSchools, fetchCities, fetchCountries, fetchSchoolCategories } from '../../actions/schools-action-types';

const ParentInfo = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const {
    cities, counties, classes, form,
  } = useSelector((store) => ({
    cities: store.schools.cities,
    classes: store.classes.classes,
    counties: store.schools.counties,
    form: store.enrollment.form,
  }));

  const {
    father_first_name,
    father_last_name,
    father_phone_no,
    father_email_address,
    mother_first_name,
    mother_last_name,
    mother_phone_no,
    mother_email_address,
    tutor_first_name,
    tutor_last_name,
    tutor_phone_no,
    tutor_email_address,
    tutor_gender,
    tutor_date_of_birth,
  } = form;

  React.useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchCountries());
    dispatch(fetchSchoolCategories());
    dispatch(fetchCities());
    dispatch(fetchSchools());

    if (params && params.publicId) {
      dispatch(fetchSingleEnrollment(params.publicId));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updateEnrollmentForm(updates));
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    dispatch(updateEnrollmentForm(updates));
  };

  return (
    <div className="tab-pane show fade active" id="step-2">
      <div className="row mt-4">
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Father’s Last Name</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="father_first_name"
                name="father_first_name"
                placeholder="Enter First Name"
                onChange={onChange}
                value={father_first_name}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Father’s first name</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="father_last_name"
                name="father_last_name"
                placeholder="Enter First Name"
                onChange={onChange}
                value={father_last_name}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Father's Phone Number</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="father_phone_no"
                name="father_phone_no"
                placeholder="Enter First Name"
                onChange={onChange}
                value={father_phone_no}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Email Address</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="father_email_address"
                name="father_email_address"
                placeholder="Enter First Name"
                onChange={onChange}
                value={father_email_address}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Mother’s First Name</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="mother_first_name"
                name="mother_first_name"
                placeholder="Enter First Name"
                onChange={onChange}
                value={mother_first_name}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Mother's Last Name</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="mother_last_name"
                name="mother_last_name"
                placeholder="Enter First Name"
                onChange={onChange}
                value={mother_last_name}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Mother's Phone Number</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="mother_phone_no"
                name="mother_phone_no"
                placeholder="Enter First Name"
                onChange={onChange}
                value={mother_phone_no}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Email Address</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="mother_email_address"
                name="mother_email_address"
                placeholder="Enter First Name"
                onChange={onChange}
                value={mother_email_address}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Tutor’s Last Name</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="tutor_first_name"
                name="tutor_first_name"
                placeholder="Enter First Name"
                onChange={onChange}
                value={tutor_first_name}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Tutor's First Name</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="tutor_last_name"
                name="tutor_last_name"
                placeholder="Enter First Name"
                onChange={onChange}
                value={tutor_last_name}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Tutor's Phone Number</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="tutor_phone_no"
                name="tutor_phone_no"
                placeholder="Enter First Name"
                onChange={onChange}
                value={tutor_phone_no}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Email Address</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="tutor_email_address"
                name="tutor_email_address"
                placeholder="Enter First Name"
                onChange={onChange}
                value={tutor_email_address}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Tutor's Birthdate</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="tutor_date_of_birth"
                name="tutor_date_of_birth"
                placeholder="Enter First Name"
                onChange={onChange}
                value={tutor_date_of_birth}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Tutor`&apos;`s Sex</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="tutor_gender"
                name="tutor_gender"
                placeholder="Enter First Name"
                onChange={onChange}
                value={tutor_gender}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentInfo;
