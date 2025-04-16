const initialState = {
  expandedMenus: [],
  current: "",
  previous: "",
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MENU_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default menuReducer;
