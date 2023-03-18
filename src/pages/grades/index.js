import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { AgGridColumn } from 'ag-grid-react';
import SweetAlert from 'sweetalert2';
import { DashboardHeader, Table } from '../../components';
import { deleteGrade, fetchGrade } from '../../actions/grades-action-types';
import { downloadFile } from '../../actions/file-downloader-action-types';
import { gradeColDefs } from './columns';
import Alert from '../../utility/alert';

let gridApi = null;

const Grades = () => {
  const dispatch = useDispatch();
  const grades = useSelector((store) => store.grades.grades);

  React.useEffect(() => {
    dispatch(fetchGrade());
  }, []);

  const onDelete = () => {
    const gradeId = gridApi ? gridApi.getSelectedRows().map((grade) => grade.grade_id) : '';

    if (!gradeId?.length) {
      Alert.alert('Please select the Grade, you want to delete.');

      return;
    }

    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want delete the selected Grade?',
      title: 'Delete Grade',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGrade(gradeId));
      }
    });
  };

  const onExcelExport = () => {
    const request = {
      filename: 'grade-list.xlsx',
      url: 'grade-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <DashboardHeader
        supportBulkImport={false}
        title="Grades"
        onAdd={() => dispatch(push('/add-update-grade'))}
        onDelete={onDelete}
        onImport={() => dispatch(push('/bulk-import?module=grades'))}
        onExcelExport={onExcelExport}
        onPDFExport={() => { }}
      />

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
                {/* <div className="col-sm-12 col-md-6">
                  <div id="DataTables_Table_0_filter" className="dataTables_filter">
                    <label>
                      Search:
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder='Search'
                        aria-controls="DataTables_Table_0"
                      />
                    </label>
                  </div>
                </div> */}
              </div>
              <div className="row">
                <Table
                  className="table-striped table-bordered"
                  data={grades}
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
                  {gradeColDefs.map((column) => <AgGridColumn {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;
