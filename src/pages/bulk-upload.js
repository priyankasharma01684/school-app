import React, { useEffect } from 'react';
import Select from 'react-select';
import DropZone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import Alert from '../utility/alert';
import BulkUploadHelper from '../utility/bulk-uploads';
import { ALLOWED_BULK_IMPORTS, SUPER_ADMIN_ALLOWED_BULK_IMPORTS, USER_SUPER_ADMIN } from '../constants';
import { Button } from '../components';
import { downloadSampleFile, uploadBulkDataFile } from '../actions/bulk-upload-action-types';

const BulkUpload = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search).get('module');
  const [file, setFile] = React.useState(null);
  const [type, setType] = React.useState(null);
  const user = useSelector((store) => store.user.userDetail);
  const ALLOWED_VALUES = USER_SUPER_ADMIN === user?.user_type_id ? SUPER_ADMIN_ALLOWED_BULK_IMPORTS : ALLOWED_BULK_IMPORTS;

  if (params && !ALLOWED_VALUES.includes(params.capitalizeEachLetter())) {
    return <Redirect to='/404' />;
  }

  useEffect(() => {
    if (params) {
      const existingType = {
        label: params.capitalizeEachLetter(),
        value: params.capitalizeEachLetter(),
      };

      setType(existingType);
    }
  }, []);

  const onDrop = (files) => {
    setFile(files[0]);
  };

  function onUpload() {
    if (!file) {
      Alert.alert('Please select a file');

      return;
    }

    if (type.value === 'Select') {
      Alert.alert('Please select a module name');

      return;
    }

    const request = {
      callback: () => {
        setFile(null);
      },
      file,
      url: BulkUploadHelper.getUploadDataFileUrl(type.value),
    };

    dispatch(uploadBulkDataFile(request));
  }

  function onDownload() {
    if (type.value === 'Select') {
      Alert.alert('Please select a module name');

      return;
    }

    const request = { type: BulkUploadHelper.getDownloadType(type.value) };

    dispatch(downloadSampleFile(request));
  }

  function onTypeChange(payload) {
    setType(payload);
    setFile(null);
  }

  return (
    <div className="mb-3 card">

      <div className="card-header-tab card-header">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
          {type ? `Import ${type.value.capitalizeEachLetter()}` : 'Import File'}
        </div>
      </div>
      <div className="main-card mb-1 card-body">
        <div className="row px-2">
          <div className="card-body col-sm-12 py-0 px-2">
            <form noValidate className="row" autoComplete="off">
              <div className="col-sm-6 pr-4">
                <div className="form-group row  mx-0 align-items-center">
                  <div className="col-sm-12 py-0 px-2">
                    <Select
                      isSearchable
                      defaultValue={{
                        label: 'Select Module', value: 'Select',
                      }}
                      name="grade_id"
                      loadingMessage="Please wait loading"
                      placeholder="Select Module"
                      onChange={onTypeChange}
                      options={ALLOWED_VALUES.map((option) => ({
                        label: option, value: option,
                      }))}
                      value={type}
                    />
                  </div>
                </div>
                <div className="col-sm-12 py-0 px-2">
                  <DropZone onDrop={onDrop}>
                    {({
                      getRootProps, getInputProps,
                    }) => (
                      <div className="text-center mt-2">
                        <div className="bulk-import dragdrop" {...getRootProps()}>
                          <input {...getInputProps()} accept=".xlsx, .xlsm, .xlsb, .xltx, .xltm" type="file" />
                          <i className="lnr-upload upload-icon" />
                          <p className='drag-drop-text'>Drag and drop file here, or click to select file</p>
                        </div>
                      </div>
                    )}
                  </DropZone>
                  {file !== null && (
                    <div style={{
                      marginTop: 10, textAlign: 'left',
                    }}
                    >
                      <span>{`Uploaded file - ${file.name}`}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-sm-6 border-left pl-4">
                <div className="col-sm-12 py-0 px-2">
                  <label htmlFor='post-description'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    <a href='javascript:void(0);' className="btn-link" onClick={onDownload}>
                      {' Click to download the sample file'}
                    </a>
                  </label>
                </div>
              </div>
              <div className="col-sm-12 actions text-center mt-4 mb-2 pt-1">
                <Button disabled={file == null} className="btn-pill btn-shadow btn-wide btn btn-primary mx-1" onClick={onUpload}>
                  Upload File
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
