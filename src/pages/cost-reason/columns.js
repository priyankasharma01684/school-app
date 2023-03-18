export const costReasonColDefs = [{
  checkboxSelection: true,
  field: 'cost_reason_id',
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
      minWidth: 150,
      params: {
        href: `/add-update-cost-reason/${props.data.cost_reason_id}`,
        text: `${props.data.cost_reason_label}`.capitalizeEachLetter(),
      },
    };

    return Component;
  },
  field: 'cost_reason_label',
  headerName: 'Cost Reason  Label',
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'cost_reason_code',
  headerName: 'Cost Reason code',
  minWidth: 150,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'cost_item_label',
  headerName: 'Cost Item Label',
  minWidth: 150,
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
  minWidth: 150,
  valueFormatter: (props) => (props.value ? 'Active' : 'Inactive'),
},
];

export default costReasonColDefs;
