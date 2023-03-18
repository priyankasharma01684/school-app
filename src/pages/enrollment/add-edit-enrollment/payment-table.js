
import React from 'react';
import { AgGridColumn } from 'ag-grid-react';
import { arrayOf, number, shape } from 'prop-types';
import { Table } from '../../../components';
import { paymentColDefs } from '../columns';

let gridApi;

const PaymentTable = ({ payments }) => {
  const [pageSize, onChangePageSize] = React.useState(10);

  const onPageSizeChanged = (e) => {
    const newPageSize = e.target.value;

    onChangePageSize(newPageSize);
    gridApi.paginationSetPageSize(newPageSize);
  };

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
                onChange={onPageSizeChanged}
                value={pageSize}
              >
                <option value={5}>5</option>
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
          suppressRowClickSelection
          groupSelectsChildren
          filter={false}
          floatingFilter={false}
          data={payments}
          containerClass='ag-grid-enrollment-payment-table'
          rowGroupPanelShow="always"
          pivotPanelShow="always"
          enableRangeSelection
          pagination
          agGridConf={{
            filter: false,
            floatingFilter: false,
            rowSelection: 'single',
          }}
          paginationPageSize={pageSize}
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

PaymentTable.propTypes = { payments: arrayOf(shape({ amount_to_pay: number.isRequired })).isRequired };

export default PaymentTable;
