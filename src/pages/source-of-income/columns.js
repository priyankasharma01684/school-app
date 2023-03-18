export const sourceOfIncomeColDefs = [
  {
    checkboxSelection: true,
    field: 'source_of_income_id',
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
          href: `/add-update-source-of-income/${props.data.source_of_income_id}`,
          text: `${props.data.source_of_income_code}`.capitalizeEachLetter(),
        },
      };

      return Component;
    },
    field: 'source_of_income_code',
    headerName: 'Source of income code',
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },

  {
    field: 'source_of_income_description',
    headerName: 'Source of income description',
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
      defaultOption: 'equals',
      filterOptions: ['equals'],
    },
    filterValueGetter: (props) => (props.data.status === 1 ? 'Active' : 'Inactive'),
    headerName: 'Status',
    minWidth: 200,
    valueFormatter: (props) => (props.value ? 'Active' : 'Inactive'),
  },
];

export default sourceOfIncomeColDefs;
