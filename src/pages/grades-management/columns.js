export const studentColDefs = [{
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
        href: `/school-students/add-update-student/${props.data.student_id}`,
        text: `${props.data.student_first_name} ${props.data.student_last_name}`.capitalizeEachLetter(),
      },
    };

    return Component;
  },
  field: 'student_first_name',
  headerName: 'Student Name',
  minWidth: 220,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'student_registration_no',
  headerName: 'Registration No',
  minWidth: 200,
},
{
  field: 'student_email',
  headerName: 'Email Address',
  minWidth: 200,
},
{
  field: 'student_phone_no',
  headerName: 'Phone Number',
  minWidth: 200,
},
{
  field: 'gender',
  headerName: 'Gender',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'place_of_birth',
  headerName: 'Place of Birth',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'student_address',
  headerName: 'Address',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
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
];

export default studentColDefs;
