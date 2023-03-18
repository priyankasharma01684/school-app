import { string, number } from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { downloadFile } from '../../actions/file-downloader-action-types';

const DailyEntryCellRenderer = ({
  className, student_id,
}) => {
  const dispatch = useDispatch();
  const dailyEntryExport = () => {
    const request = {
      filename: 'receipt.pdf',
      url: `receipt/${student_id}`,
    };

    dispatch(downloadFile(request));
  };

  return (
    <>
      <div>
        <button onClick={dailyEntryExport} className={`${className}`} type="button">
          <i className="lnr-download" data-toggle="tooltip" data-placement="top" title="Report" data-original-title="Report" />
        </button>
      </div>
    </>
  );
};

DailyEntryCellRenderer.propTypes = {
  className: string,
  student_id: number.isRequired,
};

DailyEntryCellRenderer.defaultProps = { className: 'btn btn-link' };

export default DailyEntryCellRenderer;
