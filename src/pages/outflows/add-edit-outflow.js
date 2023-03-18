import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { push } from 'connected-react-router';
import { createOutflow, editOutflow, fetchSingleOutflow, updateOutflowForm } from '../../actions/outflow-action-types';
import { fetchCostOfReason } from '../../actions/cost-reason-action-types';
import { fetchPaymentType } from '../../actions/payment-type-action-type';
import { Button } from '../../components';
import Alert from '../../utility/alert';

export const AddEditOutflow = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditViewMode = params.publicId;
  const [isEditable, setEdit] = React.useState(false);
  const disabled = isEditViewMode && !isEditable;
  const {
    form, paymentType, costReason,
  } = useSelector((store) => (
    {
      costReason: store.costReason.costOfReason,
      form: store.outflow.form,
      paymentType: store.paymentType.paymentType,
    }));

  const {
    cost_reason_id,
    amount,
    payment_type_id,
    bank_name,
    receipt_number,
    comments,
    status,
  } = form;

  React.useEffect(() => {
    const request = { filter: 'active' };

    dispatch(fetchCostOfReason(request));
    dispatch(fetchPaymentType(request));

    if (params && params.publicId) {
      dispatch(fetchSingleOutflow(isEditViewMode));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updateOutflowForm(updates));
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    dispatch(updateOutflowForm(updates));
  };

  const onSave = () => {
    if (!cost_reason_id) {
      Alert.alert('Cost Reason  is required');

      return;
    }

    if (!amount.trim().length) {
      Alert.alert('Amount is required');

      return;
    }

    if (!payment_type_id) {
      Alert.alert('Payment type is required');

      return;
    }

    // if (!bank_name.trim().length) {
    //   Alert.alert('Bank name is required');

    //   return;
    // }

    if (!receipt_number.trim().length) {
      Alert.alert('Status is required');

      return;
    }

    if (!comments.trim().length) {
      Alert.alert('Status is required');

      return;
    }

    if (!status) {
      Alert.alert('Status is required');

      return;
    }

    if (isEditViewMode) {
      dispatch(editOutflow(form));
    } else {
      dispatch(createOutflow(form));
    }
  };

  const onNavigate = () => dispatch(push('/outflows'));

  return (
    <>
      <div className="mb-3 card">
        <div className="card-header-tab card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
            {disabled ? 'View Outflow Outflows' : `${params.publicId ? 'Edit Outflow' : 'Add New Outflow'}`}
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
                    <label className="col-sm-4 mb-0">*Cost Reason</label>
                    <div className="col-sm-8">
                      <Select
                        isSearchable
                        isDisabled={disabled}
                        name="cost_reason_id"
                        loadingMessage="Please wait loading"
                        placeholder="Select Cost Reason"
                        onChange={(value) => onSelectChange('cost_reason_id', value)}
                        options={costReason.map((reason) => ({
                          label: reason.cost_reason_label,
                          value: reason.cost_reason_id,
                        }))}
                        value={cost_reason_id}
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
                    <label className="col-sm-4 mb-0"> *Payment Type</label>
                    <div className="col-sm-8">
                      <Select
                        isSearchable
                        isDisabled={disabled}
                        name="payment_type_id"
                        loadingMessage="Please wait loading"
                        placeholder="Select Payment Type"
                        onChange={(value) => onSelectChange('payment_type_id', value)}
                        options={paymentType.map((payment) => ({
                          label: payment.payment_type_label,
                          value: payment.payment_type_id,
                        }))}
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
                        id="comments"
                        name="comments"
                        placeholder="Enter Comment"
                        onChange={onChange}
                        value={comments}
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

export default AddEditOutflow;
