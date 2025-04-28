//#region products
export const fetchProductsRequest = () => ({
  type: "FETCH_PRODUCTS_REQUEST",
});

export const fetchProductsSuccess = (products) => ({
  type: "FETCH_PRODUCTS_SUCCESS",
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: "FETCH_PRODUCTS_FAILURE",
  payload: error,
});

export const addProductRequest = (product) => ({
  type: "ADD_PRODUCT_REQUEST",
  payload: product,
});

export const addProductSuccess = (product) => ({
  type: "ADD_PRODUCT_SUCCESS",
  payload: product,
});

export const addProductFailure = (error) => ({
  type: "ADD_PRODUCT_FAILURE",
  payload: error,
});

export const updateProductRequest = (product) => ({
  type: "UPDATE_PRODUCT_REQUEST",
  payload: product,
});

export const updateProductSuccess = (product) => ({
  type: "UPDATE_PRODUCT_SUCCESS",
  payload: product,
});

export const updateProductFailure = (error) => ({
  type: "UPDATE_PRODUCT_FAILURE",
  payload: error,
});

export const deleteProductRequest = (productId) => ({
  type: "DELETE_PRODUCT_REQUEST",
  payload: productId,
});

export const deleteProductSuccess = (productId) => ({
  type: "DELETE_PRODUCT_SUCCESS",
  payload: productId,
});

export const deleteProductFailure = (error) => ({
  type: "DELETE_PRODUCT_FAILURE",
  payload: error,
});

export const setCurrentProduct = (product) => ({
  type: "SET_CURRENT_PRODUCT",
  payload: product,
});
export const clearCurrentProduct = () => ({
  type: "CLEAR_CURRENT_PRODUCT",
});
//#endregion

//#region categories
export const fetchCategoriesRequest = () => ({
  type: "FETCH_CATEGORIES_REQUEST",
});
export const fetchCategoriesSuccess = (categories) => ({
  type: "FETCH_CATEGORIES_SUCCESS",
  payload: categories,
});
export const fetchCategoriesFailure = (error) => ({
  type: "FETCH_CATEGORIES_FAILURE",
  payload: error,
});
export const addCategoryRequest = (category) => ({
  type: "ADD_CATEGORY_REQUEST",
  payload: category,
});
export const addCategorySuccess = (category) => ({
  type: "ADD_CATEGORY_SUCCESS",
  payload: category,
});
export const addCategoryFailure = (error) => ({
  type: "ADD_CATEGORY_FAILURE",
  payload: error,
});
export const updateCategoryRequest = (category) => ({
  type: "UPDATE_CATEGORY_REQUEST",
  payload: category,
});
export const updateCategorySuccess = (category) => ({
  type: "UPDATE_CATEGORY_SUCCESS",
  payload: category,
});
export const updateCategoryFailure = (error) => ({
  type: "UPDATE_CATEGORY_FAILURE",
  payload: error,
});
export const deleteCategoryRequest = (categoryId) => ({
  type: "DELETE_CATEGORY_REQUEST",
  payload: categoryId,
});
export const deleteCategorySuccess = (categoryId) => ({
  type: "DELETE_CATEGORY_SUCCESS",
  payload: categoryId,
});
export const deleteCategoryFailure = (error) => ({
  type: "DELETE_CATEGORY_FAILURE",
  payload: error,
});
export const setCurrentCategory = (category) => ({
  type: "SET_CURRENT_CATEGORY",
  payload: category,
});
export const clearCurrentCategory = () => ({
  type: "CLEAR_CURRENT_CATEGORY",
});
//#endregion

//#region warehouses
export const fetchWarehousesRequest = () => ({
  type: "FETCH_WAREHOUSES_REQUEST",
});
export const fetchWarehousesSuccess = (warehouses) => ({
  type: "FETCH_WAREHOUSES_SUCCESS",
  payload: warehouses,
});
export const fetchWarehousesFailure = (error) => ({
  type: "FETCH_WAREHOUSES_FAILURE",
  payload: error,
});
export const addWarehouseRequest = (warehouse) => ({
  type: "ADD_WAREHOUSE_REQUEST",
  payload: warehouse,
});
export const addWarehouseSuccess = (warehouse) => ({
  type: "ADD_WAREHOUSE_SUCCESS",
  payload: warehouse,
});
export const addWarehouseFailure = (error) => ({
  type: "ADD_WAREHOUSE_FAILURE",
  payload: error,
});
export const updateWarehouseRequest = (warehouse) => ({
  type: "UPDATE_WAREHOUSE_REQUEST",
  payload: warehouse,
});
export const updateWarehouseSuccess = (warehouse) => ({
  type: "UPDATE_WAREHOUSE_SUCCESS",
  payload: warehouse,
});
export const updateWarehouseFailure = (error) => ({
  type: "UPDATE_WAREHOUSE_FAILURE",
  payload: error,
});
export const deleteWarehouseRequest = (warehouseId) => ({
  type: "DELETE_WAREHOUSE_REQUEST",
  payload: warehouseId,
});
export const deleteWarehouseSuccess = (warehouseId) => ({
  type: "DELETE_WAREHOUSE_SUCCESS",
  payload: warehouseId,
});
export const deleteWarehouseFailure = (error) => ({
  type: "DELETE_WAREHOUSE_FAILURE",
  payload: error,
});
export const setCurrentWarehouse = (warehouse) => ({
  type: "SET_CURRENT_WAREHOUSE",
  payload: warehouse,
});
export const clearCurrentWarehouse = () => ({
  type: "CLEAR_CURRENT_WAREHOUSE",
});
//#endregion
