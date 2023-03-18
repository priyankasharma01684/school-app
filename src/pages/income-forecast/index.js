import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { AgGridColumn } from 'ag-grid-react';
import SweetAlert from 'sweetalert2';
import { DashboardHeader, Table } from '../../components';
import { incomeForecastColDefs } from './columns';
import { deleteIncomeForecast, fetchIncomeForecast } from '../../actions/income-forecast-action-types';
import { downloadFile } from '../../actions/file-downloader-action-types';
import Alert from '../../utility/alert';

let gridApi = null;

const IncomeForecast = () => {
  const dispatch = useDispatch();
  const {
    incomeForecast, totalAmount,
  } = useSelector((store) => ({
    incomeForecast: store.incomeForecast.income,
    totalAmount: store.incomeForecast.totalAmount,
  }));

  React.useEffect(() => {
    dispatch(fetchIncomeForecast());
  }, []);

  const onDelete = () => {
    const incomeId = gridApi ? gridApi.getSelectedRows().map((forecast) => forecast.income_forecaste_id) : '';

    if (!incomeId?.length) {
      Alert.alert('Please select the income forecast, you want to delete.');

      return;
    }

    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want delete the selected income forecast?',
      title: 'Delete Income Forecast',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteIncomeForecast(incomeId));
      }
    });
  };

  const onExcelExport = () => {
    const request = {
      filename: 'income-forecast.xlsx',
      url: 'income-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <DashboardHeader
        title="Income Forecast"
        onAdd={() => dispatch(push('/income-forecast/add-edit-income-forecast'))}
        onDelete={onDelete}
        onImport={() => dispatch(push('/bulk-import?module=income forecast'))}
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
                  {/* <div id="DataTables_Table_0_filter" className="dataTables_filter">
                    <label>
                      {'Search: '}
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder='Search'
                        aria-controls="DataTables_Table_0"
                      />
                    </label>
                  </div> */}
                  <strong>
                    <label>{`Total Amount - ${totalAmount || 0}`}</label>
                  </strong>
                </div>
              </div>

              <div className="row">
                <Table
                  sizeColumnsToFit={false}
                  data={incomeForecast}
                  agGridConf={{ rowSelection: 'single' }}
                  onGridReady={(params) => {
                    gridApi = params.api;
                  }}
                >
                  {incomeForecastColDefs.map((column) => <AgGridColumn key={column.field} {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeForecast;
