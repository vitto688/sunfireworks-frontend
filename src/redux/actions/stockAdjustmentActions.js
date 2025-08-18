// Fetch Stock Adjustments
export const fetchStockAdjustmentsRequest = (params = {}) => ({
  type: "FETCH_STOCK_ADJUSTMENTS_REQUEST",
  payload: params,
});

export const fetchStockAdjustmentsSuccess = (data) => ({
  type: "FETCH_STOCK_ADJUSTMENTS_SUCCESS",
  payload: data,
});

export const fetchStockAdjustmentsFailure = (error) => ({
  type: "FETCH_STOCK_ADJUSTMENTS_FAILURE",
  payload: error,
});

// Fetch Stock Adjustment by ID
export const fetchStockAdjustmentByIdRequest = (id) => ({
  type: "FETCH_STOCK_ADJUSTMENT_BY_ID_REQUEST",
  payload: id,
});

export const fetchStockAdjustmentByIdSuccess = (data) => ({
  type: "FETCH_STOCK_ADJUSTMENT_BY_ID_SUCCESS",
  payload: data,
});

export const fetchStockAdjustmentByIdFailure = (error) => ({
  type: "FETCH_STOCK_ADJUSTMENT_BY_ID_FAILURE",
  payload: error,
});

// Create Stock Adjustment
export const createStockAdjustmentRequest = (stockAdjustmentData) => ({
  type: "CREATE_STOCK_ADJUSTMENT_REQUEST",
  payload: stockAdjustmentData,
});

export const createStockAdjustmentSuccess = (data) => ({
  type: "CREATE_STOCK_ADJUSTMENT_SUCCESS",
  payload: data,
});

export const createStockAdjustmentFailure = (error) => ({
  type: "CREATE_STOCK_ADJUSTMENT_FAILURE",
  payload: error,
});

// Update Stock Adjustment
export const updateStockAdjustmentRequest = (id, stockAdjustmentData) => ({
  type: "UPDATE_STOCK_ADJUSTMENT_REQUEST",
  payload: { id, stockAdjustmentData },
});

export const updateStockAdjustmentSuccess = (data) => ({
  type: "UPDATE_STOCK_ADJUSTMENT_SUCCESS",
  payload: data,
});

export const updateStockAdjustmentFailure = (error) => ({
  type: "UPDATE_STOCK_ADJUSTMENT_FAILURE",
  payload: error,
});

// Delete Stock Adjustment
export const deleteStockAdjustmentRequest = (id) => ({
  type: "DELETE_STOCK_ADJUSTMENT_REQUEST",
  payload: id,
});

export const deleteStockAdjustmentSuccess = (id) => ({
  type: "DELETE_STOCK_ADJUSTMENT_SUCCESS",
  payload: id,
});

export const deleteStockAdjustmentFailure = (error) => ({
  type: "DELETE_STOCK_ADJUSTMENT_FAILURE",
  payload: error,
});

// Reset Messages
export const resetStockAdjustmentMessages = () => ({
  type: "RESET_STOCK_ADJUSTMENT_MESSAGES",
});
