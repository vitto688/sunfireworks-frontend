import { takeLatest, put, select } from "redux-saga/effects";

// import actions
import { setMenuState } from "../actions/menuActions";

const getMenuState = (state) => state.menu;

function* expandMenu(action) {
  const menuState = yield select(getMenuState);
  const expandedMenus = menuState.expandedMenus;

  const path = action.payload.path;

  const idx = expandedMenus.indexOf(path);
  if (idx > -1) {
    expandedMenus.splice(idx, 1);
  } else {
    expandedMenus.push(path);
  }

  yield put(setMenuState({ expandedMenus: [...expandedMenus] }));
}

export default function* menuSaga() {
  yield takeLatest("EXPAND_MENU", expandMenu);
}
