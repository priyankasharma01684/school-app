export const installColDefs = [
  {
    field: 'class_name',
    filterParams: {
      defaultOption: 'startsWith',
      filterOptions: ['startsWith'],
      filterType: 'multi',
      filters: [
        {
          display: 'inline',
          filter: 'agMultiColumnFilter',
        },
        { filter: 'agMultiColumnFilter' },
      ],
    },
    headerName: 'Class',
  },

  {
    field: 'effective',
    headerName: 'Effective ',
  },
  {
    field: 'paid_student',
    headerName: 'Solvent',
  },
  {
    field: 'predicted_payment',
    headerName: 'Predicted Payment',
  },
  {
    field: 'paid',
    headerName: 'Paid ',
  },
  {
    field: 'discount',
    headerName: 'Discount ',
  },
  {
    field: 'balance',
    headerName: 'Balance ',
  },
];

export const recapColDefs = [

  {
    field: 'effective',
    headerName: 'Effective ',
  },
  {
    field: 'solvent',
    headerName: 'Solvent',
  },
  {
    field: 'fully_paid_student',
    headerName: 'Insolvent',
  },
  {
    field: 'Predicted_payment',
    headerName: 'Predicted Payment',
  },
  {
    field: 'paid',
    headerName: 'Paid ',
  },
  {
    field: 'discount',
    headerName: 'Discount ',
  },
  {
    field: 'balance',
    headerName: 'Balance ',
  },
  {
    field: 'recovery_rate',
    headerName: 'Recovery Rate ',
  },
];

export const dailyEntriesColDefs = [{
  checkboxSelection: true,
  field: 'id',
  filter: false,
  headerName: '',
  maxWidth: 50,
  minWidth: 50,
  sortable: false,
  unSortIcon: false,
  valueFormatter: () => '',
  width: 50,
},
{
  cellRendererSelector: (props) => {
    const Component = {
      component: 'linkableCellRenderer',
      params: {
        href: `/add-update-entries/${props.data.entry_reason_id}`,
        text: `${props.data.income_reason_description}`.capitalizeEachLetter(),
      },
    };

    return Component;
  },
  field: 'registration_number',
  headerName: 'Registration Number ',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},

{
  field: 'student_first_name',
  headerName: 'First Name',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value : 'N/A'),
},
{
  field: 'student_last_name',
  headerName: 'Last Name',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value : 'N/A'),
},
{
  field: 'payment_type_label',
  headerName: 'Payment Method',
  minWidth: 200,
  //  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'amount',
  headerName: 'Amount',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'discount',
  headerName: 'Discount',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'service',
  headerName: 'Service',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},

];
export default installColDefs;
