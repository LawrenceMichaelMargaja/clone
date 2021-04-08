import {
    COLLECT_PACKAGE_PRODUCTS,
    DECREMENT_PACKAGE_ITEM_QUANTITY,
    INCREMENT_PACKAGE_ITEM_QUANTITY,
    RESET_ORDER_FORMS,
    RESET_PARCEL_ITEMS,
    SET_DELIVERY_COIN_TRANSACTIONS,
    SET_DELIVERY_TRANSACTION_DETAILS,
    SET_DELIVERY_TRANSACTIONS,
    SET_FETCH_DELIVERY_COIN_TRANSACTIONS_LOADING,
    SET_FETCH_MY_STORE_LOADING,
    SET_FETCH_ORDERS_LOADING,
    SET_FETCH_SERVICE_FEE_LOADING,
    SET_FETCH_TRANSACTIONS_LOADING,
    SET_MY_STORE,
    SET_ORDER_SERVICE_FEE,
    SET_ORDERS_FETCHED,
    SET_SELLERS,
    SET_TRANSACTION_DETAILS,
    SET_TRANSACTION_DETAILS_LOADING,
    SET_UPDATE_DELIVERY_STATUS_LOADING,
    UPDATE_CHECKOUT_FIELD,
    UPDATE_ORDER_TOTALS,
    UPDATE_PACKAGE_ITEM_AMOUNT,
    UPDATE_PACKAGE_TOTAL
} from "../actions/actionTypes";

// Constants
const DROPSHIPPER_ID = 147;

export const initialState = {
    myStore: {},
    transactions: {
        data: null,
        pagination: null
    },
    coinTransactions: {
        data: null,
        pagination: null
    },
    orders: [],
    orderForm: {
        items: {},
        checkout: {
            name: "",
            contact: "",
            dropshipper_id: DROPSHIPPER_ID,
            region: "",
            address: "",
            user_id: "",
            order_details: "",
            total: 0,
            service_fee: 190,
            declared_amount: 0
        }
    },
    sellers: [],
    deliveryTransactionDetails: {
        items: [],
        details: {},
        tracking: []
    },
    transactionDetails: [],
    loading: {
        fetchMyStore: false,
        fetchTransactions: false,
        fetchCoinTransactions: false,
        fetchProducts: false,
        fetchOrders: false,
        fetchTransactionDetails: false,
        updateDeliveryStatus: false,
        fetchServiceFee: false,
    }
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FETCH_MY_STORE_LOADING:
            return setFetchMyStoreLoading(state, action.payload);
        case SET_MY_STORE:
            return setMyStore(state, action.payload);
        case SET_FETCH_TRANSACTIONS_LOADING:
            return setFetchTransactionsLoading(state, action.payload);
        case SET_DELIVERY_TRANSACTIONS:
            return setDeliveryTransactions(state, action.payload);
        case SET_DELIVERY_COIN_TRANSACTIONS:
            return setDeliveryCoinTransactions(state, action.payload);
        case SET_FETCH_DELIVERY_COIN_TRANSACTIONS_LOADING:
            return setFetchDeliveryCoinTransactionsLoading(state, action.payload);


        case SET_UPDATE_DELIVERY_STATUS_LOADING:
            return setUpdateDeliveryStatusLoading(state, action.payload);
        case SET_FETCH_ORDERS_LOADING:
            return setFetchOrdersLoading(state, action.payload);
        case SET_ORDERS_FETCHED:
            return setOrdersFetched(state, action.payload);
        case INCREMENT_PACKAGE_ITEM_QUANTITY:
            return incrementPackageItemQuantity(state, action.payload);
        case DECREMENT_PACKAGE_ITEM_QUANTITY:
            return decrementPackageItemQuantity(state, action.payload);
        case UPDATE_PACKAGE_ITEM_AMOUNT:
            return updatePackageItemAmount(state, action.payload);
        case UPDATE_PACKAGE_TOTAL:
            return updatePackageTotal(state, action.payload);
        case COLLECT_PACKAGE_PRODUCTS:
            return collectPackageProducts(state, action.payload);
        case RESET_ORDER_FORMS:
            return resetOrderForms(state);
        case UPDATE_CHECKOUT_FIELD:
            return updateCheckoutField(state, action.payload);
        case UPDATE_ORDER_TOTALS:
            return updateOrderTotals(state, action.payload);
        case SET_TRANSACTION_DETAILS:
            return setTransactionDetails(state, action.payload);
        case SET_TRANSACTION_DETAILS_LOADING:
            return setTransactionDetailsLoading(state, action.payload);
        case SET_DELIVERY_TRANSACTION_DETAILS:
            return setDeliveryTransactionDetails(state, action.payload);
        case RESET_PARCEL_ITEMS:
            return resetParcelItems(state);
        case SET_SELLERS:
            return setSellers(state, action.payload);
        case SET_FETCH_SERVICE_FEE_LOADING:
            return setFetchServiceFeeLoading(state, action.payload);
        case SET_ORDER_SERVICE_FEE:
            return setOrderServiceFee(state, action.payload);
        default: {
            return state;
        }
    }
};

const setOrderServiceFee = (state, payload) => {
    return {
        ...state,
        orderForm: {
            ...state.orderForm,
            checkout: {
                ...state.orderForm.checkout,
                service_fee: payload
            }
        }
    };
};

const setFetchServiceFeeLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            fetchServiceFee: payload
        }
    };
};

const setUpdateDeliveryStatusLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            updateDeliveryStatus: payload
        }
    };
};

const setFetchDeliveryCoinTransactionsLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            fetchCoinTransactions: payload
        }
    };
};

const setDeliveryCoinTransactions = (state, payload) => {
    return {
        ...state,
        coinTransactions: {
            data: payload.data,
            pagination: payload.pagination,
        }
    };
};

const setDeliveryTransactions = (state, payload) => {
    return {
        ...state,
        transactions: {
            data: payload.data,
            pagination: payload.pagination,
        }
    };
};

const setFetchTransactionsLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            fetchTransactions: payload
        }
    };
};

const setFetchMyStoreLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            fetchMyStore: payload
        }
    };
};

const setMyStore = (state, payload) => {
    return {
        ...state,
        myStore: {
            ...payload
        }
    };
};

const setFetchOrdersLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            fetchAll: payload,
        }
    };
};

const setOrdersFetched = (state, payload) => {

    // alert('HAHA: ' + JSON.stringify(payload));
    return {
        ...state,
        orders: payload
    };
};

const incrementPackageItemQuantity = (state, payload) => {
    const items = {
        ...state.orderForm.items
    }
    items[payload]['quantity']++
    return {
        ...state,
        orderForm: {
            ...state.orderForm,
            items: {
                ...state.items,
                ...items
            }
        }
    };
}

const decrementPackageItemQuantity = (state, payload) => {
    const items = {
        ...state.orderForm.items
    }

    if (!items.hasOwnProperty(payload)) {
        return {...state};
    } else {
        items[payload]['quantity']--
    }

    if (!items[payload]['quantity']) {
        delete items[payload]
    }

    return {
        ...state,
        orderForm: {
            ...state.orderForm,
            items: {
                ...state.items,
                ...items
            }
        }
    };
}


const updatePackageItemAmount = (state, payload) => {
    const items = {...state.orderForm.items}
    if (!items.hasOwnProperty(payload)) {
        return {...state}
    }
    items[payload]['amount'] = items[payload]['quantity'] * items[payload]['price_per_item'];
    return {
        ...state,
        orderForm: {
            ...state.orderForm,
            items: {
                ...state.items,
                ...items
            }
        }
    }
}


const updatePackageTotal = (state, payload) => {
    const items = {...state.orderForm.items}
    let total = 0
    Object.values(items).map(function (item) {
        total += item['amount']
    })
    return {
        ...state,
        orderForm: {
            ...state.orderForm,
            checkout: {
                ...state.checkout,
                total: total
            }
        }
    }
}

//

const collectPackageProducts = (state, payload) => {
    const items = {...state.orderForm.items}
    if (items.hasOwnProperty(payload.id)) {
        return {...state};
    } else {
        payload['quantity'] = 0;
        payload['amount'] = payload['price_per_item']
        items[payload.id] = payload
    }

    return {
        ...state,
        orderForm: {
            ...state.orderForm,
            items: {
                ...state.items,
                ...items
            }
        }
    };
};


const resetOrderForms = (state) => {

    return {
        ...state,
        orderForm: {
            items: {},
            checkout: {
                name: "",
                contact: "",
                dropshipper_id: DROPSHIPPER_ID,
                region: "",
                address: "",
                user_id: "",
                order_details: "",
                total: 0,
                total_weight: 0,
                service_fee: 190,
                declared_amount: 0
            }
        },
    }
}

const updateCheckoutField = (state, payload) => {
    let field = {...state.orderForm.checkout}

    field[payload.field] = payload.value

    return {
        ...state,
        orderForm: {
            ...state.orderForm,
            checkout: {
                ...state.checkout,
                ...field
            }
        }
    }
}

const updateOrderTotals = (state, payload) => {

    let is_increment = payload['increment']
    let id = payload['id']
    let items = {...state.orderForm.items}
    let checkout = {...state.orderForm.checkout}
    const data = payload['items']
    const type = payload['type']

    if (!items.hasOwnProperty(id)) {
        if (!is_increment) {
            return {...state};
        } else {
            items[id] = data.find(
                item => {
                    if (['parcel'].includes(type)) {
                        return item['region'] == checkout['region'] && item['id'] == id
                    }
                    return item['id'] == id
                }
            )

            const productName = items[id]['name']

            let initialAmount = 1

            if (productName === 'Max-Cee Blister' && type === 'package') {
                initialAmount = 10
            }

            // alert(JSON.stringify(productName))

            // items[id]['quantity'] = items[id]['remaining'] > 0 || type !== 'parcel' ? 1 : 0
            items[id]['quantity'] = items[id]['remaining'] > 0 || type !== 'parcel' ? initialAmount : 0
        }
    } else if (items.hasOwnProperty(id)) {

        const productName = items[id]['name']

        let incrementValue = 1

        if (productName === 'Max-Cee Blister' && type === 'package') {
            incrementValue = 10
        }

        if (is_increment) {
            // items[id]['quantity']++
            items[id]['quantity'] = items[id]['quantity'] + incrementValue
        } else {
            items[id]['quantity'] = items[id]['quantity'] - incrementValue
            // items[id]['quantity']--
        }
    }

    // alert('payload.type: ' + payload.type);

    if (payload.type === 'package') {
        items[id]['amount'] = items[id]['quantity'] * items[id]['price_per_item']
    } else {
        items[id]['amount'] = items[id]['quantity'] * items[id]['price_per_item_dropshipper']
    }

    if (items[id]['quantity'] == 0) {
        delete items[id]
    }

    let total = 0
    Object.values(items).map(function (item) {
        total += item['amount']
    })
    checkout['total'] = total
    return {
        ...state,
        orderForm: {
            ...state.orderForm,
            items: {
                ...state.items,
                ...items
            },
            checkout: {
                ...checkout,
            }
        }
    }
}


const setTransactionDetails = (state, payload) => {
    return {
        ...state,
        transactionDetails: payload
    }
}


const setTransactionDetailsLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            fetchTransactionDetails: payload
        }
    }
}


const setDeliveryTransactionDetails = (state, payload) => {
    const items = payload['items'] || []
    const details = payload['details'] || {}
    return {
        ...state,
        deliveryTransactionDetails: {
            ...state.deliveryTransactionDetails,
            items: payload['items'] || [],
            details: payload['details'] || {},
            tracking: payload['tracking'] || []
        }
    }
}


const resetParcelItems = (state) => {
    let checkout = {...state.orderForm}
    checkout['items'] = {}
    return {
        ...state,
        orderForm: {
            ...state.orderForm,
            items: {}
        }
    }
}

const setSellers = (state, payload) => {
    console.log(payload)
    return {
        ...state,
        sellers: payload || []
    }
}
export default Reducer;
