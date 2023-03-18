import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { AgGridColumn } from 'ag-grid-react';
import SweetAlert from 'sweetalert2';
import { DashboardHeader, Table } from '../../components';
import { deleteIncomeReason, fetchIncomeReason } from '../../actions/income-reason-action-types';
import { downloadFile } from '../../actions/file-downloader-action-types';
import { incomeReasonColDefs } from './columns';
import Alert from '../../utility/alert';

let gridApi = null;

const CostReasons = () => {
  const dispatch = useDispatch();
  const incomeReason = useSelector((store) => store.incomeReason.incomeReason);

  React.useEffect(() => {
    dispatch(fetchIncomeReason());
  }, []);

  const onDelete = () => {
    const incomeReasonId = gridApi ? gridApi.getSelectedRows().map((reason) => reason.income_reason_id) : '';

    if (!incomeReasonId?.length) {
      Alert.alert('Please select the cost reason, you want to delete.');

      return;
    }

    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want delete the selected Cost Item?',
      title: 'Delete Cost  Of Item',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteIncomeReason(incomeReasonId));
      }
    });
  };

  const onExcelExport = () => {
    const request = {
      filename: 'income-reason-list.xlsx',
      url: 'income-reason-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <DashboardHeader
        title="Income Reason"
        onAdd={() => dispatch(push('/add-update-income-reason'))}
        onDelete={onDelete}
        onImport={() => dispatch(push('/bulk-import?module=income reason'))}
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
              </div>
              <div className="row">
                <Table
                  data={incomeReason}
                  suppressRowClickSelection
                  groupSelectsChildren
                  rowGroupPanelShow="always"
                  pivotPanelShow="always"
                  enableRangeSelection
                  agGridConf={{ rowSelection: 'single' }}
                  onGridReady={(params) => {
                    gridApi = params.api;
                  }}
                >
                  {incomeReasonColDefs.map((column) => <AgGridColumn key={column.field} {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostReasons;
