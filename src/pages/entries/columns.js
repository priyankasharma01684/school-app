
export const entriesColDefs = [{
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
  field: 'income_reason_description',
  headerName: 'Income Reason ',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},

{
  cellStyle: { textAlign: 'right' },
  field: 'amount',
  headerName: 'Amount',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value : 'N/A'),
},
{
  field: 'paid_by',
  headerName: 'Paid By',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value : 'N/A'),
},
{
  field: 'payment_type_label',
  headerName: 'Payment Type',
  minWidth: 200,
  //  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'bank_name',
  headerName: 'Bank Name',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'receipt_number',
  headerName: 'Receipt Number',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'comment',
  headerName: 'Comments',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},

{
  cellRendererSelector: (props) => {
    const Component = {
      component: 'badgeCellRenderer',
      params: {
        className: props.value ? 'badge badge-success' : 'badge badge-warning',
        text: props.value ? 'Active' : 'Inactive',
      },
    };

    return Component;
  },
  field: 'status',
  filterParams: {
    defaultOption: 'startsWith',
    filterOptions: ['startsWith'],
  },
  filterValueGetter: (props) => (props.data.status === 1 ? 'Active' : 'Inactive'),
  headerName: 'Status',
  maxWidth: 200,
  minWidth: 200,
  valueFormatter: (props) => (props.value ? 'Active' : 'Inactive'),
},
{
  cellRendererSelector: (props) => {
    const Component = {
      component: 'dailyEntryCellRenderer',
      params: {
        className: 'btn',
        student_id: props.data.student_id,
      },
    };

    return Component;
  },
  field: 'action',
  filter: false,
  headerName: 'Print Receipt',
  minWidth: 200,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
];

export default entriesColDefs;
