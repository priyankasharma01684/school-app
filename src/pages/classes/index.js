import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { AgGridColumn } from 'ag-grid-react';
import SweetAlert from 'sweetalert2';
import { classColDefs } from './columns';
import { DashboardHeader, Table } from '../../components';
import { deleteClass, fetchClasses } from '../../actions/classes-action-types';
import { downloadFile } from '../../actions/file-downloader-action-types';
import Alert from '../../utility/alert';

let gridApi = null;

const Classes = () => {
  const dispatch = useDispatch();
  const classes = useSelector((store) => store.classes.classes);

  React.useEffect(() => {
    dispatch(fetchClasses());
  }, []);

  const onDelete = () => {
    const classId = gridApi ? gridApi.getSelectedRows().map((item) => item.class_id) : '';

    if (!classId?.length) {
      Alert.alert('Please select class');

      return;
    }

    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want delete the selected class?',
      title: 'Delete class',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteClass(classId));
      }
    });
  };

  const onExcelExport = () => {
    const request = {
      filename: 'class-list.xlsx',
      url: 'class-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <DashboardHeader
        supportBulkImport={false}
        title="Classes"
        onAdd={() => dispatch(push('/add-update-class'))}
        onDelete={onDelete}
        onImport={() => dispatch(push('/bulk-import?module=classes'))}
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
                    <label htmlFor='range'>
                      {'Show '}
                      <select
                        id='range'
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
                    {/* <label htmlFor='search'>
                      {'Search: '}
                      <input
                        id="search"
                        type="search"
                        className="form-control form-control-sm"
                        placeholder='Search'
                        aria-controls="DataTables_Table_0"
                        onChange={makeSearch}
                      />
                    </label> */}
                  </div>
                </div>
              </div>
              <div className="row">
                <Table
                  data={classes}
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
                  {classColDefs.map((column) => <AgGridColumn key={column.field} {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
