import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridColumn } from 'ag-grid-react';
import { Button, Table } from '../../components';
import { fetchRecapTable } from '../../actions/financial-reports-action-types';
import { downloadFile } from '../../actions/file-downloader-action-types';
import { recapColDefs } from './columns';
import Utils from '../../utility';

let gridApi = null;

const RecapInfo = () => {
  const dispatch = useDispatch();
  const recap = useSelector((store) => store.financialReport.recapInformation);

  React.useEffect(() => {
    dispatch(fetchRecapTable());
  }, []);

  const onExcelExport = () => {
    const request = {
      filename: 'recap-information.xlsx',
      url: 'recap-report-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">

      <div className="main-card mb-1 card-body">
        <div className="row px-2">
          <div className="card-body col-sm-12 py-0 px-2">
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper table-striped  dt-bootstrap4 no-footer">
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
                <div className="col-sm-12 col-md-6 text-md-right">
                  <Button onClick={onExcelExport} className="ml-2 p-0 btn">
                    <img
                      src={Utils.getImage('icons/excel.svg')}
                      height={35}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Export to Excel"
                      alt='Export'
                    />
                  </Button>
                </div>
              </div>
              <div className="row">
                <Table
                  className="table-striped table-bordered"
                  data={recap}
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
                  {/* {recapColDefs.map((column) => <AgGridColumn {...column} />)} */}
                  {recapColDefs.map((column) => <AgGridColumn {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecapInfo;
