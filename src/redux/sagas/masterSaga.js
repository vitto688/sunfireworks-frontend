import { all, call, put, takeLatest } from "redux-saga/effects";

// Import actions
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchWarehousesSuccess,
  fetchWarehousesFailure,
  fetchSuppliersSuccess,
  fetchCustomersSuccess,
  fetchCustomersFailure,
  addWarehouseSuccess,
  addWarehouseFailure,
  updateWarehouseFailure,
  updateWarehouseSuccess,
  deleteWarehouseSuccess,
  deleteWarehouseFailure,
  deleteSupplierSuccess,
  deleteSupplierFailure,
  addSupplierSuccess,
  addSupplierFailure,
  updateSupplierSuccess,
  updateSupplierFailure,
  deleteCategorySuccess,
  deleteCategoryFailure,
  addCategorySuccess,
  addCategoryFailure,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteProductSuccess,
  deleteProductFailure,
  addProductSuccess,
  addProductFailure,
  updateProductSuccess,
  updateProductFailure,
  deleteCustomerSuccess,
  deleteCustomerFailure,
  addCustomerSuccess,
  addCustomerFailure,
  updateCustomerSuccess,
  updateCustomerFailure,
  fetchProductsAdminSuccess,
  fetchProductsAdminFailure,
} from "../actions/masterActions";

// import API functions
import productAPI from "../../api/product";
import categoryAPI from "../../api/category";
import customerAPI from "../../api/customer";
import supplierAPI from "../../api/supplier";
import warehouseAPI from "../../api/warehouse";

export function* loadInitialMasterData() {
  yield all([
    fetchProducts(),
    fetchProductsAdmin(),
    fetchCategories(),
    fetchWarehouses(),
    fetchSuppliers(),
    fetchCustomers(),
  ]);
}

// Worker saga: will be fired on FETCH_PRODUCTS_REQUEST actions
function* fetchProducts() {
  try {
    const products = yield call(productAPI.getAllProducts); // Call the API function
    yield put(fetchProductsSuccess(products)); // Dispatch success action with products
  } catch (error) {
    yield put(fetchProductsFailure(error.message)); // Dispatch failure action with error message
  }
}

function* fetchProductsAdmin() {
  try {
    const products = yield call(productAPI.getAllProductsAdmin); // Call the API function
    yield put(fetchProductsAdminSuccess(products)); // Dispatch success action with products
  } catch (error) {
    yield put(fetchProductsAdminFailure(error.message)); // Dispatch failure action with error message
  }
}

function* addProduct(action) {
  try {
    const product = yield call(productAPI.createProduct, action.payload.body); // Call the API function
    yield put(addProductSuccess(product)); // Dispatch success action to refresh products
  } catch (error) {
    yield put(addProductFailure(error.message)); // Dispatch failure action with error message
  }
}

function* updateProducts(action) {
  try {
    const product = yield call(
      productAPI.updateProduct,
      action.payload.id,
      action.payload.body
    ); // Call the API function
    yield put(updateProductSuccess(product)); // Dispatch success action to refresh products
  } catch (error) {
    yield put(updateProductFailure(error.message)); // Dispatch failure action with error message
  }
}

function* deleteProduct(action) {
  try {
    const response = yield call(productAPI.deleteProduct, action.payload.id); // Call the API function
    if (response.status === 204 || response.status === 200) {
      yield put(deleteProductSuccess(action.payload.id)); // Dispatch success action to refresh products
    } else {
      yield put(deleteProductFailure(response.status)); // Dispatch failure action with error status
    }
  } catch (error) {
    yield put(deleteProductFailure(error.message)); // Dispatch failure action with error message
  }
}

// Watcher saga: spawns a new fetchProducts task on each FETCH_PRODUCTS_REQUEST

function* fetchCategories() {
  try {
    const categories = yield call(categoryAPI.getAllCategories); // Call the API function
    yield put(fetchCategoriesSuccess(categories)); // Dispatch success action with categories
  } catch (error) {
    yield put(fetchCategoriesFailure(error.message)); // Dispatch failure action with error message
  }
}

function* addCategory(action) {
  try {
    const category = yield call(
      categoryAPI.createCategory,
      action.payload.body
    ); // Call the API function
    yield put(addCategorySuccess(category)); // Dispatch success action with categories
  } catch (error) {
    yield put(addCategoryFailure(error.message)); // Dispatch failure action with error message
  }
}

function* updateCategory(action) {
  try {
    const category = yield call(
      categoryAPI.updateCategory,
      action.payload.id,
      action.payload.body
    ); // Call the API function
    yield put(updateCategorySuccess(category)); // Dispatch success action with categories
  } catch (error) {
    yield put(updateCategoryFailure(error.message)); // Dispatch failure action with error message
  }
}

function* deleteCategory(action) {
  try {
    const response = yield call(categoryAPI.deleteCategory, action.payload.id); // Call the API function
    if (response.status === 204 || response.status === 200) {
      yield put(deleteCategorySuccess(action.payload.id)); // Dispatch success action with category ID
    } else {
      yield put(deleteCategoryFailure(response.status)); // Dispatch failure action with error status
    }
  } catch (error) {
    yield put(deleteCategoryFailure(error.message)); // Dispatch failure action with error message
  }
}

// Worker saga: will be fired on FETCH_WAREHOUSES_REQUEST actions
function* fetchWarehouses() {
  try {
    const warehouses = yield call(warehouseAPI.getWarehouses); // Call the API function
    yield put(fetchWarehousesSuccess(warehouses)); // Dispatch success action with warehouses
  } catch (error) {
    yield put(fetchWarehousesFailure(error.message)); // Dispatch failure action with error message
  }
}

function* addWarehouse(action) {
  try {
    const warehouse = yield call(
      warehouseAPI.createWarehouse,
      action.payload.body
    ); // Call the API function
    yield put(addWarehouseSuccess(warehouse)); // Dispatch success action with warehouses
  } catch (error) {
    yield put(addWarehouseFailure(error.message)); // Dispatch failure action with error message
  }
}

function* updateWarehouse(action) {
  try {
    const warehouse = yield call(
      warehouseAPI.updateWarehouse,
      action.payload.id,
      action.payload.body
    ); // Call the API function
    yield put(updateWarehouseSuccess(warehouse)); // Dispatch success action with warehouses
  } catch (error) {
    yield put(updateWarehouseFailure(error.message)); // Dispatch failure action with error message
  }
}

function* deleteWarehouse(action) {
  try {
    const response = yield call(
      warehouseAPI.deleteWarehouse,
      action.payload.id
    ); //

    if (response.status === 204 || response.status === 200) {
      yield put(deleteWarehouseSuccess(action.payload.id));
    } else {
      yield put(deleteWarehouseFailure(response.status));
    }
  } catch (error) {
    yield put(deleteWarehouseFailure(error));
  }
}

// Worker saga: will be fired on FETCH_SUPPLIERS_REQUEST actions
function* fetchSuppliers() {
  try {
    const suppliers = yield call(supplierAPI.getSuppliers); // Call the API function
    yield put(fetchSuppliersSuccess(suppliers)); // Dispatch success action with suppliers
  } catch (error) {
    yield put(fetchCategoriesFailure(error.message)); // Dispatch failure action with error message
  }
}

function* addSupplier(action) {
  try {
    const supplier = yield call(
      supplierAPI.createSupplier,
      action.payload.body
    ); // Call the API function
    yield put(addSupplierSuccess(supplier)); // Dispatch success action with suppliers
  } catch (error) {
    yield put(addSupplierFailure(error.message)); // Dispatch failure action with error message
  }
}

function* updateSupplier(action) {
  try {
    const supplier = yield call(
      supplierAPI.updateSupplier,
      action.payload.id,
      action.payload.body
    ); // Call the API function
    yield put(updateSupplierSuccess(supplier)); // Dispatch success action with suppliers
  } catch (error) {
    yield put(updateSupplierFailure(error.message)); // Dispatch failure action with error message
  }
}

function* deleteSupplier(action) {
  try {
    const response = yield call(supplierAPI.deleteSupplier, action.payload.id); // Call the API function
    if (response.status === 204 || response.status === 200) {
      yield put(deleteSupplierSuccess(action.payload.id)); // Dispatch success action with supplier ID
    } else {
      yield put(deleteSupplierFailure(response.status)); // Dispatch failure action with error status
    }
  } catch (error) {
    yield put(deleteSupplierFailure(error.message)); // Dispatch failure action with error message
  }
}

// Worker saga: will be fired on FETCH_CUSTOMERS_REQUEST actions
function* fetchCustomers() {
  try {
    const customers = yield call(customerAPI.fetchCustomers); // Call the API function
    yield put(fetchCustomersSuccess(customers)); // Dispatch success action with customers
  } catch (error) {
    yield put(fetchCustomersFailure(error.message)); // Dispatch failure action with error message
  }
}

function* addCustomer(action) {
  try {
    const customer = yield call(
      customerAPI.createCustomer,
      action.payload.body
    ); // Call the API function
    yield put(addCustomerSuccess(customer)); // Dispatch success action with customers
  } catch (error) {
    yield put(addCustomerFailure(error.message)); // Dispatch failure action with error message
  }
}

function* updateCustomer(action) {
  try {
    const customer = yield call(
      customerAPI.updateCustomer,
      action.payload.id,
      action.payload.body
    ); // Call the API function
    yield put(updateCustomerSuccess(customer)); // Dispatch success action with customers
  } catch (error) {
    yield put(updateCustomerFailure(error.message)); // Dispatch failure action with error message
  }
}

function* deleteCustomer(action) {
  try {
    const response = yield call(customerAPI.deleteCustomer, action.payload.id); // Call the API function
    if (response.status === 204 || response.status === 200) {
      yield put(deleteCustomerSuccess(action.payload.id)); // Dispatch success action with customer ID
    } else {
      yield put(deleteCustomerFailure(response.status)); // Dispatch failure action with error status
    }
  } catch (error) {
    yield put(deleteCustomerFailure(error.message)); // Dispatch failure action with error message
  }
}

function* productSaga() {
  yield takeLatest("FETCH_PRODUCTS_REQUEST", fetchProducts);
  yield takeLatest("ADD_PRODUCT_REQUEST", addProduct); // Assuming this is to refresh products after adding
  yield takeLatest("UPDATE_PRODUCT_REQUEST", updateProducts); // Assuming this is to refresh products after updating
  yield takeLatest("DELETE_PRODUCT_REQUEST", deleteProduct); // Assuming this is to refresh products after deletion
  yield takeLatest("FETCH_CATEGORIES_REQUEST", fetchCategories);
  yield takeLatest("ADD_CATEGORY_REQUEST", addCategory); // Assuming this is to refresh categories after adding
  yield takeLatest("UPDATE_CATEGORY_REQUEST", updateCategory); // Assuming this is to refresh categories after updating
  yield takeLatest("DELETE_CATEGORY_REQUEST", deleteCategory);
  yield takeLatest("FETCH_WAREHOUSES_REQUEST", fetchWarehouses);
  yield takeLatest("ADD_WAREHOUSE_REQUEST", addWarehouse);
  yield takeLatest("UPDATE_WAREHOUSE_REQUEST", updateWarehouse);
  yield takeLatest("DELETE_WAREHOUSE_REQUEST", deleteWarehouse);
  yield takeLatest("FETCH_SUPPLIERS_REQUEST", fetchSuppliers);
  yield takeLatest("ADD_SUPPLIER_REQUEST", addSupplier);
  yield takeLatest("UPDATE_SUPPLIER_REQUEST", updateSupplier);
  yield takeLatest("DELETE_SUPPLIER_REQUEST", deleteSupplier);
  yield takeLatest("FETCH_CUSTOMERS_REQUEST", fetchCustomers);
  yield takeLatest("ADD_CUSTOMER_REQUEST", addCustomer); // Assuming this is to refresh customers after adding
  yield takeLatest("UPDATE_CUSTOMER_REQUEST", updateCustomer); // Assuming this is to refresh customers after updatin
  yield takeLatest("DELETE_CUSTOMER_REQUEST", deleteCustomer);
}

export default productSaga;
