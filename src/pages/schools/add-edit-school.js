import React from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';
import { Button } from '../../components';
import { addSchool, editSchool, fetchCities, fetchSingleSchool, fetchCountries, fetchSchoolCategories, updateSchoolForm } from '../../actions/schools-action-types';
import Regex from '../../utility/regex';
import Utils from '../../utility';
import { USER_SCHOOL_ADMIN, USER_SUPER_ADMIN } from '../../constants';
import Alert from '../../utility/alert';

const AddEditSchool = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditViewMode = params.publicId;
  const [isEditable, setEdit] = React.useState(false);
  const disabled = isEditViewMode && !isEditable;
  const {
    cities, counties, form, schoolCategories, user,
  } = useSelector((store) => ({
    cities: store.schools.cities,
    counties: store.schools.counties,
    form: store.schools.form,
    schoolCategories: store.schools.schoolCategories,
    user: store.user.userDetail,
  }));

  const {
    school_name,
    school_email,
    school_phone_no,
    school_address,
    country_id,
    city_id,
    school_licence_number,
    school_category_id,
    school_status,
    region,
    street,
    number,
    neighborhood,
    regional_delegation,
    subdivision_delegation,
    file,
  } = form;

  React.useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchSchoolCategories());
    dispatch(fetchCities());

    if (params && params.publicId) {
      dispatch(fetchSingleSchool(params.publicId));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updateSchoolForm(updates));
  };

  const onFileChange = (event) => {
    if (!event?.target?.files?.length) {
      return;
    }

    const cloneFiles = [...event.target.files];
    const updates = {
      ...form,
      file: URL.createObjectURL(cloneFiles[0]),
      school_logo: event.target.files[0],
    };

    dispatch(updateSchoolForm(updates));
  };

  const onSave = () => {
    if (!school_name.trim().length) {
      Alert.alert('School name is required');

      return;
    }

    if (!school_email.trim().length || !Regex.email(school_email)) {
      Alert.alert('School email is required');

      return;
    }

    if (!school_phone_no.trim().length || !Regex.mobile(school_phone_no)) {
      Alert.alert('Enter a valid phon number');

      return;
    }

    if (!country_id) {
      Alert.alert('Country is required');

      return;
    }

    if (!city_id) {
      Alert.alert('City is required');

      return;
    }

    if (!school_category_id) {
      Alert.alert('School Category is required');

      return;
    }
    if (!school_licence_number.trim().length) {
      Alert.alert('School Licence number is required');

      return;
    }

    if (!school_status) {
      Alert.alert('Status is required');

      return;
    }

    if (!school_address.trim().length) {
      Alert.alert('School address is required');

      return;
    }

    if (!region.trim().length) {
      Alert.alert('Region is required');

      return;
    }

    if (!street.trim().length) {
      Alert.alert('Street is required');

      return;
    }

    if (!number.trim().length) {
      Alert.alert('Number is required');

      return;
    }

    if (!neighborhood.trim().length) {
      Alert.alert('Neighborhood is required');

      return;
    }

    if (!regional_delegation.trim().length) {
      Alert.alert('Regional Delegation is required');

      return;
    }

    if (!subdivision_delegation.trim().length) {
      Alert.alert('Subdivision Delegation is required');

      return;
    }

    if (params && params.publicId) {
      dispatch(editSchool(form));
    } else {
      dispatch(addSchool(form));
    }
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    dispatch(updateSchoolForm(updates));
  };

  const onNavigate = () => dispatch(push('/schools'));

  return (
    <div className="mb-3 card">
      <div className="card-header-tab card-header">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
          {user?.user_type_id === USER_SUPER_ADMIN && (disabled ? 'View School' : `${params.publicId ? 'Edit School' : 'Add New School'}`)}
          {user?.user_type_id === USER_SCHOOL_ADMIN ? `${school_name} Details` : ''}
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
              <div className="col-sm-10 m-auto">
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">*School Logo</label>
                  <div className="col-sm-8">
                    <div className="avatar-icon-wrapper btn-hover-shine mb-2 avatar-icon-xxl">
                      <div className="avatar-icon rounded editProfile">
                        <img src={file || Utils.getImage('user-placeholder.png')} alt="" />
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
                  <label className="col-sm-4 mb-0">*School Name</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      name="school_name"
                      placeholder="Enter School Name"
                      onChange={onChange}
                      value={school_name}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">*Licence Number</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      id="school_licence_number"
                      name="school_licence_number"
                      placeholder="Enter Licence Number"
                      onChange={onChange}
                      value={school_licence_number}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">*Email ID</label>
                  <div className="col-sm-8">
                    <input
                      type='email'
                      disabled={disabled}
                      className="form-control"
                      id="school_email"
                      name="school_email"
                      placeholder="Enter Email ID"
                      onChange={onChange}
                      value={school_email}
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
                      id="school_phone_no"
                      name="school_phone_no"
                      placeholder=" Enter Phone Number"
                      onChange={onChange}
                      value={school_phone_no}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">*Category</label>
                  <div className="col-sm-8">
                    <Select
                      isSearchable
                      isDisabled={disabled}
                      name="seniority"
                      loadingMessage="Please wait loading"
                      placeholder="Select Category"
                      onChange={(value) => onSelectChange('school_category_id', value)}
                      options={schoolCategories.map((cat) => ({
                        label: cat.school_category,
                        value: cat.school_category_id,
                      }))}
                      value={school_category_id}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">&nbsp;Plot Number</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      id="number"
                      name="number"
                      placeholder="Enter Plot Number"
                      onChange={onChange}
                      value={number}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">&nbsp;Street</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      id="street"
                      name="street"
                      placeholder="Enter Street"
                      onChange={onChange}
                      value={street}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">*Address</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      id="school_address"
                      name="school_address"
                      placeholder="Enter Address"
                      onChange={onChange}
                      value={school_address}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">&nbsp;Neighborhood / Landmark</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      id="neighborhood"
                      name="neighborhood"
                      placeholder="Enter Neighborhood / Landmark"
                      onChange={onChange}
                      value={neighborhood}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">&nbsp;Region</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      id="region"
                      name="region"
                      placeholder="Enter Region"
                      onChange={onChange}
                      value={region}
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
                  <label className="col-sm-4 mb-0">*City</label>
                  <div className="col-sm-8">
                    <Select
                      isDisabled={disabled}
                      isSearchable
                      name="city_id"
                      loadingMessage="Please wait loading"
                      placeholder="Select City"
                      onChange={(value) => onSelectChange('city_id', value)}
                      options={
                        country_id
                          ? cities
                            ?.filter((city) => city.country_id.toString() === country_id?.value.toString())
                            .map((country) => ({
                              label: country.city_name, value: country.city_id,
                            }))
                          : []
                      }
                      value={city_id}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">&nbsp;Regional Delegation</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      id="regional_delegation"
                      name="regional_delegation"
                      placeholder="Enter Regional Delegation"
                      onChange={onChange}
                      value={regional_delegation}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">&nbsp;Subdivisional Delegation</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      id="subdivision_delegation"
                      name="subdivision_delegation"
                      placeholder="Enter Subdivisional Delegation"
                      onChange={onChange}
                      value={subdivision_delegation}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">*Status</label>
                  <div className="col-sm-8">
                    <Select
                      isSearchable
                      isDisabled={disabled}
                      name="school_status"
                      loadingMessage="Please wait loading"
                      placeholder="Select Status"
                      value={school_status}
                      onChange={(value) => onSelectChange('school_status', value)}
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
              </div>
              <div className="col-sm-6 pl-4" />
              {!disabled && (
                <div className="col-sm-12 actions text-center mt-4 mb-2 pt-1">
                  <Button className="btn-pill btn-shadow btn-wide btn btn-success mx-1" onClick={onSave}>
                    Save
                  </Button>
                  {user?.user_type_id === USER_SCHOOL_ADMIN ? (
                    <Button className="btn-pill btn-shadow btn-wide btn btn-primary d-none mx-1" onClick={onNavigate}>
                      Back
                    </Button>
                  )
                    : (
                      <Button className="btn-pill btn-shadow btn-wide btn btn-primary mx-1" onClick={onNavigate}>
                        Back
                      </Button>
                    )}

                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditSchool;
