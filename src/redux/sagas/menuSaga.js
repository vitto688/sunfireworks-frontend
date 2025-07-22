import { takeLatest, put, select } from "redux-saga/effects";

// import actions
import { setMenuState } from "../actions/menuActions";

// import utils
import { setLocalStorage } from "../../utils/cookieUtils";

const getMenuState = (state) => state.menu;

function* expandMenu(action) {
  const menuState = yield select(getMenuState);
  const expandedMenus = menuState.expandedMenus;

  const path = action.payload.path;
  console.log("Expanding menu for path:", path);

  const idx = expandedMenus.indexOf(path);
  if (idx > -1) {
    expandedMenus.splice(idx, 1);
  } else {
    expandedMenus.push(path);
  }

  setLocalStorage("expandedMenus", JSON.stringify(expandedMenus));

  yield put(setMenuState({ expandedMenus: [...expandedMenus] }));
}

export default function* menuSaga() {
  yield takeLatest("EXPAND_MENU", expandMenu);
}
