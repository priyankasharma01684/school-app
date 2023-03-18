export const subUserColDefs = [
  {
    checkboxSelection: true,
    field: 'id',
    filter: false,
    headerName: '',
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
          href: `/add-update-sub-user/${props.data.id}`,
          text: `${props.data.username}`.capitalizeEachLetter(),
        },
      };

      return Component;
    },
    field: 'username',
    headerName: 'Name',
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },
  {
    field: 'email',
    headerName: 'Email',
  },

  {
    field: 'phone_number',
    headerName: 'Phone Number',
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
    minWidth: 200,
    trimInput: true,
    valueFormatter: (props) => (props.value ? 'Active' : 'Inactive'),
  },
];

export default subUserColDefs;
