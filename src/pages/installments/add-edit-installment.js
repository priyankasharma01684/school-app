import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { push } from 'connected-react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { createInstallment, editInstallment, fetchSingleInstallment, updateInstallmentForm } from '../../actions/installment-action-type';
import { fetchSchoolYear } from '../../actions/school-year-action-type';
import { fetchGrade } from '../../actions/grades-action-types';
import { Button, DateCalenderInput } from '../../components';
import Alert from '../../utility/alert';

export const AddEditInstallment = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditViewMode = params.publicId;
  const [isEditable, setEdit] = React.useState(false);
  const disabled = isEditViewMode && !isEditable;
  const {
    form, schoolyears, grades,
  } = useSelector((store) => (
    {
      form: store.installment.form,
      grades: store.grades.grades,
      schoolyears: store.schoolYears.schoolYears,
    }));

  const {
    school_year_id,
    grade_id,
    installment,
    amount_to_pay,
    deadline_installment,
    number_of_days_before_late_payment,
  } = form;

  React.useEffect(() => {
    const request = { filter: 'active' };

    dispatch(fetchSchoolYear(request));
    dispatch(fetchGrade(request));

    if (params && params.publicId) {
      dispatch(fetchSingleInstallment(isEditViewMode));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updateInstallmentForm(updates));
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    dispatch(updateInstallmentForm(updates));
  };

  const onSave = () => {
    if (!amount_to_pay.trim().length) {
      Alert.alert('Installment Code is required');

      return;
    }

    if (!installment.trim().length) {
      Alert.alert('Installment Label is required');

      return;
    }

    if (isEditViewMode) {
      dispatch(editInstallment(form));
    } else {
      dispatch(createInstallment(form));
    }
  };

  const onNavigate = () => dispatch(push('/Installments'));

  return (
    <>
      <div className="mb-3 card">
        <div className="card-header-tab card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
            {disabled ? 'View Installment Installments' : `${params.publicId ? 'Edit Installment' : 'Add New Installment'}`}
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
                    <label className="col-sm-4 mb-0"> *School Year</label>
                    <div className="col-sm-8">
                      <Select
                        isSearchable
                        isDisabled={disabled}
                        name="school_year_id"
                        loadingMessage="Please wait loading"
                        placeholder="Select School  Year"
                        onChange={(value) => onSelectChange('school_year_id', value)}
                        options={schoolyears.map((schoolYear) => ({
                          label: `${schoolYear.school_start_year} / ${schoolYear.school_end_year}`,
                          value: schoolYear.school_year_id,
                        }))}
                        value={school_year_id}
                      />
                    </div>
                  </div>
                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*Grade</label>
                    <div className="col-sm-8">
                      <Select
                        isSearchable
                        isDisabled={disabled}
                        name="grade_id"
                        loadingMessage="Please wait loading"
                        placeholder="Select Grade"
                        onChange={(value) => onSelectChange('grade_id', value)}
                        options={grades.map((grade) => ({
                          label: grade.grade_name,
                          value: grade.grade_id,
                        }))}
                        value={grade_id}
                      />
                    </div>
                  </div>
                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*Installment  </label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="installment"
                        name="installment"
                        placeholder="Enter Label"
                        onChange={onChange}
                        value={installment}
                      />
                    </div>
                  </div>
                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*Amount</label>
                    <div className="col-sm-8">
                      <input
                        min={0}
                        type='number'
                        disabled={disabled}
                        className="form-control"
                        id="amount_to_pay"
                        name="amount_to_pay"
                        placeholder="Enter Amount"
                        onChange={onChange}
                        value={amount_to_pay}
                      />
                    </div>
                  </div>

                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*Installment Deadline</label>
                    <div className="col-sm-8">
                      <DatePicker
                        showMonthDropdown
                        showYearDropdown
                        id='deadline_installment'
                        name='deadline_installment'
                        customInput={<DateCalenderInput />}
                        disabled={disabled}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        title="Click to select a Installment Deadline Date"
                        placeholderText="Click to select a Installment Deadline Date"
                        className="form-control datePicker"
                        onChange={(date) => {
                          const payload = {
                            ...form,
                            deadline_installment: date,
                            // number_of_days_before_late_payment: moment(date, 'dd/MM/yyyy').diff(moment(), 'days') + 1,
                          };

                          dispatch(updateInstallmentForm(payload));
                        }}
                        selected={deadline_installment}
                      />

                    </div>
                  </div>

                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*Number of days before being almost late for payment</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="number_of_days_before_late_payment"
                        name="number_of_days_before_late_payment"
                        placeholder="Number of days before being almost late for payment"
                        onChange={onChange}
                        value={number_of_days_before_late_payment}
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

export default AddEditInstallment;
