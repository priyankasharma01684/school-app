import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { push } from 'connected-react-router';
import { addCostOfReason, editCostOfReason, fetchSingleCostOfReason, updateCostOfReasonForm } from '../../actions/cost-reason-action-types';
import { fetchCostOfItem } from '../../actions/cost-item-action-types';
import { Button } from '../../components';
import Alert from '../../utility/alert';

export const AddEditCostOfReason = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditViewMode = params.publicId;

  const [isEditable, setEdit] = React.useState(false);
  const disabled = isEditViewMode && !isEditable;
  const {
    form, costOfItem,
  } = useSelector((store) => ({
    costOfItem: store.costItem.costOfItems,
    form: store.costReason.form,
  }));

  const {
    cost_item_id,
    cost_reason_code,
    cost_reason_label,
    status,
  } = form;

  React.useEffect(() => {
    const request = { filter: 'active' };

    dispatch(fetchCostOfItem(request));
    if (params && params.publicId) {
      dispatch(fetchSingleCostOfReason(isEditViewMode));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updateCostOfReasonForm(updates));
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    dispatch(updateCostOfReasonForm(updates));
  };

  const onSave = () => {
    if (!cost_reason_label.trim().length) {
      Alert.alert('Cost Of reason label is required');

      return;
    }
    if (!cost_reason_code.trim().length) {
      Alert.alert('Cost of reason code is required');

      return;
    }

    if (!status) {
      Alert.alert('Status is required');

      return;
    }

    if (params.publicId) {
      dispatch(editCostOfReason(form));
    } else {
      dispatch(addCostOfReason(form));
    }
  };

  const onNavigate = () => dispatch(push('/cost-reason'));

  return (
    <>
      <div className="mb-3 card">
        <div className="card-header-tab card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
            {disabled ? 'View Cost Reason ' : `${params.publicId ? 'Edit Cost Reason' : 'Add New Cost Reason'}`}
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
                  <div className="form-group row mx-0 align-Reasons-center">
                    <label className="col-sm-4 mb-0">   *Cost Reason Code</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="cost_reason_code"
                        name="cost_reason_code"
                        placeholder="Enter Code"
                        onChange={onChange}
                        value={cost_reason_code}
                      />
                    </div>
                  </div>
                  <div className="form-group row  mx-0 align-Reasons-center">
                    <label className="col-sm-4 mb-0">*Cost Reason Label</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="cost_reason_label"
                        name="cost_reason_label"
                        placeholder="Enter Label"
                        onChange={onChange}
                        value={cost_reason_label}
                      />
                    </div>
                  </div>

                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*Cost Item Label</label>
                    <div className="col-sm-8">
                      <Select
                        isSearchable
                        isDisabled={disabled}
                        name="cost_item_id"
                        loadingMessage="Please wait loading"
                        placeholder="Select Cost Item"
                        onChange={(value) => onSelectChange('cost_item_id', value)}
                        options={costOfItem.map((cost) => ({
                          label: cost.cost_item_label,
                          value: cost.cost_item_id,
                        }))}
                        value={cost_item_id}
                      />
                    </div>
                  </div>

                  <div className="form-group row mx-0 align-Reasons-center">
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

export default AddEditCostOfReason;
