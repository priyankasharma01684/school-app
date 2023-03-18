
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import DateCalenderInput from '../../components/date-calender-input';
import { createEnrollment, editEnrollment, fetchSingleEnrollment, updateEnrollmentForm } from '../../actions/enrollment-action-type';

const TransportInfo = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { form } = useSelector((store) => ({ form: store.enrollment.form }));

  const {
    quater_name,
    payment_date,
    amount_to_pay,
    amount_paid,
    balance,
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

  return (
    <div className="tab-pane fade show active" id="step-4">

      <div className="row mt-4">
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Quarter Name</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="quater_name"
                name="quater_name"
                placeholder="Enter First Name"
                onChange={onChange}
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
                maxDate={new Date()}
                title="Click to select a date of birth"
                placeholderText="Click to select a date of birth"
                className="form-control datePicker"
                onChange={(date) => {
                  const payload = {
                    ...form,
                    payment_date: date,
                  };

                  dispatch(updateEnrollmentForm(payload));
                }}
                selected={payment_date}
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
      </div>
    </div>
  );
};

export default TransportInfo;
