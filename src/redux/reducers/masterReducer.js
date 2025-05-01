const initialState = {
  products: [],
  categories: [],
  warehouses: [],
  suppliers: [],
  customers: [],
  currentProduct: null,
  currentCategory: null,
  currentWarehouse: null,
  currentSupplier: null,
  currentCustomer: null,
  isLoading: {
    products: false,
    categories: false,
    warehouses: false,
    suppliers: false,
    customers: false,
  },
  error: null,
};

const masterReducer = (state = initialState, action) => {
  switch (action.type) {
    //#region products
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, products: true } };
    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: action.payload,
        isLoading: { ...state.isLoading, products: false },
      };
    case "FETCH_PRODUCTS_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, products: false },
      };
    case "ADD_PRODUCT_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, products: true } };
    case "ADD_PRODUCT_SUCCESS":
      return {
        ...state,
        products: [...state.products, action.payload],
        isLoading: { ...state.isLoading, products: false },
      };
    case "ADD_PRODUCT_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, products: false },
      };
    case "UPDATE_PRODUCT_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, products: true } };
    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
        isLoading: { ...state.isLoading, products: false },
      };
    case "UPDATE_PRODUCT_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, products: false },
      };
    case "DELETE_PRODUCT_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, products: true } };
    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
        isLoading: { ...state.isLoading, products: false },
      };
    case "DELETE_PRODUCT_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, products: false },
      };
    case "SET_CURRENT_PRODUCT":
      return { ...state, currentProduct: action.payload };
    case "cLEAR_CURRENT_PRODUCT":
      return { ...state, currentProduct: null };
    //#endregion
    //#region categories
    case "FETCH_CATEGORIES_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, categories: true } };
    case "FETCH_CATEGORIES_SUCCESS":
      return {
        ...state,
        categories: action.payload,
        isLoading: { ...state.isLoading, categories: false },
      };
    case "FETCH_CATEGORIES_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, categories: false },
      };
    case "ADD_CATEGORY_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, categories: true } };
    case "ADD_CATEGORY_SUCCESS":
      return {
        ...state,
        categories: [...state.categories, action.payload],
        isLoading: { ...state.isLoading, categories: false },
      };
    case "ADD_CATEGORY_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, categories: false },
      };
    case "UPDATE_CATEGORY_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, categories: true } };
    case "UPDATE_CATEGORY_SUCCESS":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
        isLoading: { ...state.isLoading, categories: false },
      };
    case "UPDATE_CATEGORY_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, categories: false },
      };
    case "DELETE_CATEGORY_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, categories: true } };
    case "DELETE_CATEGORY_SUCCESS":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
        isLoading: { ...state.isLoading, categories: false },
      };
    case "DELETE_CATEGORY_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, categories: false },
      };
    case "SET_CURRENT_CATEGORY":
      return { ...state, currentCategory: action.payload };
    case "CLEAR_CURRENT_CATEGORY":
      return { ...state, currentCategory: null };
    //#endregion
    //#region warehouses
    case "FETCH_WAREHOUSES_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, warehouses: true } };
    case "FETCH_WAREHOUSES_SUCCESS":
      return {
        ...state,
        warehouses: action.payload,
        isLoading: { ...state.isLoading, warehouses: false },
      };
    case "FETCH_WAREHOUSES_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, warehouses: false },
      };
    case "ADD_WAREHOUSE_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, warehouses: true } };
    case "ADD_WAREHOUSE_SUCCESS":
      return {
        ...state,
        warehouses: [...state.warehouses, action.payload],
        isLoading: { ...state.isLoading, warehouses: false },
      };
    case "ADD_WAREHOUSE_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, warehouses: false },
      };
    case "UPDATE_WAREHOUSE_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, warehouses: true } };
    case "UPDATE_WAREHOUSE_SUCCESS":
      return {
        ...state,
        warehouses: state.warehouses.map((warehouse) =>
          warehouse.id === action.payload.id ? action.payload : warehouse
        ),
        isLoading: { ...state.isLoading, warehouses: false },
      };
    case "UPDATE_WAREHOUSE_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, warehouses: false },
      };
    case "DELETE_WAREHOUSE_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, warehouses: true } };
    case "DELETE_WAREHOUSE_SUCCESS":
      return {
        ...state,
        warehouses: state.warehouses.filter(
          (warehouse) => warehouse.id !== action.payload
        ),
        isLoading: { ...state.isLoading, warehouses: false },
      };
    case "DELETE_WAREHOUSE_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, warehouses: false },
      };
    case "SET_CURRENT_WAREHOUSE":
      return { ...state, currentWarehouse: action.payload };
    case "CLEAR_CURRENT_WAREHOUSE":
      return { ...state, currentWarehouse: null };
    //#endregion
    //#region suppliers
    case "FETCH_SUPPLIERS_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, suppliers: true } };
    case "FETCH_SUPPLIERS_SUCCESS":
      return {
        ...state,
        suppliers: action.payload,
        isLoading: { ...state.isLoading, suppliers: false },
      };
    case "FETCH_SUPPLIERS_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, suppliers: false },
      };
    case "ADD_SUPPLIER_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, suppliers: true } };
    case "ADD_SUPPLIER_SUCCESS":
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload],
        isLoading: { ...state.isLoading, suppliers: false },
      };
    case "ADD_SUPPLIER_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, suppliers: false },
      };
    case "UPDATE_SUPPLIER_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, suppliers: true } };
    case "UPDATE_SUPPLIER_SUCCESS":
      return {
        ...state,
        suppliers: state.suppliers.map((supplier) =>
          supplier.id === action.payload.id ? action.payload : supplier
        ),
        isLoading: { ...state.isLoading, suppliers: false },
      };
    case "UPDATE_SUPPLIER_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, suppliers: false },
      };
    case "DELETE_SUPPLIER_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, suppliers: true } };
    case "DELETE_SUPPLIER_SUCCESS":
      return {
        ...state,
        suppliers: state.suppliers.filter(
          (supplier) => supplier.id !== action.payload
        ),
        isLoading: { ...state.isLoading, suppliers: false },
      };
    case "DELETE_SUPPLIER_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, suppliers: false },
      };
    case "SET_CURRENT_SUPPLIER":
      return { ...state, currentSupplier: action.payload };
    case "CLEAR_CURRENT_SUPPLIER":
      return { ...state, currentSupplier: null };
    //#endregion
    //#region customers
    case "FETCH_CUSTOMERS_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, customers: true } };
    case "FETCH_CUSTOMERS_SUCCESS":
      return {
        ...state,
        customers: action.payload,
        isLoading: { ...state.isLoading, customers: false },
      };
    case "FETCH_CUSTOMERS_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, customers: false },
      };
    case "ADD_CUSTOMER_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, customers: true } };
    case "ADD_CUSTOMER_SUCCESS":
      return {
        ...state,
        customers: [...state.customers, action.payload],
        isLoading: { ...state.isLoading, customers: false },
      };
    case "ADD_CUSTOMER_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, customers: false },
      };
    case "UPDATE_CUSTOMER_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, customers: true } };
    case "UPDATE_CUSTOMER_SUCCESS":
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        ),
        isLoading: { ...state.isLoading, customers: false },
      };
    case "UPDATE_CUSTOMER_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, customers: false },
      };
    case "DELETE_CUSTOMER_REQUEST":
      return { ...state, isLoading: { ...state.isLoading, customers: true } };
    case "DELETE_CUSTOMER_SUCCESS":
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.id !== action.payload
        ),
        isLoading: { ...state.isLoading, customers: false },
      };
    case "DELETE_CUSTOMER_FAILURE":
      return {
        ...state,
        error: action.payload,
        isLoading: { ...state.isLoading, customers: false },
      };
    case "SET_CURRENT_CUSTOMER":
      return { ...state, currentCustomer: action.payload };
    case "CLEAR_CURRENT_CUSTOMER":
      return { ...state, currentCustomer: null };
    //#endregion
    default:
      return state;
  }
};
export default masterReducer;
