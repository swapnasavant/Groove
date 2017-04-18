const initialRoute = { path: '', query: {} };
const initialState = { route: initialRoute };

export default function router(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}
