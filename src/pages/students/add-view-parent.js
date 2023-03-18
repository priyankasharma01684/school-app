import { bool, func } from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { Button, Modal } from '../../components';
import Regex from '../../utility/regex';
import Alert from '../../utility/alert';

export const AddViewParent = ({
  isDisabled, onClose, onSave,
}) => {
  const [form, setForm] = React.useState({
    address: '',
    email_address: '',
    first_name: '',
    last_name: '',
    mobile_number: '',
    relation: null,
  });
  const {
    relation, first_name, last_name, mobile_number, email_address, address,
  } = form;

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updates);
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    setForm(updates);
  };

  const onValidate = () => {
    if (!relation) {
      Alert.alert('Description is required');

      return;
    }

    if (!first_name) {
      Alert.alert('First name is required');

      return;
    }

    if (!last_name) {
      Alert.alert('Last name is required');

      return;
    }

    if (!mobile_number) {
      Alert.alert('Mobile number is required');

      return;
    }

    if (!Regex.mobile(mobile_number)) {
      Alert.alert('Enter a valid mobile number');

      return;
    }

    if (!email_address) {
      Alert.alert('Email address is required');

      return;
    }

    if (!Regex.email(email_address)) {
      Alert.alert('Email is not valid');

      return;
    }

    if (!address) {
      Alert.alert('Address is required');

      return;
    }

    onSave();
  };

  return (
    <Modal>
      <div
        className="modal fade show"
        id="addingParentInfo"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        style={{
          background: 'rgba(0, 0, 0, 0.5)', display: 'block', paddingRight: 15,
        }}
      >
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <h4 className="text-center mt-4 mb-0">Adding Parent Info</h4>
            <Button type="button" className="close topRight" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">×</span>
            </Button>
            <div className="modal-body px-4 mx-2 mt-3 pb-5">
              <form>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">Description</label>
                  <div className="col-sm-8">
                    <Select
                      isSearchable
                      isDisabled={isDisabled}
                      name="gender"
                      loadingMessage="Please wait loading"
                      placeholder="Select Relation"
                      onChange={(value) => onSelectChange('relation', value)}
                      options={[
                        {
                          label: 'Mother',
                          value: 'Mother',
                        },
                        {
                          label: 'Father',
                          value: 'Father',
                        },
                        {
                          label: 'Uncle',
                          value: 'Uncle',
                        },
                        {
                          label: 'Aunt',
                          value: 'Aunt',
                        },
                      ]}
                      value={relation}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">First Name</label>
                  <div className="col-sm-8">
                    <input
                      disabled={isDisabled}
                      name="first_name"
                      placeholder="Enter first name"
                      type="text"
                      className="form-control"
                      onChange={onChange}
                      value={first_name}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">Last Name</label>
                  <div className="col-sm-8">
                    <input
                      disabled={isDisabled}
                      name="last_name"
                      placeholder="Enter last name"
                      className="form-control"
                      onChange={onChange}
                      value={last_name}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">Mobile Phone</label>
                  <div className="col-sm-8">
                    <input
                      disabled={isDisabled}
                      name="mobile_number"
                      placeholder="Enter mobile number"
                      className="form-control"
                      onChange={onChange}
                      value={mobile_number}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">Email Id</label>
                  <div className="col-sm-8">
                    <input
                      disabled={isDisabled}
                      name="email_address"
                      placeholder="Email address"
                      className="form-control"
                      onChange={onChange}
                      value={email_address}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">Address</label>
                  <div className="col-sm-8">
                    <input
                      disabled={isDisabled}
                      name="address"
                      placeholder="Address"
                      className="form-control"
                      onChange={onChange}
                      value={address}
                    />
                  </div>
                </div>
                {!isDisabled && (
                  <div className="text-center">
                    <Button type="button" className="btn btn-primary btn-lg mt-4 px-4" onClick={onValidate}>
                      <div className="h6 mt-0 mb-1 mx-2">Save</div>
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

AddViewParent.propTypes = {
  isDisabled: bool.isRequired,
  onClose: func.isRequired,
  onSave: func.isRequired,
};

export default AddViewParent;
