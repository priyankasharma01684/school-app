import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { AgGridColumn } from 'ag-grid-react';
import SweetAlert from 'sweetalert2';
import { DashboardHeader, Table } from '../../components';
import { deleteSchool, fetchSchools } from '../../actions/schools-action-types';
import { downloadFile } from '../../actions/file-downloader-action-types';
import { schoolColDefs } from './columns';
import Alert from '../../utility/alert';

let gridApi = null;

const Schools = () => {
  const dispatch = useDispatch();
  const schools = useSelector((store) => store.schools.schools);

  React.useEffect(() => {
    dispatch(fetchSchools());
  }, []);

  const onDelete = () => {
    const schoolIds = gridApi ? gridApi.getSelectedRows().map((school) => school.school_id) : '';

    if (!schoolIds?.length) {
      Alert.alert('Please select the school, you want to delete.');

      return;
    }

    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want delete the selected school?',
      title: 'Delete School',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSchool(schoolIds));
      }
    });
  };

  const onExcelExport = () => {
    const request = {
      filename: 'schools.xlsx',
      url: 'school-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <DashboardHeader
        title="Schools"
        onAdd={() => dispatch(push('/schools/add-update-school'))}
        onDelete={onDelete}
        onImport={() => dispatch(push('/bulk-import?module=schools'))}
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
                <div className="col-sm-12 col-md-6">
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
                </div>
              </div>
              <div className="row">
                <Table
                  data={schools}
                  agGridConf={{ rowSelection: 'single' }}
                  onGridReady={(params) => {
                    gridApi = params.api;
                  }}
                >
                  {schoolColDefs.map((column) => <AgGridColumn key={column.field} {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schools;
