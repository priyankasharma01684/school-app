export const costofItemColDefs = [{
  checkboxSelection: true,
  field: 'cost_item_id',
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
        href: `/add-update-cost-of-item/${props.data.cost_item_id}`,
        text: `${props.data.cost_item_label}`.capitalizeEachLetter(),
      },
    };

    return Component;
  },
  field: 'cost_item_label',
  filterParams: { filterValueGetter: 'hi' },
  headerName: 'Cost Item  Label',

  // maxWidth: 300,
  // minWidth: 260,
  valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
},
{
  field: 'cost_item_code',
  headerName: 'Cost Item Code',
  // maxWidth: 300,
  // minWidth: 300,
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
  // minWidth: 300,
  valueFormatter: (props) => (props.value ? 'Active' : 'Inactive'),
},
];

export default costofItemColDefs;
