import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { AgGridColumn } from 'ag-grid-react';
import SweetAlert from 'sweetalert2';
import { DashboardHeader, Table } from '../../components';
import { deleteSchoolYear, fetchSchoolYear } from '../../actions/school-year-action-type';
import { downloadFile } from '../../actions/file-downloader-action-types';
import { SchoolYearColDefs } from './columns';
import Alert from '../../utility/alert';

let gridApi = null;

const SchoolYears = () => {
  const dispatch = useDispatch();
  const schoolYears = useSelector((store) => store.schoolYears.schoolYears);

  React.useEffect(() => {
    dispatch(fetchSchoolYear());
  }, []);

  const onDelete = () => {
    const SchoolYearId = gridApi ? gridApi.getSelectedRows().map((SchoolYear) => SchoolYear.school_year_id) : '';

    if (!SchoolYearId?.length) {
      Alert.alert('Please select the school year, you want to delete.');

      return;
    }

    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want delete the selected School Year?',
      title: 'Delete School Year',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSchoolYear(SchoolYearId));
      }
    });
  };

  const onExcelExport = () => {
    const request = {
      filename: 'school-year-list.xlsx',
      url: 'school-year-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <DashboardHeader
        title="List of School Years"
        onAdd={() => dispatch(push('/add-update-school-year'))}
        onDelete={onDelete}
        onImport={() => dispatch(push('/bulk-import?module=school year'))}
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
                  data={schoolYears}
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
                  {SchoolYearColDefs.map((column) => <AgGridColumn key={column.field} {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolYears;
