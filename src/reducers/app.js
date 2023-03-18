import { HIDE_LOADER, SHOW_LOADER, TOGGLE_DRAWER, TOGGLE_DRAWER_MENU } from '../actions/app-action-types';

const initialState = {
  activeDrawerMenu: null,
  drawer: 'visible',
  locale: null,
  visible: false,
};

export default function app(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case HIDE_LOADER:
      return {
        ...state,
        visible: false,
      };

    case SHOW_LOADER:
      return {
        ...state,
        visible: true,
      };

    case TOGGLE_DRAWER:
      return {
        ...state,
        drawer: payload,
      };

    case TOGGLE_DRAWER_MENU:
      return {
        ...state,
        activeDrawerMenu: payload,
      };

    default:
      return state;
  }
}
