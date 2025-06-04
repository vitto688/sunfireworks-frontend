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
//#region suppliers
export const fetchSuppliersRequest = () => ({
  type: "FETCH_SUPPLIERS_REQUEST",
});
export const fetchSuppliersSuccess = (suppliers) => ({
  type: "FETCH_SUPPLIERS_SUCCESS",
  payload: suppliers,
});
export const fetchSuppliersFailure = (error) => ({
  type: "FETCH_SUPPLIERS_FAILURE",
  payload: error,
});
export const addSupplierRequest = (supplier) => ({
  type: "ADD_SUPPLIER_REQUEST",
  payload: supplier,
});
export const addSupplierSuccess = (supplier) => ({
  type: "ADD_SUPPLIER_SUCCESS",
  payload: supplier,
});
export const addSupplierFailure = (error) => ({
  type: "ADD_SUPPLIER_FAILURE",
  payload: error,
});
export const updateSupplierRequest = (supplier) => ({
  type: "UPDATE_SUPPLIER_REQUEST",
  payload: supplier,
});
export const updateSupplierSuccess = (supplier) => ({
  type: "UPDATE_SUPPLIER_SUCCESS",
  payload: supplier,
});
export const updateSupplierFailure = (error) => ({
  type: "UPDATE_SUPPLIER_FAILURE",
  payload: error,
});
export const deleteSupplierRequest = (supplierId) => ({
  type: "DELETE_SUPPLIER_REQUEST",
  payload: supplierId,
});
export const deleteSupplierSuccess = (supplierId) => ({
  type: "DELETE_SUPPLIER_SUCCESS",
  payload: supplierId,
});
export const deleteSupplierFailure = (error) => ({
  type: "DELETE_SUPPLIER_FAILURE",
  payload: error,
});
export const setCurrentSupplier = (supplier) => ({
  type: "SET_CURRENT_SUPPLIER",
  payload: supplier,
});
export const clearCurrentSupplier = () => ({
  type: "CLEAR_CURRENT_SUPPLIER",
});
//#endregion
//#region customers
export const fetchCustomersRequest = () => ({
  type: "FETCH_CUSTOMERS_REQUEST",
});
export const fetchCustomersSuccess = (customers) => ({
  type: "FETCH_CUSTOMERS_SUCCESS",
  payload: customers,
});
export const fetchCustomersFailure = (error) => ({
  type: "FETCH_CUSTOMERS_FAILURE",
  payload: error,
});
export const addCustomerRequest = (customer) => ({
  type: "ADD_CUSTOMER_REQUEST",
  payload: customer,
});
export const addCustomerSuccess = (customer) => ({
  type: "ADD_CUSTOMER_SUCCESS",
  payload: customer,
});
export const addCustomerFailure = (error) => ({
  type: "ADD_CUSTOMER_FAILURE",
  payload: error,
});
export const updateCustomerRequest = (customer) => ({
  type: "UPDATE_CUSTOMER_REQUEST",
  payload: customer,
});
export const updateCustomerSuccess = (customer) => ({
  type: "UPDATE_CUSTOMER_SUCCESS",
  payload: customer,
});
export const updateCustomerFailure = (error) => ({
  type: "UPDATE_CUSTOMER_FAILURE",
  payload: error,
});
export const deleteCustomerRequest = (customerId) => ({
  type: "DELETE_CUSTOMER_REQUEST",
  payload: customerId,
});
export const deleteCustomerSuccess = (customerId) => ({
  type: "DELETE_CUSTOMER_SUCCESS",
  payload: customerId,
});
export const deleteCustomerFailure = (error) => ({
  type: "DELETE_CUSTOMER_FAILURE",
  payload: error,
});
export const setCurrentCustomer = (customer) => ({
  type: "SET_CURRENT_CUSTOMER",
  payload: customer,
});
export const clearCurrentCustomer = () => ({
  type: "CLEAR_CURRENT_CUSTOMER",
});
//#endregion

export const resetMasterMessages = () => ({
  type: "RESET_MASTER_MESSAGES",
});
