import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { Button } from '../../components';
import EnrollSteps from './enroll-steps';
import StudentInfo from './student-info-form';
import ParentInfo from './parent-info-form';
import MedicalInfo from './medical-info-form';
import TransportInfo from './transport-info-form';
import PaymentInfo from './payment-info-form';
import PaymentTable from './payment-table';

export const AddEditStudent = () => {
  // const dispatch = useDispatch();
  // const params = useParams();
  // const [isViewable, setView] = React.useState('step1');
  const onContinue = () => {
    // const obj = {};

    // switch (isViewable) {
    //   case 'step1':
    //     obj = {
    //       class_id,
    //       country_id,
    //       date_of_birth,
    //       enrollment_date,
    //       first_enrollment_date,
    //       gender,
    //       neighborhood,
    //       place_of_birth,
    //       school_year,
    //       section,
    //       seniority,
    //       status,
    //       street,
    //       student_address,
    //       student_email,
    //       student_first_name,
    //       student_last_name,
    //       student_phone_no,
    //       student_profile_picture,
    //       type: isViewable,
    //       type_of_student,
    //     };

    //     break;
    //   case 'step2':
    //     obj = {
    //       father_email_address,
    //       father_first_name,
    //       father_last_name,
    //       father_phone_no,
    //       mother_email_address,
    //       mother_first_name,
    //       mother_last_name,
    //       mother_phone_no,
    //       tutor_date_of_birth,
    //       tutor_email_address,
    //       tutor_first_name,
    //       tutor_gender,
    //       tutor_last_name,
    //       tutor_phone_no,
    //       type: isViewable,
    //     };
    //     break;
    //   case 'step3':
    //     obj = {
    //       amount_paid,
    //       amount_to_pay,
    //       balance,
    //       payment_date,
    //       quater_name,
    //       type: isViewable,
    //     };
    //     break;
    //   case 'step4':
    //     obj = {
    //       amount_paid,
    //       amount_to_pay,
    //       balance,
    //       deadline,
    //       discount,
    //       installment_name,
    //       type: isViewable,
    //     };
    //     break;
    //   case 'step5':
    //     obj = {
    //       allergy: saveLeaveApply,
    //       moreinfo,
    //       reference_hospital,
    //       reference_hospital_address,
    //       type: isViewable,
    //     };
    //     break;
    //   default:
    //     return obj;
    // }
  };

  // const onFileChange = (event) => {
  //   if (!event?.target?.files?.length) {
  //     return;
  //   }

  //   const cloneFiles = [...event.target.files];
  //   const updates = {
  //     ...form,
  //     file: URL.createObjectURL(cloneFiles[0]),
  //     student_profile_picture: event.target.files[0],
  //   };

  //   dispatch(updateStudentForm(updates));
  // };

  // const onSave = () => {
  //   if (!Regex.username(student_first_name)) {
  //     alert('First name is not valid');

  //     return;
  //   }
  //   if (!Regex.username(student_last_name)) {
  //     alert('Last name is not valid');

  //     return;
  //   }

  //   if (!class_id) {
  //     alert('Class is required');

  //     return;
  //   }

  //   if (!student_email.trim().length) {
  //     alert('School email is required');

  //     return;
  //   }

  //   if (!Regex.email(student_email)) {
  //     alert('School email is not valid');

  //     return;
  //   }

  //   if (!student_phone_no.trim().length) {
  //     alert('Phone number is required');

  //     return;
  //   }

  //   if (!Regex.mobile(student_phone_no)) {
  //     alert('Enter a valid phone number');

  //     return;
  //   }
  //   if (!gender) {
  //     alert('Gender is required');

  //     return;
  //   }

  //   if (!age.toString().trim().length) {
  //     alert('Age is required');

  //     return;
  //   }

  //   if (!date_of_birth) {
  //     alert('Date of birth is required');

  //     return;
  //   }

  //   if (!place_of_birth.trim().length) {
  //     alert('Place of birth is required');

  //     return;
  //   }

  //   if (!country_id) {
  //     alert('Country is required');

  //     return;
  //   }

  //   if (!city_id) {
  //     alert('City is required');

  //     return;
  //   }

  //   if (!student_registration_no.trim().length) {
  //     alert('Student Registration number is required');

  //     return;
  //   }

  //   if (!status) {
  //     alert('Status is required');

  //     return;
  //   }

  //   if (!student_address.trim().length) {
  //     alert('Student address is required');

  //     return;
  //   }

  //   if (!student_profile_picture && !params.publicId) {
  //     alert('Profile picture is required');

  //     return;
  //   }

  //   if (student_id) {
  //     dispatch(editEnrollment(form));
  //   } else {
  //     dispatch(createEnrollment(form));
  //   }
  // };

  // const onNavigate = () => {
  //   dispatch(push('/school-students'));
  // };

  return (
    <>
      <div className="mb-3 card">
        <div className="card-header-tab card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
            Add / Edit School Students
          </div>
        </div>
        <div className="main-card mb-1 card-body">
          <div className="row px-2">
            <div className="card-body col-sm-12 py-0 px-2">
              <EnrollSteps />
              <form>
                <StudentInfo />
                <ParentInfo />
                <MedicalInfo />
                <TransportInfo />
                <PaymentInfo />
                <div className="col-sm-12 actions text-center mb-2 pt-1">
                  <Button type="button" className="btn-pill btn-shadow btn-wide btn btn-success mx-1">Save</Button>
                  <Button type="button" className="btn-pill btn-shadow btn-wide btn btn-info mx-1" onClick={onContinue}>
                    Save &amp; Continue
                  </Button>
                  <Button type="button" className="btn-pill btn-shadow btn-wide btn btn-primary mx-1">Cancel</Button>
                </div>
              </form>

              <PaymentTable />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default AddEditStudent;
