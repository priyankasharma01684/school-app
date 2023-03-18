import React from 'react';
import { func, object, number } from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Button from '../../components/button';
import DateCalenderInput from '../../components/date-calender-input';
import Modal from '../../components/modal';
import { editMoratoriumDate } from '../../actions/students-action-types';
import Alert from '../../utility/alert';
import { fetchInstallment } from '../../actions/installment-action-type';

export const AddMoratoriumDate = ({
  data, onClose, id,
}) => {
  const dispatch = useDispatch();
  const [form, setForm] = React.useState({ moratorium_deadline: null });
  const {
    installment_id, moratorium_deadline,
  } = form;
  const { installments } = useSelector((store) => ({ installments: store.installment.installments }));

  React.useEffect(() => {
    dispatch(fetchInstallment());
  }, []);
  console.log(data);
  const onDateChange = (name, date) => {
    const updates = {
      ...form,
      id,
      [name]: date,
    };

    setForm(updates);
  };
  const onSelectChange = (name, value) => {
    const updates = {
      ...form,
      [name]: value,
    };

    dispatch(setForm(updates));
  };
  const onValidate = () => {
    if (!moratorium_deadline) {
      Alert.alert('Moratorium Deadline  is required');

      return;
    }

    dispatch(editMoratoriumDate(form));
    onClose();
  };

  return (
    <Modal>
      <div
        className="modal fade show "
        id="addingParentInfo"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        style={{
          background: 'rgba(0, 0, 0, 0.5)', display: 'block', paddingRight: 15,
        }}
      >
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <h4 className="text-center mt-4 mb-0">Update Moratorium</h4>
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
                <table className="m-0 w-100">
                  <tbody>
                    <tr>
                      <td className="py-1" width="160"><b>Registration Number</b></td>
                      <td className="py-1" width="20">:</td>
                      <td className="py-1">{data.student_registration_no}</td>
                    </tr>
                    <tr>
                      <td className="py-1"><b>Student Name</b></td>
                      <td className="py-1" width="20">:</td>
                      <td className="py-1">{data.student_first_name}</td>
                    </tr>
                    <tr>
                      <td className="py-1"><b>Moratorium Date</b></td>
                      <td className="py-1" width="20">:</td>
                      <td className="py-1">
                        {data.moratorium_date ? moment(data.moratorium_date * 1000).format('DD/MM/yyyy').toString() : 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1"><b>Installment</b></td>
                      <td className="py-1" width="20">:</td>
                      <td className="py-1">
                        <Select
                          isSearchable
                          name="installment_id"
                          loadingMessage="Please wait loading"
                          placeholder=" Installment"
                          onChange={(value) => onSelectChange('installment_id', value)}
                          options={installments?.map((installment) => ({
                            label: installment.installment, value: installment.installment_id,
                          }))}
                          value={installment_id}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1"><b>New Moratorium Date</b></td>
                      <td className="py-1" width="20">:</td>
                      <td className="py-1">
                        <DatePicker
                          showTimeInput
                          showMonthDropdown
                          showYearDropdown
                          title='New Moratorium Date'
                          id='moratorium_deadline'
                          name='moratorium_deadline'
                          dateFormat="MM/dd/yyyy"
                          minDate={data.deadline || new Date()}
                          placeholderText="Click to select a moratorium date"
                          className="form-control dateTimePicker "
                          onChange={(date) => onDateChange('moratorium_deadline', date)}
                          selected={moratorium_deadline}
                          customInput={<DateCalenderInput />}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="text-center">
                  <Button onClick={onClose} type="button" className="btn btn-secondary btn-sm mt-4 px-4">
                    <div className="h6 mt-0 mb-1 mx-2">Cancel</div>
                  </Button>
                  <Button onClick={onValidate} type="button" className="btn btn-primary btn-sm mt-4 ml-4 px-4">
                    <div className="h6 mt-0 mb-1 mx-2">Submit</div>
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

AddMoratoriumDate.propTypes = {
  data: object.isRequired,
  id: number.isRequired,
  onClose: func.isRequired,
};

export default AddMoratoriumDate;
