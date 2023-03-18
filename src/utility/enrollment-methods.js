import moment from 'moment';
import Regex from './regex';
import Alert from './alert';

class EnrolmentHelper {
  static validateStudentInfo = (form, params) => {
    if (!form.student_profile_picture && !form.student_id && !params.publicId) {
      Alert.alert('Profile picture is required');

      return false;
    }

    if (!Regex.username(form.student_first_name.trim())) {
      Alert.alert('First name is not valid');

      return false;
    }
    if (!Regex.username(form.student_last_name.trim())) {
      Alert.alert('Last name is not valid');

      return false;
    }

    if (!Regex.email(form.student_email.trim())) {
      Alert.alert('Please enter a valid email address');

      return false;
    }

    if (form.student_phone_no && !Regex.mobile(form.student_phone_no)) {
      Alert.alert('Student phone number is required');

      return false;
    }

    if (!form.date_of_birth) {
      Alert.alert('Date of birth is required');

      return false;
    }

    if (!form.place_of_birth.trim().length) {
      Alert.alert('Place of birth is required');

      return false;
    }

    if (!form.section) {
      Alert.alert('Section is required');

      return false;
    }

    if (!form.neighborhood.trim().length) {
      Alert.alert('Neighborhood is required');

      return false;
    }

    // if (!form.street.trim().length) {
    //   Alert.alert('Street is required');

    //   return false;
    // }

    // if (!form.student_address.trim().length) {
    //   Alert.alert('Address is required');

    //   return false;
    // }

    if (!form.gender) {
      Alert.alert('Gender is required');

      return false;
    }

    if (!form.country_id) {
      Alert.alert('Country is required');

      return false;
    }

    // if (!form.seniority) {
    //   Alert.alert('Seniority is required');

    //   return false;
    // }

    if (!form.class_id) {
      Alert.alert('Class is required');

      return false;
    }

    if (!form.enrollment_date) {
      Alert.alert('Enrollment Date is required');

      return false;
    }

    // if (!form.first_enrollment_date) {
    //   Alert.alert('First enrollment date is required');

    //   return false;
    // }

    if (!form.school_year) {
      Alert.alert('School year is required');

      return false;
    }

    if (!form.type_of_student) {
      Alert.alert('Type of Student Date is required');

      return false;
    }

    if (!form.status) {
      Alert.alert('Status is required');

      return false;
    }

    const studentEmailExists = form.student_email ? [form.mother_email_address, form.father_email_address, form.tutor_email_address].includes(form.student_email) : false;
    const studentContactExists = form.student_phone_no ? [form.father_phone_no, form.mother_phone_no, form.tutor_phone_no].includes(form.student_phone_no) : false;

    if (studentEmailExists) {
      Alert.alert('Student\'s phone number should not be same as father or tutor or mother\'s phone number');

      return false;
    }

    if (studentContactExists) {
      Alert.alert('Student\'s phone number should not be same as father or tutor or mother\'s phone number');

      return false;
    }

    return true;
  }

  static validateParentInfo = (form) => {
    if (form.father_first_name && !Regex.username(form.father_first_name)) {
      Alert.alert('Father\'s first name is not valid');

      return false;
    }

    if (form.father_last_name && !Regex.username(form.father_last_name)) {
      Alert.alert('Father\'s last name is not valid');

      return false;
    }

    if (form.father_phone_no && !Regex.mobile(form.father_phone_no)) {
      Alert.alert('Father\'s phone no is not valid');

      return false;
    }

    if (form.father_email_address && !Regex.email(form.father_email_address)) {
      Alert.alert('Father\'s email address is not valid');

      return false;
    }

    if (form.mother_first_name && !Regex.username(form.mother_first_name)) {
      Alert.alert('Mother\'s first name is not valid');

      return false;
    }

    if (form.mother_last_name && !Regex.username(form.mother_last_name)) {
      Alert.alert('Mother\'s last name is not valid');

      return false;
    }

    if (form.mother_phone_no && !Regex.mobile(form.mother_phone_no)) {
      Alert.alert('Mother\'s phone no is not valid');

      return false;
    }

    if (form.mother_email_address && !Regex.email(form.mother_email_address)) {
      Alert.alert('Mother\'s email address is not valid');

      return false;
    }

    if (form.tutor_first_name && !Regex.username(form.tutor_first_name)) {
      Alert.alert('Tutor\'s first name is not valid');

      return false;
    }

    if (form.tutor_last_name && !Regex.username(form.tutor_last_name)) {
      Alert.alert('Tutor\'s last name is not valid');

      return false;
    }

    if (form.tutor_phone_no && !Regex.mobile(form.tutor_phone_no)) {
      Alert.alert('Tutor\'s phone no is not valid');

      return false;
    }

    if (form.tutor_email_address && !Regex.email(form.tutor_email_address)) {
      Alert.alert('Tutor\'s email address is not valid');

      return false;
    }

    const tutorEmailExists = form.tutor_email_address ? [form.mother_email_address, form.father_email_address, form.student_email].includes(form.tutor_email_address) : false;
    const fatherEmailExists = form.father_email_address ? [form.mother_email_address, form.student_email, form.tutor_email_address].includes(form.father_email_address) : false;
    const motherEmailExists = form.mother_email_address ? [form.student_email, form.father_email_address, form.tutor_email_address].includes(form.mother_email_address) : false;

    const tutorContactExists = form.tutor_phone_no ? [form.father_phone_no, form.mother_phone_no, form.student_phone_no].includes(form.tutor_phone_no) : false;
    const fatherContactExists = form.father_phone_no ? [form.mother_phone_no, form.student_phone_no, form.tutor_phone_no].includes(form.father_phone_no) : false;
    const motherContactExists = form.mother_phone_no ? [form.student_phone_no, form.father_phone_no, form.tutor_phone_no].includes(form.mother_phone_no) : false;

    if (tutorEmailExists) {
      Alert.alert('Tutor\'s email address should not be same as student or father or mother\'s email address');

      return false;
    }

    if (motherEmailExists) {
      Alert.alert('Mother\'s email address should not be same as father or student or tutor\'s email address');

      return false;
    }

    if (fatherEmailExists) {
      Alert.alert('Father\'s email address should not be same as tutor or student or mother\'s email address');

      return false;
    }

    if (tutorContactExists) {
      Alert.alert('Tutor\'s phone number should not be same as student or father or mother\'s phone number');

      return false;
    }

    if (motherContactExists) {
      Alert.alert('Mother\'s phone number should not be same as father or student or tutor\'s phone number');

      return false;
    }

    if (fatherContactExists) {
      Alert.alert('Father\'s phone number should not be same as tutor or student or mother\'s phone number');

      return false;
    }

    return true;
  };

  static validateTransportInfo = (form) => {
    if (form.amount_paid > 0 && !Regex.positiveNumbers(form.amount_paid)) {
      Alert.alert('Enter valid amount');

      return false;
    }

    if (form.amount_to_pay > 0 && !Regex.positiveNumbers(form.amount_to_pay)) {
      Alert.alert('Enter valid amount');

      return false;
    }

    return true;
  };

  static validatePaymentInfo = (form) => {
    if (!form.id) {
      Alert.alert('Please select installment');

      return false;
    }

    if (!form.deadline) {
      Alert.alert('Please select deadline');

      return false;
    }

    if (!Regex.positiveNumbers(form.payment_amount_to_pay)) {
      Alert.alert('Enter valid amount to pay');

      return false;
    }

    if (!Regex.positiveNumbers(form.payment_amount_paid)) {
      Alert.alert('Enter valid amount paid');

      return false;
    }

    if (!Regex.positiveNumbers(form.payment_balance)) {
      Alert.alert('Enter valid balance');

      return false;
    }

    if (!Regex.positiveNumbers(form.discount)) {
      Alert.alert('Enter valid discount');

      return false;
    }

    return true;
  };

  static getRequestBody = (payload, type) => {
    const body = new FormData();

    switch (type) {
      case 1: {
        body.append('type', 1);
        body.append('student_first_name', payload.student_first_name);
        body.append('student_last_name', payload.student_last_name);
        body.append('class_name', payload.class_id.value);
        body.append('student_email', payload.student_email);
        body.append('student_phone_no', payload.student_phone_no);
        body.append('gender', payload.gender.value);
        body.append('country_name', payload.country_id.value);
        body.append('type_of_student', payload.type_of_student.value);
        body.append('place_of_birth', payload.place_of_birth);
        body.append('date_of_birth', moment(payload.date_of_birth).format('yyyy/MM/DD').toString());
        body.append('school_year', payload.school_year.value);
        body.append('enrollment_date', moment(payload.enrollment_date).format('yyyy/MM/DD').toString());
        body.append('status', payload.status.value);
        body.append('neighborhood', payload.neighborhood);
        body.append('street', payload.street);

        if (payload.first_enrollment_date) {
          body.append('first_enrollment_date', moment(payload.first_enrollment_date).format('yyyy/MM/DD').toString());
        }

        if (payload.student_address) {
          body.append('student_address', payload.student_address);
        }
        if (payload.section) {
          body.append('section', payload.section.value);
        }
        if (payload.student_id) {
          body.append('student_id', payload.student_id);
        }
        if (payload.student_registration_no) {
          body.append('student_registration_no', payload.student_registration_no);
        }
        if (payload.student_profile_picture) {
          body.append('student_profile_picture', payload.student_profile_picture);
        }
        if (payload.seniority) {
          body.append('seniority', payload.seniority.value);
        }

        break;
      }

      case 2: {
        body.append('type', 2);
        body.append('student_id', payload.student_id);
        body.append('student_name', payload.student_id);
        body.append('school_year', payload.school_year.value);

        if (payload.father_email_address) {
          body.append('father_email_address', payload.father_email_address);
        }

        if (payload.father_first_name) {
          body.append('father_first_name', payload.father_first_name);
        }

        if (payload.father_last_name) {
          body.append('father_last_name', payload.father_last_name);
        }

        if (payload.father_phone_no) {
          body.append('father_phone_no', payload.father_phone_no);
        }

        if (payload.mother_email_address) {
          body.append('mother_email_address', payload.mother_email_address);
        }

        if (payload.mother_first_name) {
          body.append('mother_first_name', payload.mother_first_name);
        }

        if (payload.mother_last_name) {
          body.append('mother_last_name', payload.mother_last_name);
        }

        if (payload.mother_phone_no) {
          body.append('mother_phone_no', payload.mother_phone_no);
        }

        if (payload.tutor_email_address) {
          body.append('tutor_email_address', payload.tutor_email_address);
        }

        if (payload.tutor_first_name) {
          body.append('tutor_first_name', payload.tutor_first_name);
        }

        if (payload.tutor_last_name) {
          body.append('tutor_last_name', payload.tutor_last_name);
        }

        if (payload.tutor_phone_no) {
          body.append('tutor_phone_no', payload.tutor_phone_no);
        }

        if (payload.tutor_phone_no) {
          body.append('tutor_phone_no', payload.tutor_phone_no);
        }

        if (payload.tutor_date_of_birth) {
          body.append('tutor_date_of_birth', moment(payload.tutor_date_of_birth).format('yyyy/MM/DD').toString());
        }

        if (payload.tutor_gender) {
          body.append('tutor_gender', payload.tutor_gender.value);
        }

        break;
      }

      case 3: {
        body.append('type', 3);
        body.append('student_id', payload.student_id);
        body.append('student_name', payload.student_id);

        if (payload.allergy) {
          body.append('allergy', payload.allergy);
        }
        if (payload.moreinfo) {
          body.append('moreinfo', payload.moreinfo);
        }
        if (payload.reference_hospital) {
          body.append('reference_hospital', payload.reference_hospital);
        }
        if (payload.reference_hospital_address) {
          body.append('reference_hospital_address', payload.reference_hospital_address);
        }

        body.append('school_year', payload.school_year.value);
        break;
      }

      case 4: {
        const balance = payload.amount_to_pay - payload.amount_paid;

        body.append('type', 4);
        body.append('student_id', payload.student_id);
        body.append('student_name', payload.student_id);
        body.append('school_year', payload.school_year.value);

        if (payload.amount_paid > 0) {
          body.append('amount_paid', payload.amount_paid);
        }

        if (payload.amount_to_pay > 0) {
          body.append('amount_to_pay', payload.amount_to_pay);
        }

        if (balance) {
          body.append('balance', payload.balance);
        }

        if (payload.payment_date) {
          body.append('payment_date', moment(payload.payment_date).format('yyyy/MM/DD').toString());
        }

        if (payload.quater_name) {
          body.append('quater_name', payload.quater_name.value);
        }
        break;
      }

      case 5: {
        const balance = payload.payment_amount_to_pay - payload.discount - payload.payment_amount_paid;

        body.append('type', 5);
        body.append('school_year', payload.school_year.value);
        body.append('student_id', payload.student_id);
        body.append('student_name', payload.student_id);
        body.append('payment_amount_paid', payload.payment_amount_paid);
        body.append('payment_amount_to_pay', payload.payment_amount_to_pay);
        body.append('payment_balance', balance);
        body.append('deadline', moment(payload.deadline).format('yyyy/MM/DD').toString());
        body.append('discount', payload.discount);
        body.append('installment_id', payload.id.id);
        body.append('installment_name', payload.id.id);
        break;
      }

      default:
        break;
    }

    return body;
  };

  static mapResponse = (data) => {
    const { result } = data.data;
    const response = {
      ...result,
      allergy: result.allergy || '',
      amount_paid: result.transport_amount_paid || '',
      amount_to_pay: result.transport_amount_to_pay || '',
      class_id: {
        label: result.class_name,
        value: result.class_id,
      },
      country_id: {
        label: result.country_name,
        value: result.country_id,
      },
      date_of_birth: moment(result.date_of_birth, 'X').toDate(),
      deadline: null,
      enrollment_date: moment(result.enrollment_date, 'X').toDate(),
      father_email_address: result.father_email_address || '',
      father_first_name: result.father_first_name || '',
      father_last_name: result.father_last_name || '',
      father_phone_no: result.father_phone_no || '',
      first_enrollment_date: moment(result.enrollment_first_date, 'X').toDate(),
      gender: {
        label: result.gender,
        value: result.gender,
      },
      grade_id: {
        label: result.grade_name,
        value: result.grade_id,
      },
      moreinfo: result.moreinfo || '',
      mother_email_address: result.mother_email_address || '',
      mother_first_name: result.mother_first_name || '',
      mother_last_name: result.mother_last_name || '',
      mother_phone_no: result.mother_phone_no || '',
      neighborhood: result.neighborhood || '',
      payment_amount_paid: 0,
      payment_amount_to_pay: 0,
      payment_balance: 0,
      payment_date: result.transport_payment_date ? moment(result.transport_payment_date, 'X').toDate() : null,
      payment_discount: 0,
      payments: data.installment || [],
      quater_name: result.tranport_quater_name ? {
        label: result.tranport_quater_name,
        value: result.tranport_quater_name,
      } : null,
      reference_hospital: result.reference_hospital || '',
      reference_hospital_address: result.reference_hospital_address || '',
      school_year: {
        label: `From ${moment(result.back_to_school_date * 1000).format('MMM yyyy')} to ${moment(result.school_year_end_date * 1000).format('MMM yyyy')}`,
        value: result.school_year_id,
      },
      section: result.section ? {
        label: result.section,
        value: result.section,
      } : null,
      seniority: result.seniority ? {
        label: result.seniority,
        value: result.seniority,
      } : null,
      status: result.status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      },
      street: result.street || '',
      student_address: result.student_address || '',
      student_phone_no: result.student_phone_no || '',
      student_registration_no: result.registration_number || null,
      transport_payment_date: moment(result.transport_payment_date, 'X').toDate(),
      tutor_date_of_birth: result.tutor_date_of_birth ? moment(result.tutor_date_of_birth, 'X').toDate() : null,
      tutor_email_address: result.tutor_email_address || '',
      tutor_first_name: result.tutor_first_name || '',
      tutor_gender: result.tutor_gender ? {
        label: result.tutor_gender,
        value: result.tutor_gender,
      } : null,
      tutor_last_name: result.tutor_last_name || '',
      tutor_phone_no: result.tutor_phone_no || '',
      type_of_student: result.type_of_student ? {
        label: result.type_of_student,
        value: result.type_of_student,
      } : null,
    };

    return response;
  }
}

export default EnrolmentHelper;
