import React from 'react';
import { func, shape, string } from 'prop-types';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import PhoneInput, { getCountryCallingCode, isValidPhoneNumber } from 'react-phone-number-input';
import DateCalenderInput from '../../../components/date-calender-input';
import Utils from '../../../utility';
import 'react-phone-number-input/style.css';

export const StudentInfo = ({
  classes,
  counties,
  form,
  form: {
    file,
    class_id,
    country_id,
    date_of_birth,
    enrollment_date,
    // first_enrollment_date,
    gender,
    grade_id,
    place_of_birth,
    school_year,
    section,
    // seniority,
    student_first_name,
    student_last_name,
    student_phone_no,
    type_of_student,
    student_email,
    student_address,
    status,
    neighborhood,
    street,
  },
  grades,
  schoolYears,
  updateEnrollmentForm,
}) => {
  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    updateEnrollmentForm(updates);
  };
  const onPhoneChange = (value) => {
    const updates = {
      ...form,
      student_phone_no: value,
    };

    updateEnrollmentForm(updates);
  };
  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    updateEnrollmentForm(updates);
  };

  const onFileChange = (event) => {
    if (!event?.target?.files?.length) {
      return;
    }

    const cloneFiles = [...event.target.files];
    const updates = {
      ...form,
      file: URL.createObjectURL(cloneFiles[0]),
      student_profile_picture: event.target.files[0],
    };

    updateEnrollmentForm(updates);
  };

  return (
    <div className="tab-pane fade show active" id="step-1">
      <div className="row">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group row align-items-center">
                <label className="col-sm-4 mb-0">*Student Photo</label>
                <div className="col-sm-8">
                  <div className="avatar-icon-wrapper btn-hover-shine mb-2 avatar-icon-xxl">
                    <div className="avatar-icon rounded editProfile">
                      <img src={file || Utils.getImage('user-placeholder.png')} alt="" />
                      <div className="icon">
                        <i className="lnr-pencil" />
                        <input accept=".jpeg, .png, .jpg" type="file" onChange={onFileChange} />
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
            <label className="col-sm-4 mb-0">*First  Name</label>
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
            <label className="col-sm-4 mb-0"> *Last Name</label>
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
            <label className="col-sm-4 mb-0"> *Email Address</label>
            <div className="col-sm-8">
              <input
                type='email'
                className="form-control"
                id="student_email"
                name="student_email"
                placeholder="Enter Email Address"
                onChange={onChange}
                value={student_email}
              />
            </div>
          </div>
        </div>
        {/* <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">*Phone Number</label>
            <div className="col-sm-8 calendar-icon">
              <span className="btn-icon-wrapper pr-1 opacity-5 icon ml-2 pl-1">
                <p> + </p>
              </span>
              <input
                className="form-control"
                id="student_phone_no"
                name="student_phone_no"
                placeholder="Enter Student Phone Number"
                onChange={onChange}
                value={student_phone_no}
              />
            </div>
          </div>
        </div> */}

        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">*Phone Number</label>
            <div className="col-sm-8 calendar-icon">
              {/* <span className="btn-icon-wrapper pr-1 opacity-5 icon ml-2 pl-1">
                <p> + </p>
              </span> */}

              <PhoneInput
                className="form-control"
                defaultCountry="US"
                id="student_phone_no"
                name="student_phone_no"
                placeholder="Enter Student Phone Number"
                onChange={onPhoneChange}
                value={student_phone_no}
                countrySelectProps={{ getCountryCallingCode }}
              />
              <span error>
                {student_phone_no
                    && (isValidPhoneNumber(student_phone_no)
                      ? undefined
                      : 'Invalid Phone Number')}

              </span>

            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">*Birth date</label>
            <div className="col-sm-8">

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

                  updateEnrollmentForm(payload);
                }}
                selected={date_of_birth}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">*Place of birth</label>
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
            <label className="col-sm-4 mb-0">*Gender</label>
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
            <label className="col-sm-4 mb-0"> *Neighborhood</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="neighborhood"
                name="neighborhood"
                placeholder="Enter Neighborhood"
                onChange={onChange}
                value={neighborhood}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0"> &nbsp;Street</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="street"
                name="street"
                placeholder="Enter Street"
                onChange={onChange}
                value={street}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">*Address</label>
            <div className="col-sm-8">
              <input
                type='email'
                className="form-control"
                id="student_address"
                name="student_address"
                placeholder="Enter Address"
                onChange={onChange}
                value={student_address}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">*Nationality</label>
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
        {/* <div className="col-sm-6">
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
        </div> */}
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">*Section</label>
            <div className="col-sm-8">
              <Select
                isSearchable
                name="section"
                loadingMessage="Please wait loading"
                placeholder="Select Section"
                onChange={(value) => onSelectChange('section', value)}
                options={[
                  {
                    label: 'English',
                    value: 'English',
                  },
                  {
                    label: 'French',
                    value: 'French',
                  },
                ]}
                value={section}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">*Class</label>
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
            <label className="col-sm-4 mb-0">*Grade</label>
            <div className="col-sm-8">
              <Select
                isSearchable
                name="grade_id"
                loadingMessage="Please wait loading"
                placeholder="Select Grade"
                onChange={(value) => onSelectChange('grade_id', value)}
                options={grades?.map((grade) => ({
                  label: grade.grade_name, value: grade.grade_id,
                }))}
                value={grade_id}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">*Enrollment Date</label>
            <div className="col-sm-8">
              <DatePicker
                showYearDropdown
                showMonthDropdown
                id='enrollment_date'
                name='enrollment_date'
                customInput={<DateCalenderInput />}
                dateFormat="MM/dd/yyyy"
                minDate={new Date()}
                title="Click to select enrollment date"
                placeholderText="Click to select enrollment date"
                className="form-control datePicker"
                onChange={(date) => {
                  const payload = {
                    ...form,
                    enrollment_date: date,
                  };

                  updateEnrollmentForm(payload);
                }}
                selected={enrollment_date}
              />
            </div>
          </div>
        </div>
        {/* <div className="col-sm-6">
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
                title="Click to select first enrollment date"
                placeholderText="Click to select first enrollment date"
                className="form-control datePicker"
                onChange={(date) => {
                  const payload = {
                    ...form,
                    first_enrollment_date: date,
                  };

                  updateEnrollmentForm(payload);
                }}
                selected={first_enrollment_date}
              />
            </div>
          </div>
        </div> */}
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">*School Year</label>
            <div className="col-sm-8">
              <Select
                isSearchable
                name="school_year_id"
                loadingMessage="Please wait loading"
                placeholder="Select School Year"
                onChange={(value) => onSelectChange('school_year', value)}
                options={schoolYears}
                value={school_year}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">*Type of student</label>
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
            <label className="col-sm-4 mb-0">&nbsp; Status</label>
            <div className="col-sm-8">
              <Select
                isSearchable
                name="status"
                loadingMessage="Please wait loading"
                placeholder="Select Status"
                onChange={(value) => onSelectChange('status', value)}
                options={[{
                  label: 'Active',
                  value: 1,
                },
                {
                  label: 'Inactive',
                  value: 0,
                }]}
                value={status}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

StudentInfo.propTypes = {
  classes: shape({ class_name: string }).isRequired,
  counties: shape({ country_name: string }).isRequired,
  form: shape({
    father_first_name: string,
    father_last_name: string,
  }).isRequired,
  grades: shape({ label: string }).isRequired,
  schoolYears: shape({ label: string }).isRequired,
  updateEnrollmentForm: func.isRequired,
};

export default StudentInfo;
