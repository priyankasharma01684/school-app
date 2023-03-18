import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { AgGridColumn } from 'ag-grid-react';
import SweetAlert from 'sweetalert2';
import { DashboardHeader, Table } from '../../components';
import { deleteSourceOfIncome, fetchSourceOfIncome } from '../../actions/source-of-income-action-type';
import { downloadFile } from '../../actions/file-downloader-action-types';
import { sourceOfIncomeColDefs } from './columns';
import Alert from '../../utility/alert';

let gridApi = null;

const SourceOfIncome = () => {
  const dispatch = useDispatch();
  const sourceOfIncome = useSelector((store) => store.sourceOfIncome.sourceofincome);

  React.useEffect(() => {
    dispatch(fetchSourceOfIncome());
  }, []);

  const onDelete = () => {
    const sourceOfIncomeIds = gridApi ? gridApi.getSelectedRows().map((source) => source.source_of_income_id) : '';

    if (!sourceOfIncomeIds?.length) {
      Alert.alert('Please select the source of income, you want to delete.');
    }
    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want delete the selected Source of  income?',
      title: 'Delete Source Of income',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSourceOfIncome(sourceOfIncomeIds));
      }
    });
  };

  const onExcelExport = () => {
    const request = {
      filename: 'sourceofincome.xlsx',
      url: 'sourceofincome-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <DashboardHeader
        title="Source Of Income"
        onAdd={() => dispatch(push('/add-update-source-of-income'))}
        onDelete={onDelete}
        onImport={() => dispatch(push('/bulk-import?module=source of income'))}
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
                  data={sourceOfIncome}
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
                  {sourceOfIncomeColDefs.map((column) => (
                    <AgGridColumn
                      key={column.field}
                      {...column}
                    />
                  ))}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceOfIncome;
