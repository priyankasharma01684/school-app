export const classColDefs = [
  {
    checkboxSelection: true,
    field: 'id',
    filter: false,
    headerName: '',
    maxWidth: 50,
    minWidth: 50,
    resizable: false,
    sortable: false,
    unSortIcon: false,
    valueFormatter: () => '',
    width: 60,
  },
  {
    cellRendererSelector: (props) => {
      const Component = {
        component: 'linkableCellRenderer',
        params: {
          href: `/add-update-class/${props.data.class_id}`, text: props.value.capitalizeEachLetter(),
        },
      };

      return Component;
    },
    field: 'class_name',
    headerName: 'Class Name',
    minWidth: 170,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },

  {
    field: 'class_code',
    headerName: 'Class Code',
    minWidth: 170,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },
  {
    field: 'grade_name',
    headerName: 'Grade Name',
    minWidth: 170,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },
  {
    cellStyle: {
      borderColor: '#cccccc', borderStyle: 'solid', borderWidth: '1px',
    },
    field: 'max_no_of_student',
    headerName: 'Max  students',
    minWidth: 170,
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
    minWidth: 170,
    valueFormatter: (props) => (props.value ? 'Active' : 'Inactive'),
  },
];

export default classColDefs;
