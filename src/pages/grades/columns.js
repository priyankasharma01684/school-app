export const gradeColDefs = [
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
          href: `/add-update-grade/${props.data.grade_id}`,
          text: `${props.data.grade_name}`.capitalizeEachLetter(),
        },
      };

      return Component;
    },
    field: 'grade_name',
    headerName: 'Grade Name',
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },
  {
    field: 'school_name',
    headerName: 'School Name',
  },

  {
    field: 'grade_code',
    headerName: 'Grade Code',
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

export default gradeColDefs;
