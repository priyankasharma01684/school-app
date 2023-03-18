import SweetAlert from 'sweetalert2';

class Alert {
  static alert = (data) => {
    const title = typeof data === 'object' ? (data.title || 'Required') : 'Required';
    const icon = typeof data === 'object' ? (data.icon || 'info') : 'info';
    const message = typeof data === 'string' ? data : (data.message || '');

    SweetAlert.fire({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
      icon,
      showCancelButton: false,
      text: message,
      title,
    }).then((result) => {
      if (result.isConfirmed && typeof data === 'object' && typeof data.callback === 'function') {
        data.callback();
      }
    });
  };
}

export default Alert;
