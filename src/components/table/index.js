import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { any, arrayOf, bool, func, shape, string } from 'prop-types';
import LinkableCellRenderer from './linkable-cell-renderer';
import ImageCellRenderer from './image-cell-renderer';
import BadgeCellRenderer from './badge-cell-render';
import ButtonCellRenderer from './button-cell-renderer';
import DailyEntryCellRenderer from './report-download';
import DownloadCellRenderer from './download-cell-renderer';

const defaultColDef = {
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  floatingFilterComponentParams: { suppressFilterButton: true },
  pagination: true,
  resizable: true,
  sortable: true,
  suppressCellSelection: true,
  suppressFiltersToolPanel: true,
  suppressMenu: true,
  unSortIcon: true,
};

const Table = ({
  children, data, agGridConf, onGridReady, sizeColumnsToFit, containerClass, ...rest
}) => {
  const onReady = (params) => {
    if (sizeColumnsToFit && params.api.sizeColumnsToFit) {
      params.api.sizeColumnsToFit();
    }

    window.onresize = () => {
      params.api.sizeColumnsToFit();
    };

    onGridReady(params);
  };

  return (
    <div className={`ag-theme-alpine ag-grid-custom-height ${containerClass || ''}`}>
      <AgGridReact
        pagination
        paginationPageSize={10}
        paginationNumberFormatter={(params) => ` ${params.value.toLocaleString()} `}
        defaultColDef={{
          ...defaultColDef, ...agGridConf,
        }}
        rowData={data}
        onGridReady={onReady}
        frameworkComponents={{
          badgeCellRenderer: BadgeCellRenderer,
          buttonCellRenderer: ButtonCellRenderer,
          dailyEntryCellRenderer: DailyEntryCellRenderer,
          downloadCellRenderer: DownloadCellRenderer,
          imageCellRenderer: ImageCellRenderer,
          linkableCellRenderer: LinkableCellRenderer,
        }}
        overlayNoRowsTemplate={'<span style="padding: 10px; border: 2px solid #3f6ad8; color: #3f6ad8; background: #fff;">No Records Found</span>'}
        {...rest}
      >
        {children}
      </AgGridReact>
    </div>
  );
};

Table.propTypes = {
  agGridConf: shape({ rowSelection: string }),
  children: any.isRequired,
  containerClass: string,
  data: arrayOf(shape).isRequired,
  onGridReady: func,
  sizeColumnsToFit: bool,
};

Table.defaultProps = {
  agGridConf: {},
  containerClass: null,
  onGridReady: () => {},
  sizeColumnsToFit: true,
};

export default Table;
