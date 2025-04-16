export const expandMenu = ({ path }) => ({
  type: "EXPAND_MENU",
  payload: { path },
});

export const setMenuState = (payload) => ({
  type: "SET_MENU_STATE",
  payload,
});
