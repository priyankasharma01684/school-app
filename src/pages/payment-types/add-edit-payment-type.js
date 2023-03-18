import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { push } from 'connected-react-router';
import { createPaymentType, editPaymentType, fetchSinglePaymentType, updatePaymentTypeForm } from '../../actions/payment-type-action-type';
import Alert from '../../utility/alert';
import { Button } from '../../components';

export const AddEditPaymentType = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditViewMode = params.publicId;
  const [isEditable, setEdit] = React.useState(false);
  const disabled = isEditViewMode && !isEditable;
  const { form } = useSelector((store) => (
    { form: store.paymentType.form }));
  const {
    payment_type_code,
    payment_type_label,
    status,
  } = form;

  React.useEffect(() => {
    if (params && params.publicId) {
      dispatch(fetchSinglePaymentType(isEditViewMode));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updatePaymentTypeForm(updates));
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    dispatch(updatePaymentTypeForm(updates));
  };

  const onSave = () => {
    if (!payment_type_code.trim().length) {
      Alert.alert('Payment code is required');

      return;
    }

    if (!payment_type_label.trim().length) {
      Alert.alert('Payment label is required');

      return;
    }

    if (!status) {
      Alert.alert('Status is required');

      return;
    }

    if (params.publicId) {
      dispatch(editPaymentType(form));
    } else {
      dispatch(createPaymentType(form));
    }
  };

  const onNavigate = () => dispatch(push('/payment-types'));

  return (
    <>
      <div className="mb-3 card">
        <div className="card-header-tab card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
            {disabled ? 'View Payment Type ' : `${params.publicId ? 'Edit Payment Type' : 'Add New Payment Type'}`}
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
                    <label className="col-sm-4 mb-0">   *PaymentType Code</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="payment_type_code"
                        name="payment_type_code"
                        placeholder="Enter Code"
                        onChange={onChange}
                        value={payment_type_code}
                      />
                    </div>
                  </div>
                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*PaymentType Label</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="payment_type_label"
                        name="payment_type_label"
                        placeholder="Enter Label"
                        onChange={onChange}
                        value={payment_type_label}
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

export default AddEditPaymentType;
