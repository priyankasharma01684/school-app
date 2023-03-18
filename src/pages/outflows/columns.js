export const OutflowColDefs = [
  {
    checkboxSelection: true,
    field: 'outflow_reason_id',
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
          href: `/add-update-outflow/${props.data.outflow_reason_id}`,
          text: `${props.data.cost_reason_label}`.capitalizeEachLetter(),
        },
      };

      return Component;
    },
    field: 'cost_reason_label',
    headerName: 'Cost Reason ',
    minWidth: 200,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },

  {
    cellStyle: { textAlign: 'right' },
    field: 'amount',
    headerName: 'Amount',
    minWidth: 200,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
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

  // {
  //   cellRendererSelector: (props) => {
  //     const Component = {
  //       component: 'badgeCellRenderer',
  //       params: {
  //         className: props.value ? 'badge badge-success' : 'badge badge-warning',
  //         text: props.value ? 'Active' : 'Inactive',
  //       },
  //     };

  //     return Component;
  //   },
  //   field: 'status',
  //   filterParams: {
  //     defaultOption: 'equals',
  //     filterOptions: ['equals'],
  //   },
  //   filterValueGetter: (props) => (props.data.status === 1 ? 'Active' : 'Inactive'),
  //   headerName: 'Status',
  //   maxWidth: 180,
  //   minWidth: 180,
  //   valueFormatter: (props) => (props.value ? 'Active' : 'Inactive'),
  //   width: 180,
  // },
];

export default OutflowColDefs;
