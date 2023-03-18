import { createAction } from 'redux-actions';

export const FETCH_FINANCIAL_REPORT = 'FETCH_FINANCIAL_REPORT';
export const fetchFinancialReport = createAction(FETCH_FINANCIAL_REPORT);

export const FETCH_FINANCIAL_REPORT_FAILURE = 'FETCH_FINANCIAL_REPORT_FAILURE';
export const fetchFinancialReportFailure = createAction(FETCH_FINANCIAL_REPORT_FAILURE);

export const FETCH_FINANCIAL_REPORT_REQUESTED = 'FETCH_FINANCIAL_REPORT_REQUESTED';
export const fetchFinancialReportRequested = createAction(FETCH_FINANCIAL_REPORT_REQUESTED);

export const FETCH_FINANCIAL_REPORT_SUCCESS = 'FETCH_FINANCIAL_REPORT_SUCCESS';
export const fetchFinancialReportSuccess = createAction(FETCH_FINANCIAL_REPORT_SUCCESS);

export const FETCH_FILTER_FINANCIAL_REPORT = 'FETCH_FILTER_FINANCIAL_REPORT';
export const fetchFilterFinancialReport = createAction(FETCH_FILTER_FINANCIAL_REPORT);

export const FETCH_FILTER_FINANCIAL_REPORT_FAILURE = 'FETCH_FILTER_FINANCIAL_REPORT_FAILURE';
export const fetchFilterFinancialReportFailure = createAction(FETCH_FILTER_FINANCIAL_REPORT_FAILURE);

export const FETCH_FILTER_FINANCIAL_REPORT_REQUESTED = 'FETCH_FINANCIAL_REPORT_REQUESTED';
export const fetchFilterFinancialReportRequested = createAction(FETCH_FINANCIAL_REPORT_REQUESTED);

export const FETCH_FILTER_FINANCIAL_REPORT_SUCCESS = 'FETCH_FILTER_FINANCIAL_REPORT_SUCCESS';
export const fetchFilterFinancialReportSuccess = createAction(FETCH_FILTER_FINANCIAL_REPORT_SUCCESS);

export const FETCH_RECAP_TABLE = 'FETCH_RECAP_TABLE';
export const fetchRecapTable = createAction(FETCH_RECAP_TABLE);

export const FETCH_RECAP_TABLE_FAILURE = 'FETCH_RECAP_TABLE_FAILURE';
export const fetchRecapTableFailure = createAction(FETCH_RECAP_TABLE_FAILURE);

export const FETCH_RECAP_TABLE_REQUESTED = 'FETCH_RECAP_TABLE_REQUESTED';
export const fetchRecapTableRequested = createAction(FETCH_RECAP_TABLE_REQUESTED);

export const FETCH_RECAP_TABLE_SUCCESS = 'FETCH_RECAP_TABLE_SUCCESS';
export const fetchRecapTableSuccess = createAction(FETCH_RECAP_TABLE_SUCCESS);
