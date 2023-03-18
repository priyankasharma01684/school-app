import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { push } from 'connected-react-router';
import { createClass, editClass, fetchSingleClass, updateClassesForm } from '../../actions/classes-action-types';
import { fetchGrade } from '../../actions/grades-action-types';
import { Button } from '../../components';
import Alert from '../../utility/alert';

export const AddEditClass = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditViewMode = params.publicId;
  const [isEditable, setEdit] = React.useState(false);
  const disabled = isEditViewMode && !isEditable;
  const {
    form, grades,
  } = useSelector((store) => (
    {
      form: store.classes.form,
      grades: store.grades.grades,
    }));

  const {
    class_code,
    class_name,
    grade_id,
    max_no_of_student,
    status,
  } = form;

  React.useEffect(() => {
    const request = { filter: 'active' };

    dispatch(fetchGrade(request));

    if (params && params.publicId) {
      dispatch(fetchSingleClass(isEditViewMode));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updateClassesForm(updates));
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    dispatch(updateClassesForm(updates));
  };

  const onSave = () => {
    if (!class_name.trim().length) {
      Alert.alert('Class Name is required');

      return;
    }
    if (!class_code.trim().length) {
      Alert.alert('Class Code is required');

      return;
    }
    if (!grade_id) {
      Alert.alert('Grade is required');

      return;
    }
    if (!max_no_of_student.trim().length) {
      Alert.alert('Max number of students is required');

      return;
    }

    if (!status) {
      Alert.alert('Status is required');

      return;
    }

    if (isEditViewMode) {
      dispatch(editClass(form));
    } else {
      dispatch(createClass(form));
    }
  };

  const onNavigate = () => dispatch(push('/classes'));

  return (
    <>
      <div className="mb-3 card">
        <div className="card-header-tab card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
            {disabled ? 'View Class ' : `${params.publicId ? 'Edit Class' : 'Add New Class'}`}
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
                    <label className="col-sm-4 mb-0">*Class  Name</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="class_name"
                        name="class_name"
                        placeholder="Enter Class Name"
                        onChange={onChange}
                        value={class_name}
                      />
                    </div>
                  </div>
                  <div className="form-group row mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">   *Class Code</label>
                    <div className="col-sm-8">
                      <input
                        disabled={disabled}
                        className="form-control"
                        id="class_code"
                        name="class_code"
                        placeholder="Enter Class Code"
                        onChange={onChange}
                        value={class_code}
                      />
                    </div>
                  </div>

                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*Grade</label>
                    <div className="col-sm-8">
                      <Select
                        isSearchable
                        isDisabled={disabled}
                        name="grade_id"
                        loadingMessage="Please wait loading"
                        placeholder="Select Grade"
                        onChange={(value) => onSelectChange('grade_id', value)}
                        options={grades.map((grade) => ({
                          label: grade.grade_name,
                          value: grade.grade_id,
                        }))}
                        value={grade_id}
                      />
                    </div>
                  </div>
                  <div className="form-group row  mx-0 align-items-center">
                    <label className="col-sm-4 mb-0">*Max no. of students</label>
                    <div className="col-sm-8">
                      <input
                        min={0}
                        type='number'
                        disabled={disabled}
                        className="form-control"
                        id="max_no_of_student"
                        name="max_no_of_student"
                        placeholder="Enter max no. of students"
                        onChange={onChange}
                        value={max_no_of_student}
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

export default AddEditClass;
