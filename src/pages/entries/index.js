import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { AgGridColumn } from 'ag-grid-react';
import SweetAlert from 'sweetalert2';
import { DashboardHeader, Table } from '../../components';
import { deleteEntries, fetchEntries } from '../../actions/entries-action-type';
import { downloadFile } from '../../actions/file-downloader-action-types';
import { entriesColDefs } from './columns';
import Alert from '../../utility/alert';

let gridApi = null;

const Entries = () => {
  const dispatch = useDispatch();
  const entries = useSelector((store) => store.entries.entries);

  React.useEffect(() => {
    dispatch(fetchEntries());
  }, []);

  const onDelete = () => {
    const entriesId = gridApi ? gridApi.getSelectedRows().map((entry) => entry.entry_reason_id) : '';

    if (!entriesId?.length) {
      Alert.alert('Please select the entries, you want to delete.');

      return;
    }

    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want delete the selected Entries?',
      title: 'Delete Entries',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEntries(entriesId));
      }
    });
  };

  const onExcelExport = () => {
    const request = {
      filename: 'entries-list.xlsx',
      url: 'entries-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <DashboardHeader
        title="Entries"
        onAdd={() => dispatch(push('/add-update-entries'))}
        onDelete={onDelete}
        onImport={() => dispatch(push('/bulk-import?module=entries'))}
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

                {/* <div className="col-sm-12 col-md-6">
                  <div className="text-right">
                    <Button className="btn btn-sm btn-pill btn-warning" onClick={() => dispatch(push('/daily-entries'))}>
                      Daily Entry Report
                    </Button>
                  </div>
                </div> */}
              </div>
              <div className="row">
                <Table
                  data={entries}
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
                  {entriesColDefs.map((column) => <AgGridColumn key={column.field} {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entries;
