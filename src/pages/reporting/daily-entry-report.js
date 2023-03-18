import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { AgGridColumn } from 'ag-grid-react';
import { DashboardHeader, Table } from '../../components';
import { fetchDailyEntries } from '../../actions/entries-action-type';
import { downloadFile } from '../../actions/file-downloader-action-types';
import { dailyEntriesColDefs } from './columns';

let gridApi = null;

const DailyEntries = () => {
  const dispatch = useDispatch();
  const entries = useSelector((store) => store.entries.entries);

  React.useEffect(() => {
    dispatch(fetchDailyEntries());
  }, []);

  const onExcelExport = () => {
    const request = {
      filename: 'daily-entries-list.xlsx',
      url: 'daily-entry-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <DashboardHeader
        title="Entries"
        supportAdd={false}
        supportDelete={false}
        onDelete={() => {}}
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
                  {dailyEntriesColDefs.map((column) => <AgGridColumn key={column.field} {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyEntries;
