export const incomeReasonColDefs = [{
  checkboxSelection: true,
  field: 'income_reason_id',
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
        href: `/add-update-income-reason/${props.data.income_reason_id}`,
        text: `${props.data.income_reason_description}`.capitalizeEachLetter(),
      },
    };

    return Component;
  },
  field: 'income_reason_description',
  headerName: 'Income Reason  Label',
  // maxWidth: 300,
  // minWidth: 270,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'source_of_income_description',
  headerName: 'Source of Income',
  // maxWidth: 300,
  // minWidth: 270,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'income_reason_code',
  headerName: 'Income Reason code',
  // maxWidth: 300,
  // minWidth: 270,
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
  // maxWidth: 300,
  // minWidth: 270,
  valueFormatter: (props) => (props.value ? 'Active' : 'Inactive'),
},
];

export default incomeReasonColDefs;
