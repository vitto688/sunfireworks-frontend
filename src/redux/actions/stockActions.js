export const fetchStocksRequest = () => ({
  type: "FETCH_STOCKS_REQUEST",
});

export const fetchStocksSuccess = (data) => ({
  type: "FETCH_STOCKS_SUCCESS",
  payload: data,
});

export const fetchStocksFailure = (error) => ({
  type: "FETCH_STOCKS_FAILURE",
  payload: error,
});

export const fetchStockByIdRequest = (id) => ({
  type: "FETCH_STOCK_BY_ID_REQUEST",
  payload: id,
});

export const fetchStockByIdSuccess = (data) => ({
  type: "FETCH_STOCK_BY_ID_SUCCESS",
  payload: data,
});

export const fetchStockByIdFailure = (error) => ({
  type: "FETCH_STOCK_BY_ID_FAILURE",
  payload: error,
});

export const fetchStockByWarehouseIdRequest = (warehouseId) => ({
  type: "FETCH_STOCK_BY_WAREHOUSE_ID_REQUEST",
  payload: warehouseId,
});

export const fetchStockByWarehouseIdSuccess = (data) => ({
  type: "FETCH_STOCK_BY_WAREHOUSE_ID_SUCCESS",
  payload: data,
});

export const fetchStockByWarehouseIdFailure = (error) => ({
  type: "FETCH_STOCK_BY_WAREHOUSE_ID_FAILURE",
  payload: error,
});

export const fetchStockByProductIdRequest = (productId) => ({
  type: "FETCH_STOCK_BY_PRODUCT_ID_REQUEST",
  payload: productId,
});

export const fetchStockByProductIdSuccess = (data) => ({
  type: "FETCH_STOCK_BY_PRODUCT_ID_SUCCESS",
  payload: data,
});

export const fetchStockByProductIdFailure = (error) => ({
  type: "FETCH_STOCK_BY_PRODUCT_ID_FAILURE",
  payload: error,
});

export const addStockRequest = (data) => ({
  type: "ADD_STOCK_REQUEST",
  payload: data,
});
export const addStockSuccess = (data) => ({
  type: "ADD_STOCK_SUCCESS",
  payload: data,
});
export const addStockFailure = (error) => ({
  type: "ADD_STOCK_FAILURE",
  payload: error,
});
export const updateStockRequest = (data) => ({
  type: "UPDATE_STOCK_REQUEST",
  payload: data,
});
export const updateStockSuccess = (data) => ({
  type: "UPDATE_STOCK_SUCCESS",
  payload: data,
});
export const updateStockFailure = (error) => ({
  type: "UPDATE_STOCK_FAILURE",
  payload: error,
});
export const updateMultipleStocksRequest = (data) => ({
  type: "UPDATE_MULTIPLE_STOCKS_REQUEST",
  payload: data,
});
export const updateMultipleStocksSuccess = (data) => ({
  type: "UPDATE_MULTIPLE_STOCKS_SUCCESS",
  payload: data,
});
export const updateMultipleStocksFailure = (error) => ({
  type: "UPDATE_MULTIPLE_STOCKS_FAILURE",
  payload: error,
});

export const resetStockMessages = () => ({
  type: "RESET_STOCK_MESSAGES",
});
