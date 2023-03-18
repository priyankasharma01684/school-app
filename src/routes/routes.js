import React from 'react';
import { USER_SUPER_ADMIN,
  USER_SCHOOL_ADMIN,
  USER_SCHOOL_SUB_ADMIN,
  USER_PARENT,
  USER_STUDENT,
  USER_TEACHER } from '../constants';

// Common
const NotFound = React.lazy(() => import('../pages/not-found'));
const ForbiddenAccess = React.lazy(() => import('../pages/forbidden-access'));
const BulkUpload = React.lazy(() => import('../pages/bulk-upload'));

// User onboarding
const Login = React.lazy(() => import('../pages/user/login'));
const ForgotPassword = React.lazy(() => import('../pages/user/forgot-password'));
const ChangePassword = React.lazy(() => import('../pages/user/change-password'));
const MyProfile = React.lazy(() => import('../pages/user/my-profile'));
const EditProfile = React.lazy(() => import('../pages/user/edit-profile'));

// School Wall
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const SchoolWall = React.lazy(() => import('../pages/school-wall'));

// Schools
const Schools = React.lazy(() => import('../pages/schools'));
const AddEditSchool = React.lazy(() => import('../pages/schools/add-edit-school'));

// Schools year
const SchoolYear = React.lazy(() => import('../pages/school-year'));
const AddEditSchoolYear = React.lazy(() => import('../pages/school-year/add-edit-school-year'));

// Grades
const Grades = React.lazy(() => import('../pages/grades'));
const AddEditGrade = React.lazy(() => import('../pages/grades/add-edit-grade'));

// Students
const Students = React.lazy(() => import('../pages/students'));
const AddEditStudent = React.lazy(() => import('../pages/students/add-edit-student'));

// outflows
const Outflow = React.lazy(() => import('../pages/outflows'));
const AddEditOutflow = React.lazy(() => import('../pages/outflows/add-edit-outflow'));

// installment
const Installment = React.lazy(() => import('../pages/installments'));
const AddEditInstallment = React.lazy(() => import('../pages/installments/add-edit-installment'));

// entries
const Entries = React.lazy(() => import('../pages/entries'));
const AddEditEntries = React.lazy(() => import('../pages/entries/add-edit-entries'));
const DailyEntries = React.lazy(() => import('../pages/reporting/daily-entry-report'));
const FinanceReports = React.lazy(() => import('../pages/reporting'));

// payment type
const PaymentType = React.lazy(() => import('../pages/payment-types'));
const AddEditPaymentType = React.lazy(() => import('../pages/payment-types/add-edit-payment-type'));

// cost of item
const CostofItem = React.lazy(() => import('../pages/cost-of-item'));
const AddEditCostofItem = React.lazy(() => import('../pages/cost-of-item/add-edit-cost-of-item'));

// cost reason
const CostReason = React.lazy(() => import('../pages/cost-reason'));
const AddEditCostReason = React.lazy(() => import('../pages/cost-reason/add-edit-cost-reason'));

// income reason
const IncomeReason = React.lazy(() => import('../pages/income-reason'));
const AddEditIncomeReason = React.lazy(() => import('../pages/income-reason/add-edit-income-reason'));

// source of income
const SourceofIncome = React.lazy(() => import('../pages/source-of-income'));
const AddEditSourceofIncome = React.lazy(() => import('../pages/source-of-income/add-edit-source-of-income'));

// Classes
const Classes = React.lazy(() => import('../pages/classes'));
const AddEditClass = React.lazy(() => import('../pages/classes/add-edit-class'));

// Enrollment
const Enrollment = React.lazy(() => import('../pages/enrollment'));
const AddEditEnrollment = React.lazy(() => import('../pages/enrollment/add-edit-enrollment'));

// Income Forecast
const IncomeForecast = React.lazy(() => import('../pages/income-forecast'));
const AddEditIncomeForecast = React.lazy(() => import('../pages/income-forecast/add-edit-income-forecast'));

// Expenses Forecast
const ExpensesForecast = React.lazy(() => import('../pages/expenses-forecast'));
const AddEditExpensesForecast = React.lazy(() => import('../pages/expenses-forecast/add-edit-forecast'));

// Classes students
const ClassesList = React.lazy(() => import('../pages/grades-management'));
const ClassStudents = React.lazy(() => import('../pages/grades-management/class-students'));

// Sub Users
const SubUser = React.lazy(() => import('../pages/sub-users'));
const AddEditSubUser = React.lazy(() => import('../pages/sub-users/add-edit-sub-user'));

const configureRoutes = () => {
  const routes = [
    {
      component: Login,
      exact: true,
      path: '/',
      title: 'Login',
      type: 'public',
    },
    {
      component: ForgotPassword,
      exact: true,
      path: '/forgot-password',
      title: 'Forgot Password',
      type: 'public',
    },
    {
      accessible: [USER_SUPER_ADMIN, USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN, USER_STUDENT, USER_TEACHER, USER_PARENT],
      component: Dashboard,
      exact: true,
      path: '/dashboard',
      title: 'Dashboard',
      type: 'private',
    },
    {
      accessible: [USER_SUPER_ADMIN, USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN, USER_STUDENT, USER_TEACHER, USER_PARENT],
      component: ChangePassword,
      exact: true,
      path: '/change-password',
      title: 'Change Password',
      type: 'private',
    },
    {
      accessible: [USER_SUPER_ADMIN, USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN, USER_STUDENT, USER_TEACHER, USER_PARENT],
      component: MyProfile,
      exact: true,
      path: '/my-profile',
      title: 'My Profile',
      type: 'private',
    },
    {
      accessible: [USER_SUPER_ADMIN, USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN, USER_STUDENT, USER_TEACHER, USER_PARENT],
      component: EditProfile,
      exact: true,
      path: '/edit-profile',
      title: 'Edit Profile',
      type: 'private',
    },
    // School Wall
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: SchoolWall,
      exact: true,
      path: '/school-wall',
      title: 'School Wall',
      type: 'private',
    },

    // Schools
    {
      accessible: [USER_SUPER_ADMIN],
      component: Schools,
      exact: true,
      path: '/schools',
      title: 'Schools',
      type: 'private',
    },
    {
      accessible: [USER_SUPER_ADMIN],
      component: AddEditSchool,
      exact: true,
      path: '/schools/add-update-school/:publicId?',
      title: 'Add/Edit School',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditSchool,
      exact: true,
      path: '/school-information/:publicId',
      title: 'School Information',
      type: 'private',
    },

    // School Years
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: SchoolYear,
      exact: true,
      path: '/school-year',
      title: 'School year',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditSchoolYear,
      exact: true,
      path: '/add-update-school-year/:publicId?',
      title: 'Add/Edit School Year',
      type: 'private',
    },
    // subusers
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: SubUser,
      exact: true,
      path: '/sub-user',
      title: 'Sub User',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditSubUser,
      exact: true,
      path: '/add-update-sub-user/:publicId?',
      title: 'Add/EditSub User',
      type: 'private',
    },
    // Classes
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: Classes,
      exact: true,
      path: '/classes',
      title: 'Classes',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditClass,
      exact: true,
      path: '/add-update-class/:publicId?',
      title: 'Add/Edit Class',
      type: 'private',
    },

    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: ClassesList,
      exact: true,
      path: '/classes-list',
      title: 'Classes List',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: ClassStudents,
      exact: true,
      path: '/class-students/:publicId?',
      title: 'Class Students',
      type: 'private',
    },
    // Students
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: Students,
      exact: true,
      path: '/school-students',
      title: 'Students',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditStudent,
      exact: true,
      path: '/school-students/add-update-student/:publicId?',
      title: 'Add/Edit Student',
      type: 'private',
    },

    // Enrollment
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: Enrollment,
      exact: true,
      isAuthRequired: true,
      path: '/enrollments',
      title: 'Enrollment',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditEnrollment,
      exact: true,
      isAuthRequired: true,
      path: '/enrollments/add-update-enrollment/:publicId?',
      title: 'Add/Edit Enrollment',
      type: 'private',
    },

    // Outflows
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: Outflow,
      exact: true,
      isAuthRequired: true,
      path: '/outflows',
      title: 'Outflows',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditOutflow,
      exact: true,
      isAuthRequired: true,
      path: '/add-update-outflow/:publicId?',
      title: 'Add/Edit Outflow',
      type: 'private',
    },

    // installments
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: Installment,
      exact: true,
      isAuthRequired: true,
      path: '/installments',
      title: 'Installments',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditInstallment,
      exact: true,
      isAuthRequired: true,
      path: '/add-update-installment/:publicId?',
      title: 'Add/Edit Installment',
      type: 'private',
    },

    // entries
    {

      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: Entries,
      exact: true,
      isAuthRequired: true,
      path: '/entries',
      title: 'Entries',
      type: 'private',
    },
    {

      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditEntries,
      exact: true,
      isAuthRequired: true,
      path: '/add-update-entries/:publicId?',
      title: 'Add/Edit Entries',
      type: 'private',
    },
    {

      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: DailyEntries,
      exact: true,
      isAuthRequired: true,
      path: '/daily-entries',
      title: 'Daily Entries',
      type: 'private',
    },
    {

      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: FinanceReports,
      exact: true,
      isAuthRequired: true,
      path: '/finance-reports',
      title: 'Finance Reports',
      type: 'private',
    },

    // payment type
    {

      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: PaymentType,
      exact: true,
      isAuthRequired: true,
      path: '/payment-types',
      title: 'Payment Type',
      type: 'private',
    },
    {

      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditPaymentType,
      exact: true,
      isAuthRequired: true,
      path: '/add-update-payment-type/:publicId?',
      title: 'Add/Edit Payment Type',
      type: 'private',
    },

    // Grades
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: Grades,
      exact: true,
      path: '/grades',
      title: 'Grades',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditGrade,
      exact: true,
      path: '/add-update-grade/:publicId?',
      title: 'Grade',
      type: 'private',
    },

    // cost of item
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: CostofItem,
      exact: true,
      isAuthRequired: true,
      path: '/cost-of-item',
      title: 'Cost of Item',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditCostofItem,
      exact: true,
      isAuthRequired: true,
      path: '/add-update-cost-of-item/:publicId?',
      title: 'Cost of Item',
      type: 'private',
    },

    // cost reason
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: CostReason,
      exact: true,
      isAuthRequired: true,
      path: '/cost-reason',
      title: 'Cost Reason',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditCostReason,
      exact: true,
      isAuthRequired: true,
      path: '/add-update-cost-reason/:publicId?',
      title: 'Cost Reason',
      type: 'private',
    },

    // income reason
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: IncomeReason,
      exact: true,
      isAuthRequired: true,
      path: '/income-reasons',
      title: 'Income Reason',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditIncomeReason,
      exact: true,
      isAuthRequired: true,
      path: '/add-update-income-reason/:publicId?',
      title: 'Income Reason',
      type: 'private',
    },

    // Schools
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: SourceofIncome,
      exact: true,
      path: '/source-of-income',
      title: 'Source of Income',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditSourceofIncome,
      exact: true,
      path: '/add-update-source-of-income/:publicId?',
      title: 'Source of Income',
      type: 'private',
    },

    // Income Forecast
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: IncomeForecast,
      exact: true,
      path: '/income-forecast',
      title: 'Income Forecast',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditIncomeForecast,
      exact: true,
      path: '/income-forecast/add-edit-income-forecast/:publicId?',
      title: 'Add/Edit Income Forecast',
      type: 'private',
    },

    // Expenses Forecast
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: ExpensesForecast,
      exact: true,
      path: '/expenses-forecast',
      title: 'Expenses Forecast',
      type: 'private',
    },
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN],
      component: AddEditExpensesForecast,
      exact: true,
      path: '/expenses-forecast/add-edit-expenses-forecast/:publicId?',
      title: 'Add/Edit Expenses Forecast',
      type: 'private',
    },

    // Bulk Import
    {
      accessible: [USER_SCHOOL_ADMIN, USER_SCHOOL_SUB_ADMIN, USER_SUPER_ADMIN],
      component: BulkUpload,
      exact: true,
      path: '/bulk-import',
      title: 'Bulk Import',
      type: 'private',
    },

    // General routes
    {
      component: ForbiddenAccess,
      exact: true,
      path: '/forbidden-access',
      title: '403 Forbidden Access',
      type: 'error',
    },
    {
      component: NotFound,
      exact: true,
      path: '*',
      title: '404 Not Found',
      type: 'error',
    },
  ];

  return routes;
};

export default configureRoutes;
