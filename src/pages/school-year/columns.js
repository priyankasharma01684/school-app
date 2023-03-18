import moment from 'moment';

export const SchoolYearColDefs = [
  {
    checkboxSelection: true,
    field: 'id',
    filter: false,
    headerName: '',
    maxWidth: 50,
    minWidth: 50,
    valueFormatter: () => '',
    width: 50,
  },
  {
    cellRendererSelector: (props) => {
      const Component = {
        component: 'linkableCellRenderer',
        params: {
          href: `/add-update-school-year/${props.data.school_year_id}`,
          text: `${props.data.school_start_year}/${props.data.school_end_year}`,
        },
      };

      return Component;
    },
    field: 'school_start_year',
    flex: 1,
    headerName: 'School Year',
    valueFormatter: (props) => (props.value ? props.value : 'N/A'),
  },

  {
    field: 'back_to_school_date',
    flex: 1,
    headerName: 'Back to School Date',
    valueFormatter: (params) => (params.value ? moment(params.value, 'X').format('DD/MM/YYYY') : ''),
  },
  {
    field: 'school_year_end_date',
    flex: 1,
    headerName: 'School Year End Date',
    valueFormatter: (params) => (params.value ? moment(params.value, 'X').format('DD/MM/YYYY') : ''),
  },
  {
    field: 'registration_start_date',
    filter: 'agDateColumnFilter',
    filterParams: {
      defaultOption: 'equals',
      filterOptions: ['equals'],
    },
    flex: 1,
    headerName: 'Registration Start Date',
    valueFormatter: (params) => (params.value ? moment(params.value, 'X').format('DD/MM/YYYY') : ''),
  },
];

export default SchoolYearColDefs;
