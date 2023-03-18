import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Select from 'react-select';
import { push } from 'connected-react-router';
import { createExpensesForecast, editExpensesForecast, fetchSingleExpensesForecast, updateExpensesForecastForm } from '../../actions/expenses-forecast-action-types';
import { fetchSchoolYear } from '../../actions/school-year-action-type';
import { Button } from '../../components';
import Regex from '../../utility/regex';
import Alert from '../../utility/alert';

export const AddEditForecast = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditViewMode = params.publicId;
  const [isEditable, setEdit] = React.useState(false);
  const disabled = isEditViewMode && !isEditable;
  const {
    years, form,
  } = useSelector((store) => ({
    form: store.expensesForecast.form,
    years: store.schoolYears.schoolYears,
  }));

  const {
    amount,
    month,
    school_year_id,
  } = form;

  const months = moment.months().map((singleMonth) => ({
    label: singleMonth, value: singleMonth,
  }));

  const options = years ? [...years].map((year) => ({
    label: `From ${moment(year.back_to_school_date * 1000).format('MMM yyyy')} to ${moment(year.school_year_end_date * 1000).format('MMM yyyy')}`,
    value: year.school_year_id,
  })) : [];

  React.useEffect(() => {
    const request = { filter: 'active' };

    dispatch(fetchSchoolYear(request));

    if (params && params.publicId) {
      dispatch(fetchSingleExpensesForecast(params.publicId));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updateExpensesForecastForm(updates));
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    dispatch(updateExpensesForecastForm(updates));
  };

  const onSave = () => {
    if (!school_year_id) {
      Alert.alert('School year is required');

      return;
    }

    if (!month) {
      Alert.alert('Month is required');

      return;
    }

    if (!amount) {
      Alert.alert('Amount is required');

      return;
    }

    if (!Regex.positiveNumbers(amount)) {
      Alert.alert('Amount must be a positive number');

      return;
    }

    if (params.publicId) {
      const request = {
        ...form,
        publicId: params.publicId,
      };

      dispatch(editExpensesForecast(request));
    } else {
      dispatch(createExpensesForecast(form));
    }
  };

  const onNavigate = () => dispatch(push('/expenses-forecast'));

  return (
    <div className="mb-3 card">
      <div className="card-header-tab card-header">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
          {disabled ? 'View Expense Forecast' : `${params.publicId ? 'Edit Expense Forecast' : 'Add New Expense Forecast'}`}
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
            <form noValidate className="row py-2 px-2 mx-0" autoComplete="off">
              <div className='col-sm-10 m-auto'>
                <div className="col-sm-12 pr-4">
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*School Year</label>
                    <div className="col-sm-8">
                      <Select
                        isDisabled={isEditViewMode}
                        isSearchable
                        name="school_year_id"
                        loadingMessage="Please wait loading"
                        placeholder="Select School Year"
                        onChange={(value) => onSelectChange('school_year_id', value)}
                        options={options}
                        value={school_year_id}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Month</label>
                    <div className="col-sm-8">
                      <Select
                        isSearchable
                        isDisabled={isEditViewMode}
                        name="month"
                        placeholder="Select Month"
                        onChange={(value) => onSelectChange('month', value)}
                        options={months}
                        value={month}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0">*Amount</label>
                    <div className="col-sm-8">
                      <input
                        type='number'
                        disabled={disabled}
                        className="form-control"
                        name="amount"
                        placeholder="Enter Amount"
                        onChange={onChange}
                        value={amount}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 pl-4" />
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
  );
};

export default AddEditForecast;
