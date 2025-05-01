import { call, put, takeLatest } from "redux-saga/effects";

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
} from "../actions/masterActions";

// import API functions
import productAPI from "../../api/product";
import categoryAPI from "../../api/category";
import customerAPI from "../../api/customer";
import supplierAPI from "../../api/supplier";
import warehouseAPI from "../../api/warehouse";

// Worker saga: will be fired on FETCH_PRODUCTS_REQUEST actions
function* fetchProducts() {
  try {
    const products = yield call(productAPI.getAllProducts); // Call the API function
    yield put(fetchProductsSuccess(products)); // Dispatch success action with products
  } catch (error) {
    yield put(fetchProductsFailure(error.message)); // Dispatch failure action with error message
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

// Worker saga: will be fired on FETCH_WAREHOUSES_REQUEST actions
function* fetchWarehouses() {
  try {
    const warehouses = yield call(warehouseAPI.getWarehouses); // Call the API function
    yield put(fetchWarehousesSuccess(warehouses)); // Dispatch success action with warehouses
  } catch (error) {
    yield put(fetchWarehousesFailure(error.message)); // Dispatch failure action with error message
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

// Worker saga: will be fired on FETCH_CUSTOMERS_REQUEST actions
function* fetchCustomers() {
  try {
    const customers = yield call(customerAPI.fetchCustomers); // Call the API function
    yield put(fetchCustomersSuccess(customers)); // Dispatch success action with customers
  } catch (error) {
    yield put(fetchCustomersFailure(error.message)); // Dispatch failure action with error message
  }
}

function* productSaga() {
  yield takeLatest("FETCH_PRODUCTS_REQUEST", fetchProducts);
  yield takeLatest("FETCH_CATEGORIES_REQUEST", fetchCategories);
  yield takeLatest("FETCH_WAREHOUSES_REQUEST", fetchWarehouses);
  yield takeLatest("FETCH_SUPPLIERS_REQUEST", fetchSuppliers);
  yield takeLatest("FETCH_CUSTOMERS_REQUEST", fetchCustomers);
}

export default productSaga;
