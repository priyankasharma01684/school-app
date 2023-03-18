import React from 'react';
import { func, shape, string } from 'prop-types';

const MedicalInfo = ({
  form,
  form: {
    allergy,
    moreinfo,
    reference_hospital,
    reference_hospital_address,
  },
  updateEnrollmentForm,
}) => {
  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    updateEnrollmentForm(updates);
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
                placeholder="Enter Allergy"
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
                placeholder="Enter Reference Hospital"
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
                placeholder="Enter Reference Hospital Address"
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
                placeholder="Enter Additional Information"
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

MedicalInfo.propTypes = {
  form: shape({
    allergy: string,
    moreinfo: string,
    reference_hospital: string,
    reference_hospital_address: string,
  }).isRequired,
  updateEnrollmentForm: func.isRequired,
};

export default MedicalInfo;
