import React from 'react';
import { func } from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import DropZone from 'react-dropzone';
import { Button, DateCalenderInput, Modal } from '../../components';
import Alert from '../../utility/alert';

export const AddPost = ({
  onClose, onSave,
}) => {
  const [form, setForm] = React.useState({
    description: '',
    end_date: null,
    school_wall_image: null,
    start_date: null,
    thumbnail: null,
    title: '',
  });
  const {
    description, end_date, school_wall_image, start_date, thumbnail, title,
  } = form;

  const onDrop = (key, files) => {
    const updates = {
      ...form,
      [key]: files[0],
    };

    setForm(updates);
  };

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updates);
  };

  const onDateChange = (name, date) => {
    const updates = {
      ...form,
      [name]: date,
    };

    setForm(updates);
  };

  const onValidate = () => {
    if (!title.trim()) {
      Alert.alert('Title is required');

      return;
    }

    if (!description.trim()) {
      Alert.alert('description is required');

      return;
    }

    if (!start_date) {
      Alert.alert('Start date time is required');

      return;
    }

    if (!end_date) {
      Alert.alert('End date time is required');

      return;
    }

    if (moment(start_date).format('x') > moment(end_date).format('x')) {
      Alert.alert('End date can not be before start date.');

      return;
    }

    if (school_wall_image && school_wall_image?.type?.indexOf('video') > -1 && !thumbnail) {
      Alert.alert('Please upload the video thumbnail.');

      return;
    }

    onSave(form);
  };

  return (
    <Modal>
      <div
        className="modal fade show"
        id="addingParentInfo"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        style={{
          background: 'rgba(0, 0, 0, 0.5)', display: 'block', paddingRight: 15,
        }}
      >
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <h4 className="text-center mt-4 mb-0">Add Post</h4>
            <Button
              type="button"
              className="close topRight"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
            </Button>
            <div className="modal-body px-4 mx-2 mt-3 pb-5">
              <form noValidate autoComplete='off'>
                <div className="form-group">
                  <label htmlFor='post-title'>*Enter Title</label>
                  <input
                    name='title'
                    id='post-title'
                    placeholder='Enter title'
                    type='text'
                    className="form-control"
                    onChange={onChange}
                    value={title}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor='post-description'>*Add Text/Description</label>
                  <textarea rows={3} className="form-control" name='description' id='post-description' onChange={onChange} value={description} />
                </div>
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label>*Start Date</label>
                    <DatePicker
                      showTimeInput
                      showMonthDropdown
                      showYearDropdown
                      title='Start Date Time'
                      name='start_date'
                      id='start_date'
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy hh:mm a"
                      minDate={new Date()}
                      placeholderText="Click to select a start date time"
                      className="form-control dateTimePicker"
                      onChange={(date) => onDateChange('start_date', date)}
                      selected={start_date}
                      customInput={<DateCalenderInput />}
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label>*End Date</label>
                    <DatePicker
                      showTimeInput
                      showMonthDropdown
                      showYearDropdown
                      title='End Date Time'
                      id='end_date'
                      name='end_date'
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy hh:mm a"
                      minDate={start_date || new Date()}
                      placeholderText="Click to select a end date time"
                      className="form-control dateTimePicker"
                      onChange={(date) => onDateChange('end_date', date)}
                      selected={end_date}
                      customInput={<DateCalenderInput />}
                    />
                  </div>
                </div>
                <DropZone onDrop={(acceptedFiles) => onDrop('school_wall_image', acceptedFiles)}>
                  {({
                    getRootProps, getInputProps,
                  }) => (
                    <div className="text-center mt-2">
                      <div {...getRootProps()} className="upload-inline dragdrop">
                        <input
                          accept="video/*, image/*, .pdf, application/pdf, .xlsx, .xlsm, .xlsb, .xltx, .xltm, .doc, .docx, .ppt, .pptx,"
                          type="file"
                          {...getInputProps()}
                        />
                        <i className="lnr-upload upload-icon" />
                        <p className='drag-drop-text'>Drag and drop file here, or click to select file</p>
                      </div>
                    </div>
                  )}
                </DropZone>
                {school_wall_image && school_wall_image.type.indexOf('video') > -1 && (
                  <DropZone onDrop={(acceptedFiles) => onDrop('thumbnail', acceptedFiles)}>
                    {({
                      getRootProps, getInputProps,
                    }) => (
                      <div className="text-center mt-2">
                        <div className="upload-inline dragdrop" {...getRootProps()}>
                          <input {...getInputProps()} accept="image/*" type="file" />
                          <i className="lnr-upload upload-icon" />
                          <p className='drag-drop-text'>Drag and drop video thumbnail here, or click to select video thumbnail</p>
                        </div>
                      </div>
                    )}
                  </DropZone>
                )}
                {school_wall_image !== null && (
                  <div className="text-center">
                    <span>{`Uploaded file - ${school_wall_image.name}`}</span>
                  </div>
                )}
                {thumbnail !== null && (
                  <div className="text-center">
                    <span>{`Video Thumbnail - ${thumbnail.name}`}</span>
                  </div>
                )}
                <div className="text-center">
                  <Button onClick={onValidate} type="button" className="btn btn-primary btn-lg mt-4 px-4">
                    <div className="h6 mt-0 mb-1 mx-2">Save</div>
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </Modal>
  );
};

AddPost.propTypes = {
  onClose: func.isRequired,
  onSave: func.isRequired,
};

export default AddPost;
