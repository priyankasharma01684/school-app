import React from 'react';
import { func } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import Select from 'react-select/async';
import Button from '../../components/button';
import Modal from '../../components/modal';
import Utils from '../../utility';
import { fetchEnrolledStudents } from '../../actions/enrollment-action-type';

const formatOptionLabel = ({
  student_first_name, student_last_name, student_registration_no,
}) => (
  <div>
    <div style={{ fontWeight: 700 }}>{`${student_first_name} ${student_last_name}`.capitalizeEachLetter()}</div>
    <div style={{ color: '#999999' }}>
      {`Reg. No - ${student_registration_no}`}
    </div>
  </div>
);

export const EnrollStudent = ({ onClose }) => {
  const dispatch = useDispatch();
  const { students } = useSelector((store) => ({ students: store.enrollment.students }));
  const [isViewable, setView] = React.useState(false);
  const [student, setStudent] = React.useState(null);

  const loadOptions = (keyword, callback) => {
    const request = {
      callback,
      keyword,
    };

    dispatch(fetchEnrolledStudents(request));
  };

  const onContinue = () => {
    if (!student) {
      return;
    }

    dispatch(push(`/enrollments/add-update-enrollment/${student.id}`));
  };

  return (
    <Modal>
      <div
        className="modal fade show "
        id="addingParentInfo"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        style={{
          background: 'rgba(0, 0, 0, 0.5)', display: 'block', paddingRight: 15,
        }}
      >
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <h4 className="text-center mt-4 mb-0">Add Enrollment</h4>
            <Button
              type="button"
              className="close topRight"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
            </Button>
            <div className="px-4 mx-2 mt-3 pb-5">
              <form noValidate autoComplete='off'>
                <div className="modal-content border-0">
                  <div className="modal-body my-4">
                    <div className=" row">
                      <div className="col-sm-6">
                        <div className="nav-link  icon-option gray-icon border-0 p-0">
                          <div className="icon">
                            <button type="button" className="btn btn-link" onClick={() => dispatch(push('/enrollments/add-update-enrollment'))}>
                              <img src={Utils.getImage('icons/add-user.svg')} height={50} alt="" />
                              <span>New</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="gray-icon icon-option border-0 p-0 active">
                          <div className="icon">
                            <button type="button" className="btn btn-link" onClick={() => setView(true)}>
                              <img src={Utils.getImage('icons/edit-user.svg')} height={50} alt="" />
                              <span>Existing</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {isViewable && (
                      <div className="row" id="">
                        <div className="mt-4 col-sm-12">
                          <div className="row">
                            <div className="col-sm-12">
                              <Select
                                placeholder='Search student'
                                formatOptionLabel={formatOptionLabel}
                                options={students}
                                getOptionValue={(option) => option.id}
                                onChange={(value) => setStudent(value)}
                                loadOptions={loadOptions}
                              />
                            </div>
                            {student && (
                              <div className="col-sm-12 text-center mt-3">
                                <button type="button" className="btn btn-primary px-4" onClick={onContinue}>Continue</button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

EnrollStudent.propTypes = { onClose: func.isRequired };

export default EnrollStudent;
