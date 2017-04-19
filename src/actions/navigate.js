import * as consts from '../constants/RouterConstants';

export function navigateTo() {
  return dispatch => {
    dispatch(navigate({ path: consts.STEPS_PATH }));
  };
}

export function changeRoute(route) {
  return {
    type: consts.CHANGE_ROUTE,
    route,
  };
}

export function navigate(route) {
  return (dispatch) => dispatch(changeRoute(route));
}
