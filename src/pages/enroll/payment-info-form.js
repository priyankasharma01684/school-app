
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { push } from 'connected-react-router';
import Button from '../../components/button';
import DateCalenderInput from '../../components/date-calender-input';
import Utils from '../../utility';
import { createEnrollment, editEnrollment, fetchSingleEnrollment, updateEnrollmentForm } from '../../actions/enrollment-action-type';

const PaymentInfo = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { form } = useSelector((store) => ({ form: store.enrollment.form }));

  const {
    installment_name,
    amount_to_pay,
    amount_paid,
    discount,
    balance,
    deadline,
  } = form;

  React.useEffect(() => {
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
    <div className="tab-pane fade show active" id="step-5">
      <div className="row mt-4">
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Installment Name</label>
            <div className="col-sm-8">
              <Select
                isSearchable
                name="gender"
                loadingMessage="Please wait loading"
                placeholder="Select Installment"
                onChange={(value) => onSelectChange('installment_name', value)}
                options={[
                  {
                    label: 'pre enrollment',
                    value: 'pre enrollment',
                  },
                  {
                    label: 'Instalment 1 ',
                    value: 'Instalment 1 ',
                  },
                  {
                    label: 'Instalment 2 ',
                    value: 'Instalment 2 ',
                  },
                  {
                    label: 'Instalment 3 ',
                    value: 'Instalment 3 ',
                  },
                ]}
                value={installment_name}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Amount to Pay</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="amount_to_pay"
                name="amount_to_pay"
                placeholder="Enter First Name"
                onChange={onChange}
                value={amount_to_pay}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Discount</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="discount"
                name="discount"
                placeholder="Enter First Name"
                onChange={onChange}
                value={discount}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Amount Paid</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="amount_paid"
                name="amount_paid"
                placeholder="Enter First Name"
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
                className="form-control"
                id="balance"
                name="balance"
                placeholder="Enter First Name"
                onChange={onChange}
                value={balance}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Deadline</label>
            <div className="col-sm-8">
              <DatePicker
                showYearDropdown
                showMonthDropdown
                id='deadline'
                name='deadline'
                customInput={<DateCalenderInput />}
                dateFormat="MM/dd/yyyy"
                maxDate={new Date()}
                title="Click to select a date of birth"
                placeholderText="Click to select a date of birth"
                className="form-control datePicker"
                onChange={(date) => {
                  const payload = {
                    ...form,
                    deadline: date,
                  };

                  dispatch(updateEnrollmentForm(payload));
                }}
                selected={deadline}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
