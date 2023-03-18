import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { AgGridColumn } from 'ag-grid-react';
import SweetAlert from 'sweetalert2';
import { DashboardHeader, Table } from '../../components';
import { deleteSubUser, fetchSubUser } from '../../actions/sub-user-action-type';
import { downloadFile } from '../../actions/file-downloader-action-types';
import { subUserColDefs } from './columns';
import Alert from '../../utility/alert';

let gridApi = null;

const SubUsers = () => {
  const dispatch = useDispatch();
  const subUsers = useSelector((store) => store.subUsers.subUsers);

  React.useEffect(() => {
    dispatch(fetchSubUser());
  }, []);

  const onDelete = () => {
    const userId = gridApi ? gridApi.getSelectedRows().map((subUser) => subUser.id) : '';

    if (!userId?.length) {
      Alert.alert('Please select the User, you want to delete.');

      return;
    }

    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want delete the selected User?',
      title: 'Delete User',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSubUser(userId));
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
        title="Sub Admin"
        onAdd={() => dispatch(push('/add-update-sub-user'))}
        onDelete={onDelete}
        onImport={() => { }}
        onExcelExport={() => {}}
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
                  data={subUsers}
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
                  {subUserColDefs.map((column) => <AgGridColumn {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubUsers;
