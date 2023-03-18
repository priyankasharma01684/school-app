import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { push } from 'connected-react-router';
import DateCalenderInput from '../../components/date-calender-input';
import Utils from '../../utility';
import { createEnrollment, editEnrollment, fetchSingleEnrollment, updateEnrollmentForm } from '../../actions/enrollment-action-type';
import { fetchClasses } from '../../actions/classes-action-types';
import { fetchCities, fetchCountries, fetchSchoolCategories } from '../../actions/schools-action-types';

export const StudentInfo = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const {counties, classes, form,
  } = useSelector((store) => ({
    classes: store.classes.classes,
    counties: store.schools.counties,
    form: store.enrollment.form,
  }));

  const {
    class_id,
    country_id,
    date_of_birth,
    enrollment_date,
    first_enrollment_date,
    gender,
    place_of_birth,
    school_year,
    section,
    seniority,
    neighborhood,
    street,
    student_address,
    student_email,
    student_first_name,
    student_last_name,
    student_phone_no,
    student_profile_picture,
    type_of_student,
  } = form;

  React.useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchCountries());
    dispatch(fetchSchoolCategories());
    dispatch(fetchCities());
    dispatch(createEnrollment());

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
    <div className="tab-pane fade show active" id="step-1">
      <div className="row">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group row align-items-center">
                <label className="col-sm-4 mb-0">Student Photo</label>
                <div className="col-sm-8">
                  <div className="avatar-icon-wrapper btn-hover-shine mb-2 avatar-icon-xxl">
                    <div className="avatar-icon rounded editProfile">
                      <img src={Utils.getImage('avatars/1.jpg')} height={50} alt="" />
                      <div className="icon">
                        <i className="lnr-pencil" />
                        <input type="file" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">First  Name</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="student_first_name"
                name="student_first_name"
                placeholder="Enter First Name"
                onChange={onChange}
                value={student_first_name}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0"> Last Name</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="student_last_name"
                name="student_last_name"
                placeholder="Enter Last Name"
                onChange={onChange}
                value={student_last_name}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Birth date</label>
            <div className="col-sm-8 calendar-icon">
              <DatePicker
                showYearDropdown
                showMonthDropdown
                id='date_of_birth'
                name='date_of_birth'
                customInput={<DateCalenderInput />}
                dateFormat="MM/dd/yyyy"
                maxDate={new Date()}
                title="Click to select a date of birth"
                placeholderText="Click to select a date of birth"
                className="form-control datePicker"
                onChange={(date) => {
                  const payload = {
                    ...form,
                    date_of_birth: date,
                  };

                  dispatch(updateEnrollmentForm(payload));
                }}
                selected={date_of_birth}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Place of birth</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="place_of_birth"
                name="place_of_birth"
                placeholder="Enter Place of Birth"
                onChange={onChange}
                value={place_of_birth}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Section</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="section"
                name="section"
                placeholder="Enter Section"
                onChange={onChange}
                value={section}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Neighborhood</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="neighborhood "
                name="neighborhood "
                placeholder="Enter Neighborhood"
                onChange={onChange}
                value={neighborhood}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Street</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="street "
                name="street "
                placeholder="Enter Neighborhood"
                onChange={onChange}
                value={street}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Kind</label>
            <div className="col-sm-8">
              <Select
                isSearchable
                name="gender"
                loadingMessage="Please wait loading"
                placeholder="Select Gender"
                onChange={(value) => onSelectChange('gender', value)}
                options={[
                  {
                    label: 'Male',
                    value: 'Male',
                  },
                  {
                    label: 'Female',
                    value: 'Female',
                  },
                  {
                    label: 'Other',
                    value: 'Other',
                  },
                ]}
                value={gender}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Nationality</label>
            <div className="col-sm-8">
              <Select
                isSearchable
                name="country_id"
                loadingMessage="Please wait loading"
                placeholder="Select Country"
                onChange={(value) => onSelectChange('country_id', value)}
                options={counties?.map((country) => ({
                  label: country.country_name, value: country.country_id,
                }))}
                value={country_id}
                selected={country_id}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Seniority</label>
            <div className="col-sm-8">
              <Select
                isSearchable
                name="seniority"
                loadingMessage="Please wait loading"
                placeholder="Select Seniority"
                onChange={(value) => onSelectChange('seniority', value)}
                options={[{
                  label: 'Middle',
                  value: 'Middle',
                },
                {
                  label: 'High',
                  value: 'High',
                }]}
                value={seniority}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Class</label>
            <div className="col-sm-8">
              <Select
                isSearchable
                name="class_id"
                loadingMessage="Please wait loading"
                placeholder="Select Class"
                onChange={(value) => onSelectChange('class_id', value)}
                options={classes?.map((classItem) => ({
                  label: classItem.class_name, value: classItem.class_id,
                }))}
                value={class_id}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Enrollment Date</label>
            <div className="col-sm-8">
              <DatePicker
                showYearDropdown
                showMonthDropdown
                id='enrollment_date'
                name='enrollment_date'
                customInput={<DateCalenderInput />}

                dateFormat="MM/dd/yyyy"
                maxDate={new Date()}
                title="Click to select a date of birth"
                placeholderText="Click to select a date of birth"
                className="form-control datePicker"
                onChange={(date) => {
                  const payload = {
                    ...form,
                    enrollment_date: date,
                  };

                  dispatch(updateEnrollmentForm(payload));
                }}
                selected={enrollment_date}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">First Enrollment Date</label>
            <div className="col-sm-8">
              <DatePicker
                showYearDropdown
                showMonthDropdown
                id='first_enrollment_date'
                name='first_enrollment_date'
                customInput={<DateCalenderInput />}

                dateFormat="MM/dd/yyyy"
                maxDate={new Date()}
                title="Click to select a date of birth"
                placeholderText="Click to select a date of birth"
                className="form-control datePicker"
                onChange={(date) => {
                  const payload = {
                    ...form,
                    first_enrollment_date: date,
                  };

                  dispatch(updateEnrollmentForm(payload));
                }}
                selected={first_enrollment_date}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">School Year</label>
            <div className="col-sm-8">
              <DatePicker
                showYearDropdown
                showMonthDropdown
                id='school_year'
                name='school_year'
                customInput={<DateCalenderInput />}
                dateFormat="MM/dd/yyyy"
                maxDate={new Date()}
                title="Click to select a date of birth"
                placeholderText="Click to select a date of birth"
                className="form-control datePicker"
                onChange={(date) => {
                  const payload = {
                    ...form,
                    school_year: date,
                  };

                  dispatch(updateEnrollmentForm(payload));
                }}
                selected={school_year}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Type of student</label>
            <div className="col-sm-8">
              <Select
                isSearchable
                name="type_of_student"
                loadingMessage="Please wait loading"
                placeholder="Select Type of Student"
                onChange={(value) => onSelectChange('type_of_student', value)}
                options={[
                  {
                    label: 'Redoubling',
                    value: 'Redoubling',
                  },
                  {
                    label: 'Not redoubling',
                    value: 'Not redoubling',
                  },
                ]}
                value={type_of_student}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Phone Number</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="student_phone_no"
                name="student_phone_no"
                placeholder="Enter First Name"
                onChange={onChange}
                value={student_phone_no}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentInfo;
