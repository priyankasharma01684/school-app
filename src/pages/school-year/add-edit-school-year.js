import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { push } from 'connected-react-router';
import { createSchoolYear, editSchoolYear, fetchSingleSchoolYear, updateSchoolYearForm } from '../../actions/school-year-action-type';
import Alert from '../../utility/alert';
import { Button, DateCalenderInput } from '../../components';

export const AddEditSchoolYear = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditViewMode = params.publicId;
  const [isEditable, setEdit] = React.useState(false);
  const disabled = isEditViewMode && !isEditable;
  const { form } = useSelector((store) => ({ form: store.schoolYears.form }));

  const {
    school_start_year,
    back_to_school_date,
    school_year_end_date,
    school_end_year,
    registration_start_date,
  } = form;

  React.useEffect(() => {
    if (params && params.publicId) {
      dispatch(fetchSingleSchoolYear(isEditViewMode));
    }
  }, []);

  const onSave = () => {
    if (!school_start_year) {
      Alert.alert('School Year  is required');

      return;
    }

    if (!back_to_school_date) {
      Alert.alert('School Date  is required');

      return;
    }
    if (!registration_start_date) {
      Alert.alert('Registration start Date  is required');

      return;
    }
    if (!school_year_end_date) {
      Alert.alert('Registration Start Date  is required');

      return;
    }

    if (moment(registration_start_date).format('x') > moment(school_year_end_date).format('x')) {
      Alert.alert('End date can not be before start date.');

      return;
    }
    if (moment(school_start_year).format('x') > moment(school_end_year).format('x')) {
      Alert.alert('End date can not be before start date.');

      return;
    }

    if (isEditViewMode) {
      dispatch(editSchoolYear(form));
    } else {
      dispatch(createSchoolYear(form));
    }
  };

  const onNavigate = () => dispatch(push('/school-year'));

  return (
    <>
      <div className="mb-3 card">
        <div className="card-header-tab card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
            {disabled ? 'View School Year' : `${params.publicId ? 'Edit School Year' : 'Add New School Year'}`}
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
            <div className="card-body col-sm-12 py-2 px-2">
              <form noValidate className="row py-2 px-2 mx-0" autoComplete="off">
                <div className="col-sm-12 pr-4">
                  <div className="form-group row mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">   *School Start Year  </label>
                    <div className="col-sm-8">
                      <DatePicker
                        showMonthDropdown
                        showYearDropdown
                        id='school_start_year'
                        name='school_start_year'
                        customInput={<DateCalenderInput />}
                        disabled={disabled}
                        dateFormat="yyyy"
                        title="Click to select a School Year"
                        showYearPicker
                        placeholderText="Click to select a school year"
                        className="form-control datePicker"
                        onChange={(date) => {
                          const payload = {
                            ...form,
                            school_start_year: date,
                          };

                          dispatch(updateSchoolYearForm(payload));
                        }}
                        selected={school_start_year}
                      />
                    </div>
                  </div>

                  <div className="form-group row mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">   *School End Year  </label>
                    <div className="col-sm-8">
                      <DatePicker
                        showMonthDropdown
                        showYearDropdown
                        id='school_end_year'
                        name='school_end_year'
                        customInput={<DateCalenderInput />}
                        disabled={disabled}
                        dateFormat="yyyy"
                        title="Click to select a School Year"
                        showYearPicker
                        placeholderText="Click to select a school year"
                        className="form-control datePicker"
                        onChange={(date) => {
                          const payload = {
                            ...form,
                            school_end_year: date,
                          };

                          dispatch(updateSchoolYearForm(payload));
                        }}
                        selected={school_end_year}
                      />
                    </div>
                  </div>
                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*School Year Start Date</label>
                    <div className="col-sm-8">
                      <DatePicker
                        showMonthDropdown
                        showYearDropdown
                        id='back_to_school_date'
                        name='back_to_school_date'
                        customInput={<DateCalenderInput />}
                        disabled={disabled}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        title="Click to select a School Date"
                        placeholderText="Click to select a school year"
                        className="form-control datePicker"
                        onChange={(date) => {
                          const payload = {
                            ...form,
                            back_to_school_date: date,
                          };

                          dispatch(updateSchoolYearForm(payload));
                        }}
                        selected={back_to_school_date}
                      />
                    </div>
                  </div>
                  <div className="form-group row mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*School Year End Date</label>
                    <div className="col-sm-8">
                      <DatePicker
                        showMonthDropdown
                        showYearDropdown
                        id='school_year_end_date'
                        name='school_year_end_date'
                        customInput={<DateCalenderInput />}
                        disabled={disabled}
                        dateFormat="dd/MM/yyyy"
                        title="Click to select a School Year"
                        placeholderText="Click to select a date"
                        className="form-control datePicker"
                        onChange={(date) => {
                          const payload = {
                            ...form,
                            school_year_end_date: date,
                          };

                          dispatch(updateSchoolYearForm(payload));
                        }}
                        selected={school_year_end_date}
                      />

                    </div>
                  </div>
                  <div className="form-group row mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*Registration Start Date</label>
                    <div className="col-sm-8">
                      <DatePicker
                        showMonthDropdown
                        showYearDropdown
                        id='registration_start_date'
                        name='registration_start_date'
                        customInput={<DateCalenderInput />}
                        disabled={disabled}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        title="Click to select a Registration Start Date"
                        placeholderText="Click to select a school year"
                        className="form-control datePicker"
                        onChange={(date) => {
                          const payload = {
                            ...form,
                            registration_start_date: date,
                          };

                          dispatch(updateSchoolYearForm(payload));
                        }}
                        selected={registration_start_date}
                      />
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
    </>
  );
};

export default AddEditSchoolYear;
