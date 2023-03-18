
import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { func, shape, string } from 'prop-types';
import PhoneInput, { getCountryCallingCode, isValidPhoneNumber } from 'react-phone-number-input';
import DateCalenderInput from '../../../components/date-calender-input';
import 'react-phone-number-input/style.css';

const ParentInfo = ({
  form,
  form: {
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
  },
  updateEnrollmentForm,
}) => {
  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    updateEnrollmentForm(updates);
  };
  const onPhoneChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
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

  return (
    <div className="tab-pane show fade active" id="step-2">
      <div className="row mt-4">
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Father’s First Name</label>
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
            <label className="col-sm-4 mb-0">Father’s last name</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="father_last_name"
                name="father_last_name"
                placeholder="Enter last Name"
                onChange={onChange}
                value={father_last_name}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Father's Phone Number</label>
            <div className="col-sm-8 calendar-icon">
              <span className="btn-icon-wrapper pr-1 opacity-5 icon ml-2 pl-1">
                <p> + </p>
              </span>

              <PhoneInput
                className="form-control"
                defaultCountry="US"
                id="father_phone_no"
                name="father_phone_no"
                placeholder="Enter Student Phone Number"
                onChange={onPhoneChange}
                value={father_phone_no}
                countrySelectProps={{ getCountryCallingCode }}
              />
              <span error>
                {father_phone_no
                    && (isValidPhoneNumber(father_phone_no)
                      ? undefined
                      : 'Invalid Phone Number')}

              </span>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Father's Email Address</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="father_email_address"
                name="father_email_address"
                placeholder="Enter Email Address"
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
                placeholder="Enter Last Name"
                onChange={onChange}
                value={mother_last_name}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Mother's Phone Number</label>
            <div className="col-sm-8 calendar-icon">

              <PhoneInput
                className="form-control"
                defaultCountry="US"
                id="mother_phone_no"
                name="mother_phone_no"
                placeholder="Enter Student Phone Number"
                onChange={onPhoneChange}
                value={mother_phone_no}
                countrySelectProps={{ getCountryCallingCode }}
              />
              <span error>
                {mother_phone_no
                    && (isValidPhoneNumber(mother_phone_no)
                      ? undefined
                      : 'Invalid Phone Number')}

              </span>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Mother's Email Address</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="mother_email_address"
                name="mother_email_address"
                placeholder="Enter Email Address"
                onChange={onChange}
                value={mother_email_address}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Tutor’s First Name</label>
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
            <label className="col-sm-4 mb-0">Tutor's Last Name</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="tutor_last_name"
                name="tutor_last_name"
                placeholder="Enter Last Name"
                onChange={onChange}
                value={tutor_last_name}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Tutor's Phone Number</label>
            <div className="col-sm-8 calendar-icon">

              <PhoneInput
                className="form-control"
                defaultCountry="US"
                id="tutor_phone_no"
                name="tutor_phone_no"
                placeholder="Enter Student Phone Number"
                onChange={onPhoneChange}
                value={mother_phone_no}
                countrySelectProps={{ getCountryCallingCode }}
              />
              <span error>
                {mother_phone_no
                    && (isValidPhoneNumber(tutor_phone_no)
                      ? undefined
                      : 'Invalid Phone Number')}

              </span>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Tutor's Email Address</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="tutor_email_address"
                name="tutor_email_address"
                placeholder="Enter Email Address"
                onChange={onChange}
                value={tutor_email_address}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Tutor's Birth date</label>
            <div className="col-sm-8">
              <DatePicker
                showYearDropdown
                showMonthDropdown
                id='tutor_date_of_birth'
                name='tutor_date_of_birth'
                customInput={<DateCalenderInput />}
                dateFormat="MM/dd/yyyy"
                maxDate={new Date()}
                title="Click to select a date of birth"
                placeholderText="Click to select a date of birth"
                className="form-control datePicker"
                onChange={(date) => onSelectChange('tutor_date_of_birth', date)}
                selected={tutor_date_of_birth}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Tutor's Gender</label>
            <div className="col-sm-8">
              <Select
                isSearchable
                name="tutor_gender"
                loadingMessage="Please wait loading"
                placeholder="Select Gender"
                onChange={(value) => onSelectChange('tutor_gender', value)}
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
                value={tutor_gender}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ParentInfo.propTypes = {
  form: shape({
    father_first_name: string,
    father_last_name: string,
  }).isRequired,
  updateEnrollmentForm: func.isRequired,
};

export default ParentInfo;
