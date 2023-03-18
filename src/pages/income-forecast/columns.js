import moment from 'moment';

export const incomeForecastColDefs = [{
  checkboxSelection: true,
  field: 'income_forecaste_id',
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
        href: `/income-forecast/add-edit-income-forecast/${props.data.income_forecaste_id}`,
        text: `From ${moment(props.data.start_year).format('yyyy')} to ${moment(props.data.end_year).format('yyyy')}`,
      },
    };

    return Component;
  },
  field: 'year',
  flex: 1,
  headerName: 'School Year',
},
{
  field: 'month',
  flex: 1,
  headerName: 'Month',
  valueFormatter: (props) => props.value.capitalizeEachLetter(),
},
{
  cellStyle: { textAlign: 'right' },
  field: 'amount',
  flex: 1,
  headerName: 'Amount',
}];

export default incomeForecastColDefs;
