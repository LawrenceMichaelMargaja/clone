/**
 * API
 */
 export const ADD_API_ERROR = 'ADD_API_ERROR';
 export const REMOVE_API_ERROR = 'REMOVE_API_ERROR';
 
 export const ADD_API_SUCCESS = 'ADD_API_SUCCESS';
 export const REMOVE_API_SUCCESS = 'REMOVE_API_SUCCESS';
 
 /**
  * Auth
  */
 export const LOGIN = '@@login/LOGIN';
 export const UPDATE_FIELD = '@@login/UPDATE_FIELD';
 
 
 /**
  * Users
  */
 export const FETCH_ALL_USERS = '@@user/FETCH_ALL_USERS';
 export const RESET_USER_FORM = '@@user/RESET_USER_FORM';
 export const SET_USER = '@@user/SET_USER';
 export const SET_BANK_TYPES = '@@user/SET_BANK_TYPES';
 export const SET_USERS = '@@user/SET_USERS';
 export const FETCH_ALL_BANK_TYPES = '@@user/FETCH_ALL_BANK_TYPES';
 export const SET_BANK_TYPES_AND_USER_TYPES = '@@user/SET_BANK_TYPES_AND_USER_TYPES';
 export const UPDATE_USER_FORM_FIELD = '@@user/UPDATE_USER_FORM_FIELD';
 export const SET_FETCH_ALL_USERS_LOADING = '@@user/SET_FETCH_ALL_USERS_LOADING';
 export const SET_FETCH_ONE_USER_LOADING = '@@user/SET_FETCH_ONE_USER_LOADING';
 export const SET_UPDATING_USER_LOADING = '@@user/SET_UPDATING_USER_LOADING';
 export const SET_DELETE_USER_LOADING = '@@user/SET_DELETE_USER_LOADING';
 
 /**
  * Products
  */
 export const SET_PRODUCT = '@@product/SET_PRODUCT';
 export const SET_PRODUCTS = '@@product/SET_PRODUCTS';
 export const SET_PRODUCT_TYPES = '@@product/SET_PRODUCT_TYPES';
 export const UPDATE_PRODUCT_FORM_FIELD = '@@product/UPDATE_PRODUCT_FORM_FIELD';
 export const RESET_PRODUCT_FORM = '@@product/RESET_PRODUCT_FORM';
 export const FETCH_ALL_PRODUCTS = '@@product/FETCH_ALL_PRODUCTS';
 export const FETCH_PRODUCT = '@@product/FETCH_PRODUCT';
 export const FETCH_ALL_PRODUCTS_LOADING = '@@product/FETCH_ALL_PRODUCTS_LOADING';
 export const FETCH_PRODUCT_INVENTORY = '@@product/FETCH_PRODUCT_INVENTORY';
 export const SET_PRODUCT_INVENTORY = '@@product/SET_PRODUCT_INVENTORY';
 export const SET_FETCH_PRODUCT_INVENTORY_LOADING = '@@product/SET_FETCH_PRODUCT_INVENTORY_LOADING';
 export const FETCH_INVENTORY_ITEM_BREAKDOWN = '@@product/FETCH_INVENTORY_ITEM_BREAKDOWN`';
 export const SET_INVENTORY_ITEM_BREAKDOWN = '@@product/SET_INVENTORY_ITEM_BREAKDOWN`';
 /**
  * Coins
  */
 export const FETCH_ALL_COINS = '@@coin/FETCH_ALL_COINS';
 export const SET_COINS = '@@coin/SET_COINS';
 /**
  * Coin Transactions
  */
 export const SET_COIN_TRANSACTIONS = '@@transaction/SET_COIN_TRANSACTIONS';
 export const SET_FETCH_ALL_COIN_TRANSACTIONS_LOADING = '@@transaction/SET_FETCH_ALL_COIN_TRANSACTIONS_LOADING';
 // export const SET_COINS = '@@coin/SET_COINS';
 
 
 
 /**
  * Transactions
  */
 export const SET_TRANSACTIONS = '@@transaction/SET_TRANSACTIONS';
 export const SET_FETCH_ALL_TRANSACTIONS_LOADING = '@@transaction/SET_FETCH_ALL_TRANSACTIONS_LOADING';
 export const RESET_TRANSACTION_FORM = '@@transaction/RESET_TRANSACTION_FORM';
 export const UPDATE_TRANSACTION_FORM_FIELD = '@@transaction/UPDATE_TRANSACTION_FORM_FIELD';
 export const SET_USERS_BY_TYPE = '@@transaction/SET_USERS_BY_TYPE';
 export const SET_DEFAULT_BANK_TYPE_ID = '@@transaction/SET_DEFAULT_BANK_TYPE_ID';
 export const SET_TRANSACTION_DEFAULTS = '@@transaction/SET_TRANSACTION_DEFAULTS';
 
 
 
 /**
  * Transactions2
  */
 
 
  export const SET_TRANSACTIONS2 = '@@transaction2/SET_TRANSACTIONS';
  export const SET_FETCH_ALL_TRANSACTIONS_LOADING2 = '@@transaction2/SET_FETCH_ALL_TRANSACTIONS_LOADING';
  export const RESET_TRANSACTION_FORM2 = '@@transaction2/RESET_TRANSACTION_FORM';
  export const UPDATE_TRANSACTION_FORM_FIELD2 = '@@transaction/UPDATE_TRANSACTION_FORM_FIELD';
  export const SET_USERS_BY_TYPE2 = '@@transaction2/SET_USERS_BY_TYPE';
  export const SET_DEFAULT_BANK_TYPE_ID2 = '@@transaction2/SET_DEFAULT_BANK_TYPE_ID';
  export const SET_TRANSACTION_DEFAULTS2 = '@@transaction2/SET_TRANSACTION_DEFAULTS';
 
  export const SET_TRANSACTIONS_FETCHED = '@@transaction2/SET_TRANSACTIONS_FETCHED';
 
 
 
 /**
  * Orders
  */
 export const SET_FETCH_ALL_ORDERS = '@@orders/SET_FETCH_ALL_ORDERS';
 export const SET_FETCH_ALL_ORDERS_LOADING = '@@orders/SET_FETCH_ALL_ORDERS_LOADING';
 export const SET_ORDERS = '@@orders/SET_ORDERS';
 export const RESET_ORDER_FORM = '@@order/RESET_ORDER_FORM';
 export const COLLECT_ORDERED_PRODUCTS = '@@order/COLLECT_ORDERED_PRODUCTS';
 export const INCREMENT_PRODUCT_QUANTITY_COUNT = '@@order/INCREMENT_PRODUCT_QUANTITY_COUNT';
 export const DECREMENT_PRODUCT_QUANTITY_COUNT = '@@order/DECREMENT_PRODUCT_QUANTITY_COUNT';
 export const UPDATE_ORDER_ITEM_AMOUNT = '@@order/UPDATE_ORDER_ITEM_AMOUNT';
 export const UPDATE_ORDER_TOTAL = '@@order/UPDATE_ORDER_TOTAL';
 export const SUBMIT_PACKAGE_ORDER = '@@order/SUBMIT_PACKAGE_ORDER';
 export const SET_SUBMIT_ORDER_LOADING = '@@order/SET_SUBMIT_ORDER_LOADING';
 export const FETCH_ORDER_INVENTORY = '@@order/FETCH_ORDER_INVENTORY';
 export const SET_ORDER_INVENTORY = '@@order/SET_ORDER_INVENTORY';
 export const SET_FETCH_ORDER_INVENTORY_LOADING = '@@order/SET_FETCH_ORDER_INVENTORY_LOADING';
 export const UPDATE_PARCEL_FORM_FIELD = '@@order/UPDATE_PARCEL_FORM_FIELD';
 
 /**
  * Delivery
  */
 export const SET_FETCH_MY_STORE_LOADING = '@@delivery/SET_FETCH_MY_STORE_LOADING';
 export const SET_FETCH_TRANSACTIONS_LOADING = '@@delivery/SET_FETCH_TRANSACTIONS_LOADING';
 export const SET_MY_STORE = '@@delivery/SET_MY_STORE';
 export const SET_DELIVERY_TRANSACTIONS = '@@delivery/SET_DELIVERY_TRANSACTIONS';
 
 export const SET_FETCH_ORDERS = '@@delivery/SET_FETCH_ORDERS';
 export const SET_FETCH_ORDERS_LOADING = '@@delivery/SET_FETCH_ORDERS_LOADING';
 export const SET_ORDERS_FETCHED = '@@delivery/SET_ORDERS_FETCHED';
 export const RESET_ORDER_FORMS = '@@delivery/RESET_ORDER_FORMS';
 export const INCREMENT_PACKAGE_ITEM_QUANTITY = '@@delivery/INCREMENT_PACKAGE_ITEM_QUANTITY';
 export const DECREMENT_PACKAGE_ITEM_QUANTITY = '@@delivery/DECREMENT_PACKAGE_ITEM_QUANTITY';
 export const COLLECT_PACKAGE_PRODUCTS = '@@delivery/COLLECT_PACKAGE_PRODUCTS';
 export const UPDATE_PACKAGE_ITEM_AMOUNT = '@@delivery/UPDATE_PACKAGE_ITEM_AMOUNT';
 export const UPDATE_PACKAGE_TOTAL = '@@delivery/UPDATE_PACKAGE_TOTAL';
 export const SUBMIT_PACKAGE = '@@delivery/SUBMIT_PACKAGE';
 export const UPDATE_CHECKOUT_FIELD = '@@delivery/UPDATE_CHECKOUT_FIELD';
 export const UPDATE_NONPACKAGE_TOTAL = '@@delivery/UPDATE_NONPACKAGE_TOTAL';
 export const RESET_PARCEL_ITEMS = '@delivery/RESET_PARCEL_ITEMS';
 export const FETCH_SELLERS = '@@delivery/FETCH_SELLERS';
 export const SET_SELLERS = '@@delivery/SET_SELLERS';
 
 
 export const UPDATE_ORDER_TOTALS = '@@delivery/UPDATE_ORDER_TOTALS';
 export const MAKE_AN_ORDER = '@@delivery/MAKE_AN_ORDER';
 export const MAKE_NONPACKAGE_ORDER = '@@delivery/MAKE_NONPACKAGE_ORDER';
 export const FETCH_TRANSACTION_DETAILS = '@@delivery/FETCH_TRANSACTION_DETAILS';
 export const SET_TRANSACTION_DETAILS = '@@delivery/SET_TRANSACTION_DETAILS';
 export const RESET_TRANSACTION_DETAILS = '@@delivery/RESET_TRANSACTION_DETAILS';
 export const SET_TRANSACTION_DETAILS_LOADING = '@@delivery/SET_TRANSACTION_DETAILS_LOADING';
 export const FETCH_DELIVERY_TRANSACTION_DETAILS = '@@delivery/SET_DELIVERY_TRANSACTION_DETAILS';
 export const SET_DELIVERY_TRANSACTION_DETAILS = '@@delivery/SET_DELIVERY_TRANSACTION_DETAILS';
 export const SET_DELIVERY_COIN_TRANSACTIONS = '@@delivery/SET_DELIVERY_COIN_TRANSACTIONS';
 export const SET_FETCH_DELIVERY_COIN_TRANSACTIONS_LOADING = '@@delivery/SET_FETCH_DELIVERY_COIN_TRANSACTIONS_LOADING';
 export const SET_UPDATE_DELIVERY_STATUS_LOADING = '@@delivery/SET_UPDATE_DELIVERY_STATUS_LOADING';
 
 export const SET_FETCH_SERVICE_FEE_LOADING = '@@delivery/SET_FETCH_SERVICE_FEE_LOADING';
 export const SET_ORDER_SERVICE_FEE = '@@delivery/SET_ORDER_SERVICE_FEE';
 
 
 /**
  * Withdrawal
  */
 export const SET_FETCH_ALL_WITHDRAWALS_LOADING = '@@withdrawal/SET_FETCH_ALL_WITHDRAWALS_LOADING';
 export const SET_WITHDRAWALS = '@@withdrawal/SET_WITHDRAWALS';
 export const SET_WITHDRAWAL_TRANSACTIONS = '@@withdrawal/SET_WITHDRAWAL_TRANSACTIONS';
 export const UPDATE_WITHDRAWAL_FORM_FIELD = '@@withdrawal/UPDATE_WITHDRAWAL_FORM_FIELD';
 export const RESET_WITHDRAWAL_FORM = '@@withdrawal/RESET_WITHDRAWAL_FORM';
 
 
 /**
  * Analytics
  */
 export const FETCH_LINE_CHART = '@@analytics/FETCH_LINE_CHART';
 export const FETCH_PIE_CHART = '@@analytics/FETCH_PIE_CHART';
 export const SET_LINE_CHART = '@@analytics/SET_LINE_CHART';
 export const SET_LINE_CHART_TOTAL_SALES = '@@analytics/SET_LINE_CHART_TOTAL_SALES';
 export const SET_PIE_CHART = '@@analytics/SET_PIE_CHART';
 export const SET_ACCEPTANCE_PERCENTAGES = '@@analytics/SET_ACCEPTANCE_PERCENTAGES';
 