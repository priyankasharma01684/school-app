
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridColumn } from 'ag-grid-react';
import { fetchEnrollment } from '../../actions/enrollment-action-type';
import { Table } from '../../components';
import paymentColDefs from './payment-table-column';

let gridApi = null;

const PaymentTable = () => {
  const dispatch = useDispatch();
  const enroll = useSelector((store) => store.enrollment.enrollments);

  console.log(enroll);

  React.useEffect(() => {
    dispatch(fetchEnrollment());
  }, []);

  return (

    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
      <div className="row">
        <div className="col-sm-12 col-md-12">
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
          data={enroll}
          suppressRowClickSelection
          groupSelectsChildren
          rowGroupPanelShow="always"
          pivotPanelShow="always"
          enableRangeSelection
          pagination
          agGridConf={{ rowSelection: 'single' }}
          onGridReady={(params) => {
            gridApi = params.api;
          }}
        >
          {paymentColDefs.map((column) => <AgGridColumn key={column.field} {...column} />)}
        </Table>
      </div>
    </div>
  );
};

export default PaymentTable;
