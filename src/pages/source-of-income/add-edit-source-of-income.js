import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { push } from 'connected-react-router';
import { Button } from '../../components';
import { addSourceOfIncome, fetchSingleSourceOfIncome, editSourceOfIncome, updateSourceofIncome } from '../../actions/source-of-income-action-type';
import Alert from '../../utility/alert';

export const AddEditSourceOfIncome = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditViewMode = params.publicId;
  const [isEditable, setEdit] = React.useState(false);
  const disabled = isEditViewMode && !isEditable;
  const { form } = useSelector((store) => (
    { form: store.sourceOfIncome.form }));

  const {
    source_of_income_code,
    source_of_income_description,
    status,
  } = form;

  React.useEffect(() => {
    if (params && params.publicId) {
      dispatch(fetchSingleSourceOfIncome(isEditViewMode));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updateSourceofIncome(updates));
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };
    //  console.log(name,value)

    dispatch(updateSourceofIncome(updates));
  };

  const onSave = () => {
    if (!source_of_income_code.trim().length) {
      Alert.alert('Enter a valid Source of income  Code');

      return;
    }
    if (!source_of_income_description.trim().length) {
      Alert.alert('Source of income  description is required');

      return;
    }
    if (!status) {
      Alert.alert('Source of income  status is required');

      return;
    }

    if (isEditViewMode) {
      dispatch(editSourceOfIncome(form));
    } else {
      dispatch(addSourceOfIncome(form));
    }
  };

  const onNavigate = () => dispatch(push('/source-of-income'));

  return (
    <div className="mb-3 card">

      <div className="card-header-tab card-header">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
          {disabled ? 'View Source of Income' : `${params.publicId ? 'Edit Source of Income' : 'Add New Source of Income'}`}
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
            <form>
              <div className="col-sm-10 m-auto">
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0"> *Source of income code</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      onChange={onChange}
                      title="Source of  Income Code"
                      placeholder="Source of  Income Code"
                      id="source_of_income_code"
                      name="source_of_income_code"
                      value={source_of_income_code}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">*Source of income description</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      onChange={onChange}
                      title="Source of  Income Description"
                      placeholder="Source of  Income Description"
                      id="source_of_income_description"
                      name="source_of_income_description"
                      value={source_of_income_description}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
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
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0" />
                  <div className="col-sm-8">
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
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};
export default AddEditSourceOfIncome;
