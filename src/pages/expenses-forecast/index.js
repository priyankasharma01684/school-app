import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { AgGridColumn } from 'ag-grid-react';
import SweetAlert from 'sweetalert2';
import { DashboardHeader, Table } from '../../components';
import { expenseForecastColDefs } from './columns';
import { deleteExpensesForecast, fetchExpensesForecast } from '../../actions/expenses-forecast-action-types';
import { downloadFile } from '../../actions/file-downloader-action-types';
import Alert from '../../utility/alert';

let gridApi = null;

const ExpensesForecast = () => {
  const dispatch = useDispatch();
  const {
    expenses, totalAmount,
  } = useSelector((store) => ({
    expenses: store.expensesForecast.expenses,
    totalAmount: store.expensesForecast.totalAmount,
  }));

  React.useEffect(() => {
    dispatch(fetchExpensesForecast());
  }, []);

  const onDelete = () => {
    const expenseId = gridApi ? gridApi.getSelectedRows().map((forecast) => forecast.expenses_forecaste_id) : '';

    if (!expenseId?.length) {
      Alert.alert('Please select the expense forecast, you want to delete.');

      return;
    }

    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want delete the selected expense forecast?',
      title: 'Delete Expense Forecast',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteExpensesForecast(expenseId));
      }
    });
  };

  const onExcelExport = () => {
    const request = {
      filename: 'expenses-forecast.xlsx',
      url: 'expenses-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <DashboardHeader
        title="Expenses Forecast"
        onAdd={() => dispatch(push('/expenses-forecast/add-edit-expenses-forecast'))}
        onDelete={onDelete}
        onImport={() => dispatch(push('/bulk-import?module=expenses forecast'))}
        onExcelExport={onExcelExport}
        onPDFExport={() => {}}
      />
      <div className="main-card mb-1 card-body">
        <div className="row px-2">
          <div className="card-body col-sm-12 py-0 px-2">
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="dataTables_length" id="DataTables_Table_0_length">
                    <label>
                      {'Show '}
                      <select
                        name="DataTables_Table_0_length"
                        aria-controls="DataTables_Table_0"
                        className="custom-select custom-select-sm form-control form-control-sm"
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                      {' entries'}
                    </label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 text-right">
                  <strong>
                    <label>{`Total Amount - ${totalAmount}`}</label>
                  </strong>
                </div>
              </div>
              <div className="row">
                <Table
                  sizeColumnsToFit={false}
                  data={expenses}
                  agGridConf={{ rowSelection: 'single' }}
                  onGridReady={(params) => {
                    gridApi = params.api;
                  }}
                >
                  {expenseForecastColDefs.map((column) => <AgGridColumn key={column.field} {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesForecast;
