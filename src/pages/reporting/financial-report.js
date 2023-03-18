import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridColumn } from 'ag-grid-react';
import Select from 'react-select';
import { Button, Table } from '../../components';
import { fetchClasses } from '../../actions/classes-action-types';
import { fetchFinancialReport, fetchFilterFinancialReport } from '../../actions/financial-reports-action-types';
import { downloadFile } from '../../actions/file-downloader-action-types';
import { installColDefs } from './columns';
import Utils from '../../utility';

let gridApi = null;

const FinanceReport = () => {
  const dispatch = useDispatch();

  const {
    financialReport, form, classes,
  } = useSelector((store) => ({
    classes: store.classes.classes,
    financialReport: store.financialReport.financeReport,
    form: store.financialReport.form,
  }));
  const class_id = form?.class_id;
  const section = form?.section;

  const options = classes ? [...classes].map((singleClass) => ({
    label: singleClass.class_name, value: singleClass.class_id,
  })) : [];

  React.useEffect(() => {
    dispatch(fetchFinancialReport());
    dispatch(fetchClasses());
  }, []);

  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    console.log(updates);
    dispatch(fetchFilterFinancialReport(updates));
  };

  const onExcelExport = () => {
    const request = {
      filename: 'financial-report.xlsx',
      url: 'information-report-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <div className="mb-3 card">
      <div className="main-card mb-1 card-body">
        <div className="row px-2">
          <div className="card-body col-sm-12 py-0 px-2">
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper table-striped  dt-bootstrap4 no-footer">
              <div className="row">
                <div className="col-sm-12 col-md-3">
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
                <div className="col-md-4 mb-2">
                  <Select
                    isSearchable
                    name="section"
                    loadingMessage="Please wait loading"
                    placeholder="Select Section"
                    onChange={(value) => onSelectChange('section', value)}
                    options={[
                      {
                        label: 'English',
                        value: 'English',
                      },
                      {
                        label: 'French',
                        value: 'French',
                      },
                    ]}
                    value={section}
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <Select
                    isSearchable
                    isMulti
                    name="class_id"
                    loadingMessage="Please wait loading"
                    placeholder="Select Class"
                    onChange={(value) => onSelectChange('class_id', value)}
                    options={options}
                    value={class_id}
                  />
                </div>
                <div className="col-sm-12 col-md-1 text-md-right">
                  <Button onClick={onExcelExport} className="ml-2 p-0 btn">
                    <img
                      src={Utils.getImage('icons/excel.svg')}
                      height={35}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Export to Excel"
                      alt='Export'
                    />
                  </Button>
                </div>

              </div>
              <div className="row">

                <Table
                  className="table-striped table-bordered"
                  data={financialReport}
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
                  {installColDefs.map((column) => <AgGridColumn {...column} />)}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceReport;
