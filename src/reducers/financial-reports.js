import { LOCATION_CHANGE } from 'connected-react-router';
import { FETCH_FINANCIAL_REPORT_FAILURE,
  FETCH_FINANCIAL_REPORT_REQUESTED,
  FETCH_FINANCIAL_REPORT_SUCCESS,
  FETCH_FILTER_FINANCIAL_REPORT_FAILURE,
  FETCH_FILTER_FINANCIAL_REPORT_REQUESTED,
  FETCH_FILTER_FINANCIAL_REPORT_SUCCESS,
  FETCH_RECAP_TABLE_FAILURE,
  FETCH_RECAP_TABLE_REQUESTED,
  FETCH_RECAP_TABLE_SUCCESS } from '../actions/financial-reports-action-types';

const initialState = {
  fetchFilterFinancialReportStatus: 'pending',
  fetchFinancialReportStatus: 'pending',
  fetchRecapTableStatus: 'pending',
  filterFinance: [],
  financeReport: [],
  form: {
    class_id: null, section: null,
  },
  recapInformation: [],
};

export default function entries(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case FETCH_FINANCIAL_REPORT_FAILURE:
      return {
        ...state,
        fetchFinancialReportStatus: 'failure',
      };

    case FETCH_FINANCIAL_REPORT_REQUESTED:
      return {
        ...state,
        fetchFinancialReportStatus: 'fetching',
      };

    case FETCH_FINANCIAL_REPORT_SUCCESS:
      return {
        ...state,
        fetchFinancialReportStatus: 'success',
        financeReport: payload,
      };
    case FETCH_FILTER_FINANCIAL_REPORT_FAILURE:
      return {
        ...state,
        fetchFilterFinancialReportStatus: 'failure',
      };

    case FETCH_FILTER_FINANCIAL_REPORT_REQUESTED:
      return {
        ...state,
        fetchFilterFinancialReportStatus: 'fetching',
      };

    case FETCH_FILTER_FINANCIAL_REPORT_SUCCESS:
      return {
        ...state,
        fetchFilterFinancialReportStatus: 'success',
        financeReport: payload,
        form: payload,
      };
    case FETCH_RECAP_TABLE_FAILURE:
      return {
        ...state,
        fetchRecapTableStatus: 'failure',
      };

    case FETCH_RECAP_TABLE_REQUESTED:
      return {
        ...state,
        fetchRecapTableStatus: 'fetching',
      };

    case FETCH_RECAP_TABLE_SUCCESS:
      return {
        ...state,
        fetchRecapTableStatus: 'success',
        recapInformation: payload,
      };

    case LOCATION_CHANGE:
      return { ...initialState };

    default:
      return state;
  }
}
