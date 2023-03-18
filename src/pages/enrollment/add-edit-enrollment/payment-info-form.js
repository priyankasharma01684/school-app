
import React from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';
import moment from 'moment';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import DateCalenderInput from '../../../components/date-calender-input';

const formatOptionLabel = ({
  installment, grade_name,
}) => (
  <div>
    <div style={{ fontWeight: 700 }}>{installment.capitalizeEachLetter()}</div>
    <div style={{ color: '#999999' }}>
      {`Applicable to class - ${grade_name}`}
    </div>
  </div>
);

const PaymentInfo = ({
  form,
  form: {
    id,
    payment_amount_already_paid,
    payment_amount_to_pay,
    payment_amount_paid,
    discount,
    deadline,
  },
  installments,
  updateEnrollmentForm,
}) => {
  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    updateEnrollmentForm(updates);
  };

  const onInstallmentChange = (name, selected) => {
    const selectedInstallment = [...installments].find((option) => selected.id === option.id);

    const updates = {
      ...form,
      deadline: selectedInstallment?.deadline_installment ? moment(selectedInstallment.deadline_installment, 'X').toDate() : null,
      discount: 0,
      [name]: selected,
      payment_amount_to_pay: selectedInstallment?.amount_to_pay ? parseFloat(selectedInstallment.amount_to_pay) : 0,
    };

    updateEnrollmentForm(updates);
  };

  return (
    <div className="tab-pane fade show active" id="step-5">
      <div className="row mt-4">
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Installment Name</label>
            <div className="col-sm-8">
              {installments ? (
                <Select
                  isSearchable
                  name="installment_name"
                  formatOptionLabel={formatOptionLabel}
                  loadingMessage="Please wait loading"
                  placeholder="Select Installment"
                  onChange={(selected) => onInstallmentChange('id', selected)}
                  options={[...installments]}
                  value={id}
                  getOptionValue={(option) => option.id}
                />
              )
                : (
                  <input
                    className="form-control"
                    id="installment"
                    name="installment"
                    onChange={onChange}
                    value="No Installment Pending"
                  />
                )}
            </div>
          </div>
        </div>
        {/* <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Installment Name</label>
            <div className="col-sm-8">
              <Select
                isSearchable
                name="status"
                loadingMessage="Please wait loading"
                placeholder="Select Status"
                onChange={(value) => onSelectChange('status', value)}
                options={[{
                  label: 'On Time',
                  value: 1,
                },
                {
                  label: 'Late',
                  value: 0,
                },
                {
                  label: 'Soon Late',
                  value: 0,
                }]}
                value={status}
              />
            </div>
          </div>
        </div> */}
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Amount to Pay</label>
            <div className="col-sm-8">
              <input
                min={0}
                type='number'
                className="form-control"
                id="payment_amount_to_pay"
                name="payment_amount_to_pay"
                placeholder="Enter Amount to Pay"
                onChange={onChange}
                value={payment_amount_to_pay}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Amount Already Paid</label>
            <div className="col-sm-8">
              {payment_amount_already_paid}

            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Discount</label>
            <div className="col-sm-8">
              <input
                min={0}
                type='number'
                className="form-control"
                id="discount"
                name="discount"
                placeholder="Enter Discount"
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
                min={0}
                type='number'
                className="form-control"
                id="payment_amount_paid"
                name="payment_amount_paid"
                placeholder="Enter Amount Paid"
                onChange={onChange}
                value={payment_amount_paid}
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
                value={payment_amount_to_pay - discount - payment_amount_paid - payment_amount_already_paid}
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
                minDate={new Date()}
                title="Click to select deadline"
                placeholderText="Click to select deadline"
                className="form-control datePicker"
                onChange={(date) => {
                  const payload = {
                    ...form,
                    deadline: date,
                  };

                  updateEnrollmentForm(payload);
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

PaymentInfo.propTypes = {
  form: shape({ installment_name: string }).isRequired,
  grade_name: shape({ string }).isRequired,
  installments: arrayOf(shape({
    id: number,
    installment: string,
  })).isRequired,
  updateEnrollmentForm: func.isRequired,
};

export default PaymentInfo;
