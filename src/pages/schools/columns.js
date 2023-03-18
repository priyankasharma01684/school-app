export const schoolColDefs = [
  {
    checkboxSelection: true,
    field: 'school_id',
    filter: false,
    headerName: '',
    minWidth: 48,
    // sortable: false,
    // unSortIcon: false,
    valueFormatter: () => '',
    width: 48,
  },
  {
    cellRendererSelector: (props) => {
      const Component = {
        component: 'imageCellRenderer',
        params: { image: props.value },
      };

      return Component;
    },
    field: 'school_logo',
    filter: false,
    headerName: 'Picture',
    minWidth: 90,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
    width: 100,
  },
  {
    cellRendererSelector: (props) => {
      const Component = {
        component: 'linkableCellRenderer',
        params: {
          href: `/schools/add-update-school/${props.data.school_id}`,
          text: `${props.data.school_name}`.capitalizeEachLetter(),
        },
      };

      return Component;
    },
    field: 'school_name',
    headerName: 'School Name',
    minWidth: 200,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },
  {
    field: 'school_address',
    headerName: ' Address',
    minWidth: 200,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },
  {
    field: 'school_category',
    headerName: ' Category',
    minWidth: 200,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },
  {
    field: 'school_email',
    headerName: ' Email Address',
    minWidth: 200,
  },
  {
    field: 'school_phone_no',
    headerName: ' Phone Number',
    minWidth: 200,
  },
  {
    field: 'school_licence_number',
    headerName: 'Licence Number',
    minWidth: 200,
  },
  {
    field: 'country_name',
    headerName: 'Country',
    minWidth: 200,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },
  {
    field: 'city_name',
    headerName: 'City',
    minWidth: 200,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },
  {
    field: 'number',
    headerName: 'Plot Number',
    minWidth: 200,
  },
  {
    field: 'street',
    headerName: 'Street',
    minWidth: 200,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },
  {
    field: 'neighborhood',
    headerName: 'Neighborhood',
    minWidth: 200,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },
  {
    field: 'regional_delegation',
    headerName: 'Regional Delegation',
    minWidth: 200,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },
  {
    field: 'subdivision_delegation',
    headerName: 'Subdivision Delegation',
    minWidth: 200,
    valueFormatter: (props) => (props.value ? props.value.capitalizeEachLetter() : 'N/A'),
  },
];

export default schoolColDefs;
