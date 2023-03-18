export const paymentTypeColDefs = [
  {
    checkboxSelection: true,
    field: 'payment_type_id',
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
          href: `/add-update-payment-type/${props.data.payment_type_id}`,
          text: `${props.data.payment_type_code}`.capitalizeEachLetter(),
        },
      };

      return Component;
    },
    field: 'payment_type_code',
    headerName: 'Payment Type code',
    // maxWidth: 280,
    // minWidth: 270,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },

  {
    field: 'payment_type_label',
    headerName: 'Payment Type Label',
    // maxWidth: 280,
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
    maxWidth: 280,
    minWidth: 270,
    valueFormatter: (props) => (props.value ? 'Active' : 'Inactive'),
  },
];

export default paymentTypeColDefs;
