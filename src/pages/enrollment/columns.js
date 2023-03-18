import moment from 'moment';

export const enrolmentColDefs = [{
  checkboxSelection: true,
  field: 'student_id',
  filter: false,
  headerName: '',
  minWidth: 50,
  sortable: false,
  unSortIcon: false,
  valueFormatter: () => '',
  width: 50,
},
{
  cellRendererSelector: (props) => {
    const Component = {
      component: 'imageCellRenderer',
      params: { image: props.value },
    };

    return Component;
  },
  field: 'student_profile_picture',
  filter: false,
  headerName: 'Picture',
  minWidth: 90,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  width: 90,
},
{
  cellRendererSelector: (props) => {
    const Component = {
      component: 'linkableCellRenderer',
      params: {
        href: `/enrollments/add-update-enrollment/${props.data.student_id}`,
        text: `${props.data.student_first_name} ${props.data.student_last_name}`.capitalizeEachLetter(),
      },
    };

    return Component;
  },
  field: 'student_first_name',
  headerName: 'Student Name',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'student_registration_no',
  headerName: 'Registration Number',
  minWidth: 200,
},
// {
//   field: 'student_email',
//   headerName: 'Email Address',
//   minWidth: 200,
// },
// {
//   field: 'student_phone_no',
//   headerName: 'Phone Number',
//   minWidth: 200,
// },
{
  field: 'gender',
  headerName: 'Gender',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'class_name',
  headerName: 'Class',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'status',
  headerName: 'Status',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value : 'N/A'),
},
{
  cellRendererSelector: (props) => {
    const Component = {
      component: 'buttonCellRenderer',
      params: {
        className: 'btn btn-link',
        data: props.data,
        student_id: props.data.student_id,
      },
    };

    return Component;
  },

  field: 'action',
  filter: false,
  headerName: 'Actions',
  minWidth: 200,
  valueFormatter: () => ' ',
},
  // {
  //   cellRendererSelector: () => {
  //     const Component = {
  //       component: 'downloadCellRenderer',
  //       params: { className: 'btn btn-link' },
  //     };

  //     return Component;
  //   },

  //   field: 'financial-report',
  //   filter: false,
  //   headerName: 'Financial Report',
  //   minWidth: 200,
  //   valueFormatter: () => ' ',
  // },

];

export const paymentColDefs = [{
  field: 'installment_name',
  filter: true,
  floatingFilter: true,
  headerName: 'Installment Name',
  minWidth: 200,
},
{
  field: 'amount_to_pay',
  filter: true,
  floatingFilter: true,
  headerName: 'Amount to Pay',
  minWidth: 200,
},
{
  field: 'discount',
  filter: true,
  floatingFilter: true,
  headerName: 'Discount',
  minWidth: 200,
},
{
  field: 'amount_paid',
  filter: true,
  floatingFilter: true,
  headerName: 'Amount Paid',
  minWidth: 200,
},
{
  field: 'balance',
  filter: true,
  floatingFilter: true,
  headerName: 'Balance',
  minWidth: 200,
},
{
  field: 'deadline',
  filter: false,
  floatingFilter: false,
  headerName: 'Deadline',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? moment(props.value).format('MM/DD/yyyy') : 'N/A'),
},

];

export default enrolmentColDefs;
