import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { AgGridColumn } from 'ag-grid-react';
import SweetAlert from 'sweetalert2';
import { DashboardHeader, Table } from '../../components';
import { deletePaymentType, fetchPaymentType } from '../../actions/payment-type-action-type';
import { downloadFile } from '../../actions/file-downloader-action-types';
import { paymentTypeColDefs } from './columns';
import Alert from '../../utility/alert';

let gridApi = null;

const PaymentTypes = () => {
  const dispatch = useDispatch();
  const paymentType = useSelector((store) => store.paymentType.paymentType);

  React.useEffect(() => {
    dispatch(fetchPaymentType());
  }, []);
  const onDelete = () => {
    const paymentTypeId = gridApi ? gridApi.getSelectedRows().map((pType) => pType.payment_type_id) : '';

    if (!paymentTypeId?.length) {
      Alert.alert('Please select the payment type, you want to delete.');

      return;
    }

    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want delete the selected Payment Type?',
      title: 'Delete Payment Type',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePaymentType(paymentTypeId));
      }
    });
  };

  const onExcelExport = () => {
    const request = {
      filename: 'payment-type-list.xlsx',
      url: 'payment-type-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <DashboardHeader
        title="Payment Types"
        onAdd={() => dispatch(push('/add-update-payment-type'))}
        onDelete={onDelete}
        onImport={() => dispatch(push('/bulk-import?module=payment types'))}
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
                      {'Search: '}
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
                  data={paymentType}
                  agGridConf={{ rowSelection: 'single' }}
                  suppressRowClickSelection
                  groupSelectsChildren
                  rowGroupPanelShow="always"
                  pivotPanelShow="always"
                  enableRangeSelection
                  onGridReady={(params) => {
                    gridApi = params.api;
                  }}
                >
                  {paymentTypeColDefs.map((column) => <AgGridColumn key={column.field} {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTypes;
