import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { AgGridColumn } from 'ag-grid-react';
import SweetAlert from 'sweetalert2';
import { DashboardHeader, Table } from '../../components';
import { deleteOutflow, fetchOutflow } from '../../actions/outflow-action-types';
import { downloadFile } from '../../actions/file-downloader-action-types';
import { OutflowColDefs } from './columns';
import Alert from '../../utility/alert';

let gridApi = null;

const Outflows = () => {
  const dispatch = useDispatch();
  const outflows = useSelector((store) => store.outflow.outflows);

  React.useEffect(() => {
    dispatch(fetchOutflow());
  }, []);

  const onDelete = () => {
    const OutflowId = gridApi ? gridApi.getSelectedRows().map((Outflow) => Outflow.outflow_reason_id) : '';

    if (!OutflowId?.length) {
      Alert.alert('Please select the Outflow, you want to delete.');

      return;
    }

    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want delete the selected Outflow?',
      title: 'Delete Outflow',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOutflow(OutflowId));
      }
    });
  };

  const onExcelExport = () => {
    const request = {
      filename: 'outflow-list.xlsx',
      url: 'outflow-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <DashboardHeader
        title="Outflows"
        onAdd={() => dispatch(push('/add-update-outflow'))}
        onDelete={onDelete}
        onImport={() => dispatch(push('/bulk-import?module=outflows'))}
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
                  data={outflows}
                  suppressRowClickSelection
                  groupSelectsChildren
                  rowGroupPanelShow="always"
                  pivotPanelShow="always"
                  enableRangeSelection
                  pagination
                  paginationPageSize={10}
                  agGridConf={{ rowSelection: 'single' }}
                  onGridReady={(params) => {
                    gridApi = params.api;
                  }}
                >
                  {OutflowColDefs.map((column) => <AgGridColumn key={column.field} {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outflows;
