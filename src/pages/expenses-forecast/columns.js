import moment from 'moment';

export const expenseForecastColDefs = [{
  checkboxSelection: true,
  field: 'expenses_forecaste_id',
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
        href: `/expenses-forecast/add-edit-expenses-forecast/${props.data.expenses_forecaste_id}`,
        text: `From ${moment(props.data.start_year).format('yyyy')} to ${moment(props.data.end_year).format('yyyy')}`,
      },
    };

    return Component;
  },
  field: 'year',
  filterValueFormatter: (props) => `From ${moment(props.data.start_year).format('MMM yyyy')} to ${moment(props.data.end_year).format('MMM yyyy')}`,
  flex: 1,
  headerName: 'School Year',
},
{
  field: 'month',
  flex: 1,
  headerName: 'Month',
  valueFormatter: (props) => props.value.capitalizeEachLetter(),
  width: 350,
},
{
  field: 'amount',
  flex: 1,
  headerName: 'Amount',
  maxWidth: 350,
  minWidth: 300,
  width: 350,
}];

export default expenseForecastColDefs;
