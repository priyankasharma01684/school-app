class BulkUploadHelper {
  static getDownloadType = (moduleName) => {
    let type = '';

    switch (moduleName) {
      case 'Classes':
        type = '';
        break;

      case 'Grades':
        type = '';
        break;

      case 'Enrollment':
        type = '';
        break;

      case 'Cost Item':
        type = 1;
        break;

      case 'Cost Reason':
        type = 2;
        break;

      case 'Source Of Income':
        type = 3;
        break;

      case 'Income Reason':
        type = 4;
        break;

      case 'Payment Types':
        type = 5;
        break;

      case 'Outflows':
        type = 6;
        break;

      case 'Entries':
        type = 7;
        break;

      case 'Installment':
        type = 8;
        break;

      case 'School Year':
        type = 9;
        break;

      case 'Income Forecast':
        type = 10;
        break;
      case 'Expenses Forecast':
        type = 11;
        break;
      case 'Schools':
        type = 12;
        break;

      default:
        break;
    }

    return type;
  };

  static getUploadDataFileUrl = (moduleName) => {
    let url = '';

    switch (moduleName) {
      case 'Classes':
        url = '';
        break;

      case 'Grades':
        url = '';
        break;

      case 'Enrollment':
        url = '';
        break;

      case 'Cost Item':
        url = 'cost-item-import';
        break;

      case 'Cost Reason':
        url = 'cost-reason-import';
        break;

      case 'Source Of Income':
        url = 'sourceofincome-import';
        break;

      case 'Income Reason':
        url = 'income-reason-import';
        break;

      case 'Payment Types':
        url = 'payment-type-import';
        break;

      case 'Outflows':
        url = 'outflows-import';
        break;

      case 'Entries':
        url = 'entry-import';
        break;

      case 'Installment':
        url = 'installment-import';
        break;

      case 'School Year':
        url = 'schoolyearImport';
        break;

      case 'Income Forecast':
        url = 'income-forecaste-import';
        break;

      case 'Expenses Forecast':
        url = 'expenses-forecaste-import';
        break;

      case 'Schools':
        url = 'school-import';
        break;

      default:
        break;
    }

    return url;
  };
}

export default BulkUploadHelper;
