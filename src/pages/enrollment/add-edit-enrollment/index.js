import React from 'react';
import moment from 'moment';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { Button } from '../../../components';
import EnrollSteps from './enroll-steps';
import StudentInfo from './student-info-form';
import ParentInfo from './parent-info-form';
import MedicalInfo from './medical-info-form';
import TransportInfo from './transport-info-form';
import PaymentInfo from './payment-info-form';
import PaymentTable from './payment-table';
import EnrolmentHelper from '../../../utility/enrollment-methods';
import { createEnrollment, editEnrollment, fetchSingleEnrollment, updateEnrollmentForm } from '../../../actions/enrollment-action-type';
import { fetchClasses } from '../../../actions/classes-action-types';
import { fetchCities, fetchCountries } from '../../../actions/schools-action-types';
import { fetchSchoolYear } from '../../../actions/school-year-action-type';
import { fetchInstallment } from '../../../actions/installment-action-type';
import { fetchGrade } from '../../../actions/grades-action-types';

export const AddEditStudent = () => {
  const [active, setActive] = React.useState(['student']);
  const dispatch = useDispatch();
  const params = useParams();
  const {
    cities, counties, classes, data, form, installments, grades, schoolYears,
  } = useSelector((store) => ({
    cities: store.schools.cities,
    classes: store.classes.classes,
    counties: store.schools.counties,
    data: store.enrollment.enrollments,
    form: store.enrollment.form,
    grades: store.grades.grades,
    installments: store.enrollment.installmentsList,
    schoolYears: store.schoolYears.schoolYears,
  }));
  const schoolYearOptions = schoolYears ? [...schoolYears].map((year) => ({
    label: `From ${moment(year.back_to_school_date * 1000).format('MMM yyyy')} to ${moment(year.school_year_end_date * 1000).format('MMM yyyy')}`,
    value: year.school_year_id,
  })) : [];

  React.useEffect(() => {
    const request = { filter: 'active' };

    dispatch(fetchCountries());
    dispatch(fetchCities());
    dispatch(fetchClasses(request));
    dispatch(fetchGrade(request));
    dispatch(fetchSchoolYear(request));
    dispatch(fetchInstallment(request));

    if (params && params.publicId) {
      dispatch(fetchSingleEnrollment(params.publicId));
    }
  }, []);

  React.useEffect(() => {
    scroll.scrollTo('enrollment-steps');
  }, [active]);

  const onPreviousPage = () => {
    const steps = [...active];

    steps.pop();

    setActive(steps);
  };

  const onContinue = () => {
    const list = [...active];

    if (active.includes('student') && active.length === 1) {
      list.push('parent');
    }
    if (active.includes('parent') && active.length === 2) {
      list.push('medical');
    }
    if (active.includes('medical') && active.length === 3) {
      list.push('transport');
    }
    if (active.includes('transport') && active.length === 4) {
      list.push('payment');
    }
    // if (active.includes('payment') && active.length === 5) {}

    setActive(list);
  };

  const onSave = (isContinue) => {
    let valid = false;

    if (active.includes('student') && active.length === 1) {
      valid = EnrolmentHelper.validateStudentInfo(form, params);
    }
    if (active.includes('parent') && active.length === 2) {
      valid = EnrolmentHelper.validateParentInfo(form, params);
    }
    if (active.includes('medical') && active.length === 3) {
      valid = true;
    }
    if (active.includes('transport') && active.length === 4) {
      valid = EnrolmentHelper.validateTransportInfo(form, params);
    }
    if (active.includes('payment') && active.length === 5) {
      valid = EnrolmentHelper.validatePaymentInfo(form, params);
    }

    if (valid) {
      const request = {
        callback: () => {
          if (isContinue) {
            onContinue();
          }
        },
        form,
        isSubmission: isContinue,
        type: active.length,
      };

      if (form.student_id) {
        dispatch(editEnrollment(request));
      } else {
        dispatch(createEnrollment(request));
      }
    }
  };

  const props = {
    cities,
    classes,
    counties,
    data,
    form,
    grades,
    installments,
    schoolYears: schoolYearOptions,
    updateEnrollmentForm: (payload) => dispatch(updateEnrollmentForm(payload)),
  };

  return (
    <>
      <div className="mb-3 card">
        <div className="card-header-tab card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
            {`${params.publicId ? 'Edit Enrollment' : 'Add New Enrollment'}`}
          </div>
        </div>
        <div className="main-card mb-1 card-body" id='enrollment-steps'>
          <div className="row px-2">
            <div className="card-body col-sm-12 py-0 px-2">
              <EnrollSteps active={active} />
              <form noValidate autoComplete='off'>
                {active.includes('student') && active.length === 1 && <StudentInfo {...props} />}
                {active.includes('parent') && active.length === 2 && <ParentInfo {...props} />}
                {active.includes('medical') && active.length === 3 && <MedicalInfo {...props} />}
                {active.includes('transport') && active.length === 4 && <TransportInfo {...props} />}
                {active.includes('payment') && active.length === 5 && <PaymentInfo {...props} />}
                <div className="col-sm-12 actions text-center mb-2 pt-1">
                  {active.length > 1 && (
                    <Button
                      type="button"
                      className="btn-pill btn-shadow btn-wide btn btn-primary mx-1"
                      onClick={onPreviousPage}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    type="button"
                    className="btn-pill btn-shadow btn-wide btn btn-success mx-1"
                    onClick={() => onSave(false)}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    className="btn-pill btn-shadow btn-wide btn btn-info mx-1"
                    onClick={() => onSave(true)}
                  >
                    {active.includes('payment') && active.length === 5 ? 'Save & Submit' : 'Save & Continue'}
                  </Button>
                  <Button
                    type="button"
                    className="btn-pill btn-shadow btn-wide btn btn-primary mx-1"
                    onClick={() => dispatch(push('/enrollments'))}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
              {form?.payments?.length > 0 && <PaymentTable payments={form.payments} />}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default AddEditStudent;
