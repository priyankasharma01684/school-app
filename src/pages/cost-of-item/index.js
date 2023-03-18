import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { AgGridColumn } from 'ag-grid-react';
import SweetAlert from 'sweetalert2';
import { DashboardHeader, Table } from '../../components';
import { deleteCostOfItem, fetchCostOfItem } from '../../actions/cost-item-action-types';
import { costofItemColDefs } from './columns';
import { downloadFile } from '../../actions/file-downloader-action-types';
import Alert from '../../utility/alert';

let gridApi = null;

const CostOfItems = () => {
  const dispatch = useDispatch();
  const costofitems = useSelector((store) => store.costItem.costOfItems);

  React.useEffect(() => {
    dispatch(fetchCostOfItem());
  }, []);

  const onDelete = () => {
    const costOfItemIds = gridApi ? gridApi.getSelectedRows().map((costofitem) => costofitem.cost_item_id) : '';

    if (!costOfItemIds?.length) {
      Alert.alert('Please select cost item');

      return;
    }

    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want delete the selected Cost Item?',
      title: 'Delete Cost  Of Item',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCostOfItem(costOfItemIds));
      }
    });
  };

  const onExcelExport = () => {
    const request = {
      filename: 'cost-item-list.xlsx',
      url: 'cost-item-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <DashboardHeader
        title="Cost Items"
        onAdd={() => dispatch(push('/add-update-cost-of-item'))}
        onDelete={onDelete}
        onImport={() => dispatch(push('/bulk-import?module=cost item'))}
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
                  data={costofitems}
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
                  {costofItemColDefs.map((column) => <AgGridColumn key={column.field} {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostOfItems;
