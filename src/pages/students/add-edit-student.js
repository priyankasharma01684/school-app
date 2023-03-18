import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { push } from 'connected-react-router';
import { createStudent, editStudent, fetchSingleStudent, updateStudentForm } from '../../actions/students-action-types';
import { fetchClasses } from '../../actions/classes-action-types';
import { fetchSchoolYear } from '../../actions/school-year-action-type';
import { fetchSchools, fetchCities, fetchCountries, fetchSchoolCategories } from '../../actions/schools-action-types';
import { Button, DateCalenderInput } from '../../components';
import Regex from '../../utility/regex';
import AddViewParent from './add-view-parent';
import Utils from '../../utility';
import Alert from '../../utility/alert';
import PhoneNumberValidate from '../../utility/phone-number-validate';

export const AddEditStudent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditViewMode = params.publicId;
  const [visible, setVisible] = React.useState(false);
  const [isEditable, setEdit] = React.useState(false);
  const disabled = isEditViewMode && !isEditable;
  const {
    cities, counties, classes, form, schoolYears,
  } = useSelector((store) => ({
    cities: store.schools.cities,
    classes: store.classes.classes,
    counties: store.schools.counties,
    form: store.students.form,
    schoolYears: store.schoolYears.schoolYears,
  }));

  const {
    age,
    file,
    class_id,
    country_id,
    date_of_birth,
    enrollment_date,
    gender,
    place_of_birth,
    school_year_id,
    section,
    student_first_name,
    student_id,
    student_last_name,
    student_phone_no,
    type_of_student,
    student_email,
    student_address,
    student_registration_no,
    status,
    neighborhood,
    street,
  } = form;
  const options = classes ? [...classes].map((singleClass) => ({
    label: singleClass.class_name, value: singleClass.class_id,
  })) : [];

  React.useEffect(() => {
    const request = { filter: 'active' };

    dispatch(fetchClasses(request));
    dispatch(fetchSchools(request));
    dispatch(fetchCountries());
    dispatch(fetchSchoolCategories());
    dispatch(fetchSchoolYear());
    dispatch(fetchCities());

    if (params && params.publicId) {
      dispatch(fetchSingleStudent(params.publicId));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updateStudentForm(updates));
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    dispatch(updateStudentForm(updates));
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

    dispatch(updateStudentForm(updates));
  };

  const onSave = () => {
    if (!Regex.username(student_first_name)) {
      Alert.alert('First name is not valid');

      return;
    }
    if (!Regex.username(student_last_name)) {
      Alert.alert('Last name is not valid');

      return;
    }

    if (!class_id) {
      Alert.alert('Class is required');

      return;
    }

    if (!student_email.trim().length) {
      Alert.alert('School email is required');

      return;
    }

    if (!Regex.email(student_email)) {
      Alert.alert('School email is not valid');

      return;
    }

    if (!student_phone_no.trim().length) {
      Alert.alert('Phone number is required');

      return;
    }

    if (!Regex.mobile(student_phone_no) && !PhoneNumberValidate.number(student_phone_no)) {
      Alert.alert('Enter a valid phone number');

      return;
    }
    if (!gender) {
      Alert.alert('Gender is required');

      return;
    }

    if (!age.toString().trim().length) {
      Alert.alert('Age is required');

      return;
    }

    if (!date_of_birth) {
      Alert.alert('Date of birth is required');

      return;
    }

    if (!place_of_birth.trim().length) {
      Alert.alert('Place of birth is required');

      return;
    }

    if (!country_id) {
      Alert.alert('Country is required');

      return;
    }

    if (!student_registration_no.trim().length) {
      Alert.alert('Student Registration number is required');

      return;
    }

    if (!status) {
      Alert.alert('Status is required');

      return;
    }

    if (!student_address.trim().length) {
      Alert.alert('Student address is required');

      return;
    }

    if (student_id) {
      dispatch(editStudent(form));
    } else {
      dispatch(createStudent(form));
    }
  };

  const onNavigate = () => dispatch(push('/school-students'));

  return (
    <>
      <div className="mb-3 card">
        <div className="card-header-tab card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
            {disabled ? 'View School Students' : `${params.publicId ? 'Edit Student' : 'Add New Student'}`}
          </div>
          {disabled && (
            <div className="actions">
              <Button
                onClick={() => setEdit(true)}
                className="btn-pill btn-shadow btn-wide btn btn-sm btn-info text-capitalize"
              >
                <span className="btn-icon-wrapper pr-1 opacity-7">
                  <i className="lnr-pencil"> </i>
                </span>
                Edit
              </Button>
            </div>
          )}
        </div>
        <div className="main-card mb-1 card-body">
          <div className="row px-2">
            <div className="card-body col-sm-12 py-0 px-2">
              <form noValidate className="row" autoComplete="off">
                <div className="col-sm-6 pr-4">
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*First Name</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="student_first_name"
                        name="student_first_name"
                        placeholder="Enter First Name"
                        onChange={onChange}
                        value={student_first_name}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Last Name</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="student_last_name"
                        name="student_last_name"
                        placeholder="Enter Last Name"
                        onChange={onChange}
                        value={student_last_name}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Class</label>
                    <div className="col-sm-8">
                      <Select
                        isDisabled={disabled}
                        isSearchable
                        name="class_id"
                        loadingMessage="Please wait loading"
                        placeholder="Select Class"
                        onChange={(value) => onSelectChange('class_id', value)}
                        options={options}
                        value={class_id}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Email Address</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        name="student_email"
                        placeholder="Enter Email Address"
                        onChange={onChange}
                        value={student_email}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Phone Number</label>
                    <div className="col-sm-8  calendar-icon">
                      <span className="btn-icon-wrapper pr-1 opacity-5 icon ml-2 pl-1">
                        <p> + </p>
                      </span>
                      <input
                        disabled={disabled}
                        className="form-control"
                        name=" student_phone_no"
                        placeholder=" Enter Phone Number"
                        onChange={onChange}
                        value={student_phone_no}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">Profile Picture</label>
                    <div className="col-sm-8">
                      <div className="avatar-icon-wrapper btn-hover-shine mb-2 avatar-icon-xxl">
                        <div className="avatar-icon rounded editProfile">
                          <img src={file || Utils.getImage('user-placeholder.png')} alt="Student" />
                          {!disabled && (
                            <div className="icon">
                              <i className="lnr-pencil" />
                              <input disabled={disabled} accept=".jpeg, .png, .jpg" type="file" onChange={onFileChange} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Registration Number</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        name="student_registration_no"
                        placeholder="Enter Registration Number"
                        onChange={onChange}
                        value={student_registration_no}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Address</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        name="student_address"
                        placeholder="Enter Address"
                        onChange={onChange}
                        value={student_address}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Date of Birth</label>
                    <div className="col-sm-8">
                      <DatePicker
                        showYearDropdown
                        showMonthDropdown
                        id='date_of_birth'
                        name='date_of_birth'
                        customInput={<DateCalenderInput />}
                        disabled={disabled}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        title="Click to select a date of birth"
                        placeholderText="Click to select a date of birth"
                        className="form-control datePicker"
                        onChange={(date) => {
                          const payload = {
                            ...form,
                            age: moment().diff(moment(date, 'dd/MM/yyyy'), 'years'),
                            date_of_birth: date,
                          };

                          dispatch(updateStudentForm(payload));
                        }}
                        selected={date_of_birth}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">Age</label>
                    <div className="col-sm-8">
                      <input
                        disabled
                        className="form-control"
                        name="age"
                        placeholder="Enter Age"
                        onChange={onChange}
                        value={age}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Place of Birth</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        name="place_of_birth"
                        placeholder="Place of birth"
                        onChange={onChange}
                        value={place_of_birth}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Gender</label>
                    <div className="col-sm-8">
                      <Select
                        isDisabled={disabled}
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
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Country</label>
                    <div className="col-sm-8">
                      <Select
                        isDisabled={disabled}
                        isSearchable
                        name="country_id"
                        loadingMessage="Please wait loading"
                        placeholder="Select Country"
                        onChange={(value) => onSelectChange('country_id', value)}
                        options={counties?.map((country) => ({
                          label: country.country_name, value: country.country_id,
                        }))}
                        value={country_id}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Status</label>
                    <div className="col-sm-8">
                      <Select
                        isSearchable
                        isDisabled={disabled}
                        name="status"
                        loadingMessage="Please wait loading"
                        placeholder="Select Status"
                        value={status}
                        onChange={(value) => onSelectChange('status', value)}
                        options={[
                          {
                            label: 'Active',
                            value: 1,
                          },
                          {
                            label: 'Inactive',
                            value: 0,
                          },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">Neighborhood</label>
                    <div className="col-sm-8">
                      <input
                        className="form-control"
                        disabled={disabled}
                        id="neighborhood"
                        name="neighborhood"
                        placeholder="Enter Neighborhood"
                        onChange={onChange}
                        value={neighborhood}
                      />
                    </div>
                  </div>

                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">Street</label>
                    <div className="col-sm-8">
                      <input
                        className="form-control"
                        disabled={disabled}
                        id="street"
                        name="street"
                        placeholder="Enter Street"
                        onChange={onChange}
                        value={street}
                      />
                    </div>
                  </div>

                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Nationality</label>
                    <div className="col-sm-8">
                      <Select
                        isDisabled={disabled}
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

                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Section</label>
                    <div className="col-sm-8">
                      <Select
                        isDisabled={disabled}
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

                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Class</label>
                    <div className="col-sm-8">
                      <Select
                        isDisabled={disabled}
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

                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Enrollment Date</label>
                    <div className="col-sm-8">
                      <DatePicker
                        disabled={disabled}
                        showYearDropdown
                        showMonthDropdown
                        id='enrollment_date'
                        name='enrollment_date'
                        customInput={<DateCalenderInput />}
                        dateFormat="dd/MM/yyyy"
                        title="Click to select enrollment date"
                        placeholderText="Click to select enrollment date"
                        className="form-control datePicker"
                        onChange={(date) => {
                          const payload = {
                            ...form,
                            enrollment_date: date,
                          };

                          updateStudentForm(payload);
                        }}
                        selected={enrollment_date}
                      />
                    </div>
                  </div>

                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*School Year</label>
                    <div className="col-sm-8">
                      <Select
                        isDisabled={disabled}
                        isSearchable
                        name="school_year_id"
                        loadingMessage="Please wait loading"
                        placeholder="Select School  Year"
                        onChange={(value) => onSelectChange('school_year_id', value)}
                        options={schoolYears.map((schoolYear) => ({
                          label: `${schoolYear.school_start_year} / ${schoolYear.school_end_year}`,
                          value: schoolYear.school_year_id,
                        }))}
                        value={school_year_id}
                      />
                    </div>
                  </div>

                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Type of student</label>
                    <div className="col-sm-8">
                      <Select
                        isDisabled={disabled}
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

                <div className="col-sm-6 border-left pl-4">
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">Parent 1</label>
                    <div className="col-sm-8">
                      <Button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#addingParentInfo"
                        onClick={() => setVisible(true)}
                      >
                        Add Parent 1
                      </Button>
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">Parent 2</label>
                    <div className="col-sm-8">
                      <Button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#addingParentInfo"
                        onClick={() => setVisible(true)}
                      >
                        Add Parent 2
                      </Button>
                    </div>
                  </div>
                </div>
                {!disabled && (
                  <div className="col-sm-12 actions text-center mt-4 mb-2 pt-1">
                    <Button className="btn-pill btn-shadow btn-wide btn btn-success mx-1" onClick={onSave}>
                      Save
                    </Button>
                    <Button className="btn-pill btn-shadow btn-wide btn btn-primary mx-1" onClick={onNavigate}>
                      Back
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {visible && <AddViewParent isDisabled={disabled} onSave={() => setVisible(false)} onClose={() => setVisible(false)} />}
    </>
  );
};

export default AddEditStudent;
