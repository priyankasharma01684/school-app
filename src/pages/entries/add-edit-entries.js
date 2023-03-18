import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { push } from 'connected-react-router';
import { createEntries, editEntries, fetchSingleEntries, updateEntriesForm } from '../../actions/entries-action-type';
import { fetchIncomeReason } from '../../actions/income-reason-action-types';
import { fetchPaymentType } from '../../actions/payment-type-action-type';
import { fetchStudents } from '../../actions/students-action-types';
import { Button } from '../../components';
import Alert from '../../utility/alert';

const formatOptionLabel = ({
  student_first_name, student_last_name, student_registration_no,
}) => (
  <div>
    <div style={{ fontWeight: 700 }}>{`${student_first_name} ${student_last_name}`.capitalizeEachLetter()}</div>
    {student_registration_no && (
      <div style={{ color: '#999999' }}>
        {`Reg. No - ${student_registration_no}`}
      </div>
    )}
  </div>
);

export const AddEditEntries = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditViewMode = params.publicId;
  const [isEditable, setEdit] = React.useState(false);
  const disabled = isEditViewMode && !isEditable;
  const {
    form, incomeReason, paymentType, students,
  } = useSelector((store) => ({
    form: store.entries.form,
    incomeReason: store.incomeReason.incomeReason,
    paymentType: store.paymentType.paymentType,
    students: store.students.students,
  }));
  const {
    student_id,
    paid_by,
    income_reason_id,
    amount,
    payment_type_id,
    bank_name,
    receipt_number,
    comment,

    status,
  } = form;

  React.useEffect(() => {
    const request = { filter: 'active' };

    dispatch(fetchIncomeReason(request));
    dispatch(fetchPaymentType(request));
    dispatch(fetchStudents(request));

    if (params && params.publicId) {
      dispatch(fetchSingleEntries(isEditViewMode));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updateEntriesForm(updates));
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    dispatch(updateEntriesForm(updates));
  };

  const onSave = () => {
    if (!status) {
      Alert.alert('Status is required');

      return;
    }

    if (isEditViewMode) {
      dispatch(editEntries(form));
    } else {
      dispatch(createEntries(form));
    }
  };

  const onNavigate = () => dispatch(push('/entries'));

  const selectedStudent = student_id ? students.find((student) => student.student_id === student_id.value) : null;

  return (
    <>
      <div className="mb-3 card">
        <div className="card-header-tab card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
            {disabled ? 'View Entries ' : `${params.publicId ? 'Edit Entries' : 'Add New Entries'}`}
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
                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0"> *Student </label>
                    <div className="col-sm-8">
                      <Select
                        isSearchable
                        formatOptionLabel={formatOptionLabel}
                        isDisabled={disabled}
                        name="income_reason_id"
                        loadingMessage="Please wait loading"
                        placeholder="Select Student"
                        onChange={(value) => onSelectChange('student_id', value)}
                        options={students.map((student) => ({
                          ...student,
                          label: student.student_first_name,
                          value: student.student_id,
                        }))}
                        value={selectedStudent}
                      />
                    </div>
                  </div>

                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*Income Reason</label>
                    <div className="col-sm-8">
                      <Select
                        isSearchable
                        isDisabled={disabled}
                        name="income_reason_id"
                        loadingMessage="Please wait loading"
                        placeholder="Select income Reason"
                        onChange={(value) => onSelectChange('income_reason_id', value)}
                        options={incomeReason.map((reason) => ({
                          label: reason.income_reason_description,
                          value: reason.income_reason_id,
                        }))}
                        value={income_reason_id}
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
                        id="amount"
                        name="amount"
                        placeholder="Enter Amount"
                        onChange={onChange}
                        value={amount}
                      />
                    </div>
                  </div>

                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*Paid By</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="paid_by"
                        name="paid_by"
                        placeholder="Enter Paid By"
                        onChange={onChange}
                        value={paid_by}
                      />
                    </div>
                  </div>
                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0"> *Payment Type</label>

                    <div className="col-sm-8">
                      <Select
                        isSearchable
                        isDisabled={disabled}
                        name="payment_type_id"
                        loadingMessage="Please wait loading"
                        placeholder="Select Payment Type"
                        onChange={(value) => onSelectChange('payment_type_id', value)}
                        options={paymentType ? paymentType.map((payment) => ({
                          label: payment.payment_type_label,
                          value: payment.payment_type_id,
                        })) : []}
                        value={payment_type_id}
                      />
                    </div>
                  </div>

                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">&nbsp;Bank Name</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="bank_name"
                        name="bank_name"
                        placeholder="Enter Bank Name"
                        onChange={onChange}
                        value={bank_name}
                      />
                    </div>
                  </div>

                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">&nbsp;Receipt Number</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="receipt_number"
                        name="receipt_number"
                        placeholder="Enter Reciept Number"
                        onChange={onChange}
                        value={receipt_number}
                      />
                    </div>
                  </div>

                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">&nbsp;Comment</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="comment"
                        name="comment"
                        placeholder="Enter Comments"
                        onChange={onChange}
                        value={comment}
                      />
                    </div>
                  </div>

                  <div className="form-group row mx-0 align-items-center">
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

export default AddEditEntries;
