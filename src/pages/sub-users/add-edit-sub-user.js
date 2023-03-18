import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { Button } from '../../components';
import { createSubUser, updateSubUserForm, editSubUser, fetchSingleSubUser } from '../../actions/sub-user-action-type';
import Alert from '../../utility/alert';

const AddEditGrade = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditViewMode = params.publicId;

  const [isEditable, setEdit] = React.useState(false);
  const disabled = isEditViewMode && !isEditable;
  const { form } = useSelector((store) => (
    { form: store.subUsers.form }));

  const {
    username,
    email,
    password,
    phone_number,
    status,
  } = form;

  React.useEffect(() => {
    if (params && params.publicId) {
      dispatch(fetchSingleSubUser(isEditViewMode));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updateSubUserForm(updates));
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    dispatch(updateSubUserForm(updates));
  };
  const onSave = () => {
    if (!username.trim().length) {
      Alert.alert('Name is required');

      return;
    }

    if (!email.length) {
      Alert.alert('Enter a valid Email');

      return;
    }
    if (!phone_number) {
      Alert.alert('Enter a valid Email');

      return;
    }
    if (!status) {
      Alert.alert('Grade status is required');

      return;
    }

    if (isEditViewMode) {
      dispatch(editSubUser(form));
    } else {
      dispatch(createSubUser(form));
    }
  };

  const onNavigate = () => dispatch(push('/sub-user'));

  return (
    <div className="mb-3 card">

      <div className="card-header-tab card-header">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
          {disabled ? 'View Sub Admin ' : `${params.publicId ? 'Edit Sub Admin' : 'Add New Sub Admin'}`}
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
                  <label className="col-sm-4 mb-0"> *Name</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      onChange={onChange}
                      title="Name  "
                      placeholder="Name"
                      id="username"
                      name="username"
                      value={username}
                      type="text"
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">

                  <label className="col-sm-4 mb-0">  *Phone Number</label>
                  <div className="col-sm-8  calendar-icon">
                    <span className="btn-icon-wrapper pr-1 opacity-5 icon ml-2 pl-1">
                      <strong> + </strong>
                    </span>
                    <input
                      disabled={disabled}
                      className="form-control"
                      onChange={onChange}
                      title=" Phone Number  "
                      placeholder=" Phone Number"
                      id="phone_number"
                      name="phone_number"
                      value={phone_number}
                      type="text"
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">  *Email</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      onChange={onChange}
                      title="Email"
                      placeholder="Email"
                      id="email"
                      name="email"
                      value={email}
                      type="text"
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">  *Password</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      onChange={onChange}
                      title="Password"
                      placeholder="Password"
                      id="password"
                      name="password"
                      value={password}
                      type="password"
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

                {!disabled && (
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 mb-0" />
                    <div className="col-sm-8">
                      <input type="button" className="btn-pill btn-shadow btn-wide btn btn-success mr-md-2" onClick={onSave} value="Save" />

                      <button className="btn-pill btn-shadow btn-wide btn btn-primary" type="button" onClick={onNavigate}>Back</button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditGrade;
