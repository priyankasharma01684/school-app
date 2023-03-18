import moment from 'moment';

export const InstallmentColDefs = [{
  checkboxSelection: true,
  field: 'id',
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
        href: `/add-update-Installment/${props.data.installment_id}`,
        text: `${props.data.installment}`,
      },
    };

    return Component;
  },
  field: 'installment',
  flex: 1,
  headerName: 'Installment ',
  maxWidth: 200,
  minWidth: 200,
  valueFormatter: (props) => (props.value),
},

{
  field: 'school_start_year',
  flex: 1,
  headerName: 'School Year',
  maxWidth: 200,
  minWidth: 200,
  valueFormatter: (props) => (props.value ? `${props.data.school_start_year} / ${props.data.school_end_year}` : 'N/A'),
},
{
  field: 'grade_name',
  flex: 1,
  headerName: 'Grades',
  maxWidth: 200,
  minWidth: 200,
  valueFormatter: (props) => (props.value),
},
{
  cellStyle: { textAlign: 'right' },
  field: 'amount_to_pay',
  flex: 1,
  headerName: 'Amount to Pay',
  maxWidth: 200,
  minWidth: 200,
  valueFormatter: (props) => (props.value),
},
{
  field: 'deadline_installment',
  flex: 1,
  headerName: 'Deadline Installment',
  maxWidth: 200,
  minWidth: 200,
  valueFormatter: (params) => (params.value ? moment(params.value, 'X').format('DD/MM/YYYY') : 'N/A'),
},
{
  field: 'number_of_days_before_late_payment',
  flex: 1,
  headerName: 'No of days before being almost late for payment',
  maxWidth: 200,
  minWidth: 200,
  valueFormatter: (props) => (props.value),
},
];

export default InstallmentColDefs;
