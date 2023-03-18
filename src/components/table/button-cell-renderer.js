import { object, string, number } from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AddMoratoriumDate } from '../../pages/students/moratoriaum-date';
import { certificateForm } from '../../actions/certificate-action-type';
import { downloadFile } from '../../actions/file-downloader-action-types';

const ButtonCellRenderer = ({
  className, data, student_id,
}) => {
  const [visible, setVisibility] = React.useState(false);

  const dispatch = useDispatch();

  const onCertificateForm = () => {
    const request = {
      filename: 'certificate.pdf',
      url: `certificate/${student_id}`,
    };

    dispatch(certificateForm(request));
  };
  const onBadgeExport = () => {
    const request = {
      filename: 'badge.pdf',
      url: `id-card/${student_id}`,
    };

    dispatch(downloadFile(request));
  };

  return (
    <>
      <div>
        <button onClick={() => setVisibility(true)} className={`${className}`} type="button">
          <i className="lnr-calendar-full" data-toggle="tooltip" data-placement="top" title="New Moratorium" data-original-title="New Moratorium" />
        </button>
        <button onClick={onCertificateForm} className={`${className}`} type="button">
          <i className="lnr-download" data-toggle="tooltip" data-placement="top" title="Certificate" data-original-title="Certificate" />
        </button>
        <button type="button" onClick={onBadgeExport} className={`${className}`}>
          <img src="icons/badge.svg" alt="badge" height="16" data-toggle="tooltip" data-placement="top" title="" data-original-title="New Moratorium" />
        </button>
      </div>
      {visible && <AddMoratoriumDate data={data} id={student_id} onClose={() => setVisibility(false)} />}
    </>
  );
};

ButtonCellRenderer.propTypes = {
  className: string,
  data: object.isRequired,
  student_id: number.isRequired,
};

ButtonCellRenderer.defaultProps = { className: 'btn btn-link' };

export default ButtonCellRenderer;
