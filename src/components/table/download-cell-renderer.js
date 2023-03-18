import { string } from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { downloadFile } from '../../actions/file-downloader-action-types';

const DownloadCellRenderer = ({ className }) => {
  const dispatch = useDispatch();
  const dailyEntryExport = () => {
    const request = {
      filename: 'financial-report.xlsx',
      url: 'recap-report-export',
    };

    dispatch(downloadFile(request));
  };

  return (
    <>
      <div>
        <button onClick={dailyEntryExport} className={`${className}`} type="button">
          <i className="lnr-download" data-toggle="tooltip" data-placement="top" title="Daily Entry" data-original-title="Certificate" />
        </button>
      </div>
    </>
  );
};

DownloadCellRenderer.propTypes = { className: string };

DownloadCellRenderer.defaultProps = { className: 'btn btn-link' };

export default DownloadCellRenderer;
