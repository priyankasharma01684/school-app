import React, { useEffect, useState } from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridColumn } from 'ag-grid-react';
import SweetAlert from 'sweetalert2';
import { DashboardHeader, Table, ProgressBar } from '../../components';
import { deleteStudent, fetchStudents } from '../../actions/students-action-types';
import { downloadFile } from '../../actions/file-downloader-action-types';
import { studentColDefs } from './columns';
import Alert from '../../utility/alert';

let gridApi = null;

const Schools = () => {
  const dispatch = useDispatch();
  const students = useSelector((store) => store.students.students);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setCompleted(() => (Math.floor(Math.random() * 100) + 1), 2000);
  }, []);
  React.useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const onDelete = () => {
    const studentId = gridApi ? gridApi.getSelectedRows().map((student) => student.student_id) : '';

    if (!studentId?.length) {
      Alert.alert('Please select the school, you want to delete.');

      return;
    }

    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want delete the selected student?',
      title: 'Delete Student',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStudent(studentId));
      }
    });
  };

  const onExcelExport = () => {
    const request = {
      filename: 'student-list.xlsx',
      url: 'student-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <DashboardHeader
        supportAdd={false}
        title="School Students"
        onDelete={onDelete}
        onImport={() => dispatch(push('/bulk-import?module=enrollment'))}
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
                  <div className="float-right">
                    <ProgressBar completed={completed} />
                  </div>
                </div> */}
              </div>
              <div className="row">
                <Table
                  data={students}
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
                  {studentColDefs.map((column) => (
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

export default Schools;
