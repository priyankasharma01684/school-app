import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { Button } from '../../components';
import { addGrade, updateGradeForm, editGrade, fetchSingleGrade } from '../../actions/grades-action-types';
import Alert from '../../utility/alert';

const AddEditGrade = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditViewMode = params.publicId;

  const [isEditable, setEdit] = React.useState(false);
  const disabled = isEditViewMode && !isEditable;
  const { form } = useSelector((store) => (
    { form: store.grades.form }));

  const {
    grade_name,
    grade_code,
    section,
    status,
  } = form;

  React.useEffect(() => {
    if (params && params.publicId) {
      dispatch(fetchSingleGrade(isEditViewMode));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updateGradeForm(updates));
  };

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    dispatch(updateGradeForm(updates));
  };
  const onSave = () => {
    if (!grade_name.trim().length) {
      Alert.alert('Grade name is required');

      return;
    }

    if (!grade_code.trim().length) {
      Alert.alert('Enter a valid Grade code');

      return;
    }

    if (!status) {
      Alert.alert('Grade status is required');

      return;
    }

    if (isEditViewMode) {
      dispatch(editGrade(form));
    } else {
      dispatch(addGrade(form));
    }
  };

  const onNavigate = () => dispatch(push('/grades'));

  return (
    <div className="mb-3 card">

      <div className="card-header-tab card-header">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
          {disabled ? 'View Grade ' : `${params.publicId ? 'Edit Grade' : 'Add New Grade'}`}
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
                  <label className="col-sm-4 mb-0">*Grade Name</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      onChange={onChange}
                      title="Grade Name  "
                      placeholder="Grade Name"
                      id="grade_name"
                      name="grade_name"
                      value={grade_name}
                      type="text"
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">*Grade Code</label>
                  <div className="col-sm-8">
                    <input
                      disabled={disabled}
                      className="form-control"
                      onChange={onChange}
                      title="Grade Code  "
                      placeholder="Grade Code"
                      id="grade_code"
                      name="grade_code"
                      value={grade_code}
                      type="text"
                    />
                  </div>
                </div>
                {/* <div className="form-group row align-items-center">
                <label className="col-sm-4 mb-0">List of classes</label>
                <div className="col-sm-8">
                  <select className="form-control selectTags js-example-basic-multiple "
                  name="states[]" placeholder="Grade" >
                    <option value  >Eight Grade A</option>
                    <option value  >Eight Grade B</option>
                  </select>
                   </div>
              </div> */}
                {/* <div className="form-group row align-items-center">
                <label className="col-sm-4 mb-0">List of Subjects</label>
                <div className="col-sm-8">
                <select
                id="subject"
                name="subject"
                className="form-control js-example-basic-single"
                data-minimum-results-for-search="Infinity"

                onChange={onChange}
              >
                    <option value >English</option>
                    <option value  >Maths</option>
                    <option value  >Science</option>
                  </select>
                     </div>
              </div> */}
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 mb-0">*Section</label>
                  <div className="col-sm-8">
                    <Select
                      isSearchable
                      isDisabled={disabled}
                      name="section"
                      loadingMessage="Please wait loading"
                      placeholder="Select Section"
                      value={section}
                      onChange={(value) => onSelectChange('section', value)}
                      options={[
                        {
                          label: 'English',
                          value: 'english',
                        },
                        {
                          label: 'French',
                          value: 'french',
                        },
                      ]}
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
