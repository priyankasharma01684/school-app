import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createEnrollment, fetchSingleEnrollment, updateEnrollmentForm } from '../../actions/enrollment-action-type';

const MedicalInfo = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { form } = useSelector((store) => ({ form: store.enrollment.form }));

  const {
    allergy,
    moreinfo,
    reference_hospital,
    reference_hospital_address,
  } = form;

  React.useEffect(() => {
    dispatch(createEnrollment());

    if (params && params.publicId) {
      dispatch(fetchSingleEnrollment(params.publicId));
    }
  }, []);

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    dispatch(updateEnrollmentForm(updates));
  };

  return (
    <div className="tab-pane fade show active" id="step-3">
      <div className="row mt-4">
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Allergy</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="allergy"
                name="allergy"
                placeholder="Enter First Name"
                onChange={onChange}
                value={allergy}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Reference Hospital</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="reference_hospital"
                name="reference_hospital"
                placeholder="Enter First Name"
                onChange={onChange}
                value={reference_hospital}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">Reference Hospital Address</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="reference_hospital_address"
                name="reference_hospital_address"
                placeholder="Enter First Name"
                onChange={onChange}
                value={reference_hospital_address}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group row align-items-center">
            <label className="col-sm-4 mb-0">More Info</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="moreinfo"
                name="moreinfo"
                placeholder="Enter First Name"
                onChange={onChange}
                value={moreinfo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalInfo;
