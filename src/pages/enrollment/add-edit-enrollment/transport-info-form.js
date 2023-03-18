
import React from 'react';
import { func, shape, string } from 'prop-types';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import DateCalenderInput from '../../../components/date-calender-input';

const TransportInfo = ({
  form,
  form: {
    quater_name,
    payment_date,
    amount_to_pay,
    amount_paid,
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

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    updateEnrollmentForm(updates);
  };

  return (
    <div className="tab-pane fade show active" id="step-4">

      <div className="row mt-4">
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Quarter Name</label>
            <div className="col-sm-8">
              <Select
                isSearchable
                name="quater_name"
                loadingMessage="Please wait loading"
                placeholder="Select Quarter"
                onChange={(value) => onSelectChange('quater_name', value)}
                options={[{
                  label: 'Quarter 1',
                  value: 'Quarter 1',
                },
                {
                  label: 'Quarter 2',
                  value: 'Quarter 2',
                },
                {
                  label: 'Quarter 3',
                  value: 'Quarter 3',
                },
                {
                  label: 'Quarter 4',
                  value: 'Quarter 4',
                }]}
                value={quater_name}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Payment Date</label>
            <div className="col-sm-8">
              <DatePicker
                showYearDropdown
                showMonthDropdown
                id='payment_date'
                name='payment_date'
                customInput={<DateCalenderInput />}
                dateFormat="MM/dd/yyyy"
                minDate={new Date()}
                title="Click to select payment date"
                placeholderText="Click to select payment date"
                className="form-control datePicker"
                onChange={(date) => {
                  const payload = {
                    ...form,
                    payment_date: date,
                  };

                  updateEnrollmentForm(payload);
                }}
                selected={payment_date}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Amount to Pay</label>
            <div className="col-sm-8">
              <input
                min={0}
                type='number'
                className="form-control"
                id="amount_to_pay"
                name="amount_to_pay"
                placeholder="Enter Amount to Pay"
                onChange={onChange}
                value={amount_to_pay}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Amount Paid</label>
            <div className="col-sm-8">
              <input
                min={0}
                type='number'
                className="form-control"
                id="amount_paid"
                name="amount_paid"
                placeholder="Enter Amount Paid"
                onChange={onChange}
                value={amount_paid}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Balance</label>
            <div className="col-sm-8">
              <input
                disabled
                min={0}
                type='number'
                className="form-control"
                id="balance"
                name="balance"
                placeholder="Enter Balance"
                onChange={onChange}
                value={amount_to_pay - amount_paid}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TransportInfo.propTypes = {
  form: shape({ quater_name: string }).isRequired,
  updateEnrollmentForm: func.isRequired,
};

export default TransportInfo;
