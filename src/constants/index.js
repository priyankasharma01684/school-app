/** User types for role based access **
  'USER_TYPE_SUPER_ADMIN'=>1,
  'USER_TYPE_SCHOOL_ADMIN'=>2,
  'USER_TYPE_SCHOOL_SUB_ADMIN'=>8,
  'USER_TYPE_TEACHER'=>3,
  'USER_TYPE_STUDENT'=>4,
  'USER_TYPE_PARENT'=>5,
 */
export const IMAGE_FORMATS = ['jpeg', 'gif', 'png', 'jpg', 'svg', 'webp', 'jfif', 'pjpeg', 'pjp', 'apng', 'avif'];

export const USER_SUPER_ADMIN = 1;

export const USER_SCHOOL_ADMIN = 2;

export const USER_SCHOOL_SUB_ADMIN = 8;

export const USER_TEACHER = 3;

export const USER_STUDENT = 4;

export const USER_PARENT = 5;

export const VIDEO_FORMATS = ['mp4', '3gp', '3gpp2', '3gp2', 'mkv', 'mov', 'avi', 'webm'];

export const ALLOWED_BULK_IMPORTS = [
  // 'Classes',
  // 'Grades',
  // 'Enrollment',
  'Cost Item',
  'Cost Reason',
  'Source Of Income',
  'Income Reason',
  'Payment Types',
  'Outflows',
  'Entries',
  'Installment',
  'School Year',
  'Income Forecast',
  'Expenses Forecast',
];

export const SUPER_ADMIN_ALLOWED_BULK_IMPORTS = [
  'Schools',
];
