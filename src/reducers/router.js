import * as consts from '../constants/RouterConstants';

const initialRoute = { path: '', query: {} };
const initialState = { route: initialRoute };

export default function router(state = initialState, action) {
  switch (action.type) {
    case consts.CHANGE_ROUTE:
      return {
        ...state,
        route: action.route,
      };

    default:
      return state;
  }
}
