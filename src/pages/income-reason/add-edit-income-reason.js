import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { push } from 'connected-react-router';
import { addIncomeReason, editIncomeReason, fetchSingleIncomeReason, updateIncomeReasonForm } from '../../actions/income-reason-action-types';
import { fetchSourceOfIncome } from '../../actions/source-of-income-action-type';
import { Button } from '../../components';
import Alert from '../../utility/alert';

export const AddEditIncomeReason = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditViewMode = params.publicId;

  const [isEditable, setEdit] = React.useState(false);
  const disabled = isEditViewMode && !isEditable;
  const {
    form, sourceOfIncome,
  } = useSelector((store) => (
    {
      form: store.incomeReason.form,
      sourceOfIncome: store.sourceOfIncome.sourceofincome,
    }));
  const {
    income_reason_code,
    income_reason_description,
    source_of_income_id,
    status,
  } = form;

  React.useEffect(() => {
    dispatch(fetchSourceOfIncome());
    if (params && params.publicId) {
      dispatch(fetchSingleIncomeReason(isEditViewMode));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updateIncomeReasonForm(updates));
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    dispatch(updateIncomeReasonForm(updates));
  };

  const onSave = () => {
    if (!income_reason_code.trim().length) {
      Alert.alert('Income Reason Label is required');

      return;
    }
    if (!income_reason_description.trim().length) {
      Alert.alert('Income Reason Code is required');

      return;
    }

    if (!status) {
      Alert.alert('Status is required');

      return;
    }

    if (params.publicId) {
      dispatch(editIncomeReason(form));
    } else {
      dispatch(addIncomeReason(form));
    }
  };

  const onNavigate = () => dispatch(push('/income-reasons'));

  return (
    <>
      <div className="mb-3 card">
        <div className="card-header-tab card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
            {disabled ? 'View Income Reason ' : `${params.publicId ? 'Edit Income Reason' : 'Add New Income Reason'}`}
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
                    <label className="col-sm-4 mb-0">   *Income Reason Code</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="income_reason_code"
                        name="income_reason_code"
                        placeholder="Enter Code"
                        onChange={onChange}
                        value={income_reason_code}
                      />
                    </div>
                  </div>
                  <div className="form-group row  mx-0 align-Reasons-center">
                    <label className="col-sm-4 mb-0">*Income Reason Label</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="income_reason_description"
                        name="income_reason_description"
                        placeholder="Enter Label"
                        onChange={onChange}
                        value={income_reason_description}
                      />
                    </div>
                  </div>

                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*Source of Income</label>
                    <div className="col-sm-8">
                      <Select
                        isSearchable
                        isDisabled={disabled}
                        name="source_of_income_id"
                        loadingMessage="Please wait loading"
                        placeholder="Select Source of Income"
                        onChange={(value) => onSelectChange('source_of_income_id', value)}
                        options={sourceOfIncome.map((source) => ({
                          label: source.source_of_income_description,
                          value: source.source_of_income_id,
                        }))}
                        value={source_of_income_id}
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

export default AddEditIncomeReason;
