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
  loading: {
    products: false,
    categories: false,
    warehouses: false,
    suppliers: false,
    customers: false,
  },
  message: null,
  errorCode: null,
  errorMessage: null,
};

const masterReducer = (state = initialState, action) => {
  switch (action.type) {
    //#region products
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, loading: { ...state.loading, products: true } };
    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: action.payload,
        loading: { ...state.loading, products: false },
      };
    case "FETCH_PRODUCTS_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal mengambil data produk.",
        loading: { ...state.loading, products: false },
      };
    case "ADD_PRODUCT_REQUEST":
      return { ...state, loading: { ...state.loading, products: true } };
    case "ADD_PRODUCT_SUCCESS":
      return {
        ...state,
        products: [...state.products, action.payload],
        message: "Produk berhasil ditambahkan.",
        loading: { ...state.loading, products: false },
      };
    case "ADD_PRODUCT_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal menambah produk.",
        loading: { ...state.loading, products: false },
      };
    case "UPDATE_PRODUCT_REQUEST":
      return { ...state, loading: { ...state.loading, products: true } };
    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
        message: "Produk berhasil diubah.",
        loading: { ...state.loading, products: false },
      };
    case "UPDATE_PRODUCT_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal memperbarui produk.",
        loading: { ...state.loading, products: false },
      };
    case "DELETE_PRODUCT_REQUEST":
      return { ...state, loading: { ...state.loading, products: true } };
    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
        message: "Produk berhasil dihapus.",

        loading: { ...state.loading, products: false },
      };
    case "DELETE_PRODUCT_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal menghapus produk.",
        loading: { ...state.loading, products: false },
      };
    case "SET_CURRENT_PRODUCT":
      return { ...state, currentProduct: action.payload };
    case "cLEAR_CURRENT_PRODUCT":
      return { ...state, currentProduct: null };
    //#endregion
    //#region categories
    case "FETCH_CATEGORIES_REQUEST":
      return { ...state, loading: { ...state.loading, categories: true } };
    case "FETCH_CATEGORIES_SUCCESS":
      return {
        ...state,
        categories: action.payload,
        loading: { ...state.loading, categories: false },
      };
    case "FETCH_CATEGORIES_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal mengambil data kategori.",
        loading: { ...state.loading, categories: false },
      };
    case "ADD_CATEGORY_REQUEST":
      return { ...state, loading: { ...state.loading, categories: true } };
    case "ADD_CATEGORY_SUCCESS":
      return {
        ...state,
        categories: [...state.categories, action.payload],
        message: "Kategori berhasil ditambahkan.",
        loading: { ...state.loading, categories: false },
      };
    case "ADD_CATEGORY_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal menambah kategori.",
        loading: { ...state.loading, categories: false },
      };
    case "UPDATE_CATEGORY_REQUEST":
      return { ...state, loading: { ...state.loading, categories: true } };
    case "UPDATE_CATEGORY_SUCCESS":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
        message: "Kategori berhasil diubah.",
        loading: { ...state.loading, categories: false },
      };
    case "UPDATE_CATEGORY_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal memperbarui kategori.",
        loading: { ...state.loading, categories: false },
      };
    case "DELETE_CATEGORY_REQUEST":
      return { ...state, loading: { ...state.loading, categories: true } };
    case "DELETE_CATEGORY_SUCCESS":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
        message: "Kategori berhasil dihapus.",

        loading: { ...state.loading, categories: false },
      };
    case "DELETE_CATEGORY_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal menghapus kategori.",
        loading: { ...state.loading, categories: false },
      };
    case "SET_CURRENT_CATEGORY":
      return { ...state, currentCategory: action.payload };
    case "CLEAR_CURRENT_CATEGORY":
      return { ...state, currentCategory: null };
    //#endregion
    //#region warehouses
    case "FETCH_WAREHOUSES_REQUEST":
      return { ...state, loading: { ...state.loading, warehouses: true } };
    case "FETCH_WAREHOUSES_SUCCESS":
      return {
        ...state,
        warehouses: action.payload,
        loading: { ...state.loading, warehouses: false },
      };
    case "FETCH_WAREHOUSES_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal mengambil data gudang.",
        loading: { ...state.loading, warehouses: false },
      };
    case "ADD_WAREHOUSE_REQUEST":
      return { ...state, loading: { ...state.loading, warehouses: true } };
    case "ADD_WAREHOUSE_SUCCESS":
      return {
        ...state,
        warehouses: [...state.warehouses, action.payload],
        message: "Gudang berhasil ditambahkan.",
        loading: { ...state.loading, warehouses: false },
      };
    case "ADD_WAREHOUSE_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal menambah gudang.",
        loading: { ...state.loading, warehouses: false },
      };
    case "UPDATE_WAREHOUSE_REQUEST":
      return { ...state, loading: { ...state.loading, warehouses: true } };
    case "UPDATE_WAREHOUSE_SUCCESS":
      return {
        ...state,
        warehouses: state.warehouses.map((warehouse) =>
          warehouse.id === action.payload.id ? action.payload : warehouse
        ),
        message: "Gudang berhasil diperbarui.",
        loading: { ...state.loading, warehouses: false },
      };
    case "UPDATE_WAREHOUSE_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal memperbarui gudang.",
        loading: { ...state.loading, warehouses: false },
      };
    case "DELETE_WAREHOUSE_REQUEST":
      return { ...state, loading: { ...state.loading, warehouses: true } };
    case "DELETE_WAREHOUSE_SUCCESS":
      return {
        ...state,
        warehouses: state.warehouses.filter(
          (warehouse) => warehouse.id !== action.payload
        ),
        message: "Gudang berhasil dihapus.",
        loading: { ...state.loading, warehouses: false },
      };
    case "DELETE_WAREHOUSE_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal menghapus gudang.",
        loading: { ...state.loading, warehouses: false },
      };
    case "SET_CURRENT_WAREHOUSE":
      return { ...state, currentWarehouse: action.payload };
    case "CLEAR_CURRENT_WAREHOUSE":
      return { ...state, currentWarehouse: null };
    //#endregion
    //#region suppliers
    case "FETCH_SUPPLIERS_REQUEST":
      return { ...state, loading: { ...state.loading, suppliers: true } };
    case "FETCH_SUPPLIERS_SUCCESS":
      return {
        ...state,
        suppliers: action.payload,
        loading: { ...state.loading, suppliers: false },
      };
    case "FETCH_SUPPLIERS_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal mengambil data supplier.",
        loading: { ...state.loading, suppliers: false },
      };
    case "ADD_SUPPLIER_REQUEST":
      return { ...state, loading: { ...state.loading, suppliers: true } };
    case "ADD_SUPPLIER_SUCCESS":
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload],
        message: "Supplier berhasil ditambahkan.",
        loading: { ...state.loading, suppliers: false },
      };
    case "ADD_SUPPLIER_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal menambah supplier.",
        loading: { ...state.loading, suppliers: false },
      };
    case "UPDATE_SUPPLIER_REQUEST":
      return { ...state, loading: { ...state.loading, suppliers: true } };
    case "UPDATE_SUPPLIER_SUCCESS":
      return {
        ...state,
        suppliers: state.suppliers.map((supplier) =>
          supplier.id === action.payload.id ? action.payload : supplier
        ),
        message: "Supplier berhasil diperbarui.",
        loading: { ...state.loading, suppliers: false },
      };
    case "UPDATE_SUPPLIER_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal memperbarui supplier.",
        loading: { ...state.loading, suppliers: false },
      };
    case "DELETE_SUPPLIER_REQUEST":
      return { ...state, loading: { ...state.loading, suppliers: true } };
    case "DELETE_SUPPLIER_SUCCESS":
      return {
        ...state,
        suppliers: state.suppliers.filter(
          (supplier) => supplier.id !== action.payload
        ),
        message: "Eksportir berhasil dihapus.",
        loading: { ...state.loading, suppliers: false },
      };
    case "DELETE_SUPPLIER_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal menghapus supplier.",
        loading: { ...state.loading, suppliers: false },
      };
    case "SET_CURRENT_SUPPLIER":
      return { ...state, currentSupplier: action.payload };
    case "CLEAR_CURRENT_SUPPLIER":
      return { ...state, currentSupplier: null };
    //#endregion
    //#region customers
    case "FETCH_CUSTOMERS_REQUEST":
      return { ...state, loading: { ...state.loading, customers: true } };
    case "FETCH_CUSTOMERS_SUCCESS":
      return {
        ...state,
        customers: action.payload,
        loading: { ...state.loading, customers: false },
      };
    case "FETCH_CUSTOMERS_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal mengambil data pelanggan.",
        loading: { ...state.loading, customers: false },
      };
    case "ADD_CUSTOMER_REQUEST":
      return { ...state, loading: { ...state.loading, customers: true } };
    case "ADD_CUSTOMER_SUCCESS":
      return {
        ...state,
        customers: [...state.customers, action.payload],
        message: "Pelanggan berhasil ditambahkan.",
        loading: { ...state.loading, customers: false },
      };
    case "ADD_CUSTOMER_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal menambah pelanggan.",
        loading: { ...state.loading, customers: false },
      };
    case "UPDATE_CUSTOMER_REQUEST":
      return { ...state, loading: { ...state.loading, customers: true } };
    case "UPDATE_CUSTOMER_SUCCESS":
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        ),
        message: "Pelanggan berhasil diperbarui.",
        loading: { ...state.loading, customers: false },
      };
    case "UPDATE_CUSTOMER_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal memperbarui pelanggan.",
        loading: { ...state.loading, customers: false },
      };
    case "DELETE_CUSTOMER_REQUEST":
      return { ...state, loading: { ...state.loading, customers: true } };
    case "DELETE_CUSTOMER_SUCCESS":
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.id !== action.payload
        ),
        message: "Pelanggan berhasil dihapus.",
        loading: { ...state.loading, customers: false },
      };
    case "DELETE_CUSTOMER_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal menghapus pelanggan.",
        loading: { ...state.loading, customers: false },
      };
    case "SET_CURRENT_CUSTOMER":
      return { ...state, currentCustomer: action.payload };
    case "CLEAR_CURRENT_CUSTOMER":
      return { ...state, currentCustomer: null };
    //#endregion
    case "RESET_MASTER_MESSAGES":
      return {
        ...state,
        message: null,
        errorCode: null,
        errorMessage: null,
        loading: {
          products: false,
          categories: false,
          warehouses: false,
          suppliers: false,
          customers: false,
        },
      };
    default:
      return state;
  }
};
export default masterReducer;
