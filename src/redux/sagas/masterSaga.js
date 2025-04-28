import { call, put, takeLatest } from "redux-saga/effects";

// Import actions
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "../actions/masterActions";

// import API functions
import productAPI from "../../api/productApi";
import categoryAPI from "../../api/category";

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

function* productSaga() {
  yield takeLatest("FETCH_PRODUCTS_REQUEST", fetchProducts);
  yield takeLatest("FETCH_CATEGORIES_REQUEST", fetchCategories);
}

export default productSaga;
