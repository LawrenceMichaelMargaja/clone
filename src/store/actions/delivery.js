// This function will be used for both sellers and dropshippers
import API from "../../api";
import {hasNoAPIErrors} from "../../utilities/utilities";
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
    UPDATE_NONPACKAGE_TOTAL,
    UPDATE_ORDER_TOTALS,
    UPDATE_PACKAGE_ITEM_AMOUNT,
    UPDATE_PACKAGE_TOTAL
} from "./actionTypes";

const setMyStore = data => {
    return {
        type: SET_MY_STORE,
        payload: data
    }
};

const setDeliveryTransactions = (data, pagination) => {
    return {
        type: SET_DELIVERY_TRANSACTIONS,
        payload: {data, pagination}
    }
};

const setDeliveryCoinTransactions = (data, pagination) => {
    return {
        type: SET_DELIVERY_COIN_TRANSACTIONS,
        payload: {
            data,
            pagination
        }
    }
};

export const setFetchTransactionsLoading = data => {
    return {
        type: SET_FETCH_TRANSACTIONS_LOADING,
        payload: data
    }
};

const setUpdateDeliveryStatusLoading = data => {
    return {
        type: SET_UPDATE_DELIVERY_STATUS_LOADING,
        payload: data
    }
};

const setFetchCoinTransactionsLoading = data => {
    return {
        type: SET_FETCH_DELIVERY_COIN_TRANSACTIONS_LOADING,
        payload: data
    }
};

const setFetchMyStoreLoading = data => {
    return {
        type: SET_FETCH_MY_STORE_LOADING,
        payload: data
    }
};

export const setTrasanctionDetailsLoading = loading => {
    return {
        type: SET_TRANSACTION_DETAILS_LOADING,
        payload: loading
    }
};

export const fetchMyStore = () => {
    return async dispatch => {
        try {
            dispatch(setFetchMyStoreLoading(true));

            const result = await API().Delivery().myStore();

            if (hasNoAPIErrors(result)) {
                dispatch(setMyStore(result.data.data));
            }

            dispatch(setFetchMyStoreLoading(false));
        } catch (err) {
            dispatch(setFetchMyStoreLoading(false));
        }
    };
};

export const fetchTransactions = (
    rows,
    page,
    search,
) => {
    return async dispatch => {
        try {
            dispatch(setFetchTransactionsLoading(true));

            const params = {
                rows,
                page,
            }

            if (search) {
                params['search'] = search
            }

            const result = await API().Delivery().transactions(params);
            
            if (hasNoAPIErrors(result)) {
                if (result.data.data !== null) {
                    dispatch(setDeliveryTransactions(result.data.data, result.data.pagination));
                }
            }

            dispatch(setFetchTransactionsLoading(false));
        } catch (err) {
            dispatch(setFetchTransactionsLoading(false));
        }
    };
};

/**
 * Coin Transactions
 */

export const fetchCoinTransactions = (
    rows,
    page
) => {
    return async dispatch => {
        try {
            dispatch(setFetchCoinTransactionsLoading(true));

            const params = {
                rows,
                page
            }

            const result = await API().Delivery().coinTransactions2(params);

            if (hasNoAPIErrors(result)) {
                if (result.data.data !== null) {
                    dispatch(setDeliveryCoinTransactions(result.data.data, result.data.pagination));
                }
            }
            dispatch(setFetchCoinTransactionsLoading(false));
        } catch (err) {
            alert('fetchCoinTransactions error: ' + JSON.stringify(err))
            dispatch(setFetchCoinTransactionsLoading(false));
        }
    };
};

/*
* Orders
*/
const setFetchOrdersLoading = loading => {
    return {
        type: SET_FETCH_ORDERS_LOADING,
        payload: loading
    }
};

const setFetchServiceFeeLoading = loading => {
    return {
        type: SET_FETCH_SERVICE_FEE_LOADING,
        payload: loading
    }
};

export const setOrdersFetched = data => {
    return {
        type: SET_ORDERS_FETCHED,
        payload: data
    }
};

export const fetchOrders = () => {
    return async dispatch => {
        try {
            dispatch(setFetchOrdersLoading(true));

            const result = await API().Order().fetchAll();

            if (hasNoAPIErrors(result)) {
                dispatch(setFetchOrdersLoading(false));

                // Transform data
                const orders = result.data.data || [];

                // alert(JSON.stringify(orders));
                const formattedOrders = {};

                for (let i in orders) {
                    if (! formattedOrders[ orders[i]['id'] ]) {
                        formattedOrders[ orders[i]['id'] ] = {
                            id: orders[i]['id'],
                            order_id: orders[i]['id'],
                            amount: orders[i]['amount'],
                            date_created: orders[i]['date_created'],
                            seller: orders[i]['seller'],
                            details: [],
                        };
                    }

                    formattedOrders[ orders[i]['id'] ].details.push({
                        product: orders[i]['product'],
                        price_per_item: orders[i]['price_per_item'],
                        quantity: orders[i]['quantity'],
                        total_price: orders[i]['total_price'],
                    });
                }

                const formattedOrder2 = [];

                for (let i in formattedOrders) {
                    formattedOrder2.push(formattedOrders[i]);
                }

                dispatch(setOrdersFetched(formattedOrder2));
            }

            dispatch(setFetchOrdersLoading(false));
        } catch (e) {
            dispatch(setFetchOrdersLoading(false));
            console.log(e);
        }
    };
};

export const incrementPackageItemQuantity = productId => {
    return {
        type: INCREMENT_PACKAGE_ITEM_QUANTITY,
        payload: productId
    };
};

export const decrementPackageItemQuantity = productId => {
    return {
        type: DECREMENT_PACKAGE_ITEM_QUANTITY,
        payload: productId
    };
};

export const collectPackageProducts = (product) => {
    return {
        type: COLLECT_PACKAGE_PRODUCTS,
        payload: product
    };
};

export const updatePackageItemAmount = (productId) => {
    return {
        type: UPDATE_PACKAGE_ITEM_AMOUNT,
        payload: productId
    };
};

export const updatePackageTotal = () => {
    return {
        type: UPDATE_PACKAGE_TOTAL,
        payload: []
    };
};

export const submitPackage = (
    user_id,
    order_details,
    region,
    callback
) => {
    return async dispatch => {
        try {
            dispatch(setFetchOrdersLoading(true));

            const created = API().Order().create({
                user_id,
                order_details,
                region
            })

            if (hasNoAPIErrors(created)) {
                if (callback) {
                    callback();
                }
            }
            dispatch(setFetchOrdersLoading(false));
        } catch (e) {
            dispatch(setFetchOrdersLoading(false));
            alert(e)
        }
    };
};

export const resetOrderForms = () => {
    return {
        type: RESET_ORDER_FORMS
    }
};


export const updateCheckoutField = (field, value) => {
    return {
        type: UPDATE_CHECKOUT_FIELD,
        payload: {
            field,
            value
        }
    }
}


export const updateNonpackageTotal = () => {
    return {
        type: UPDATE_NONPACKAGE_TOTAL,
        payload: []
    }
}


export const updateOrderTotals = (id, data, increment, type, tab) => {
    // alert('type: ' + type);

    return {
        type: UPDATE_ORDER_TOTALS,
        payload: {
            id: id,
            items: data,
            increment:increment,
            type: type,
            tab,
        }
    }
}

export const updateOrderServiceFee = data => {
    return {
        type: SET_ORDER_SERVICE_FEE,
        payload: data
    }
}

export const setServiceFee = data => {
    return async dispatch => {
        dispatch(updateOrderServiceFee(data))
    };
}

export const fetchServiceFee = (
    order_details,
) => {
    return async dispatch => {
        try {
            dispatch(setFetchServiceFeeLoading(true));

            const data = await API().Delivery().serviceFee({
                order_details,
            })

            if (hasNoAPIErrors(data)) {
                dispatch(updateOrderServiceFee(data['data']['data']['service_fee']))
            }

            dispatch(setFetchServiceFeeLoading(false));
        } catch (e) {
            dispatch(setFetchServiceFeeLoading(false));
            alert(e)
        }
    };
}

export const makeAnOrder = (
    dropshipper_id,
    order_details,
    region,
    callback,
) => {
    return async dispatch => {
        try {
            dispatch(setFetchOrdersLoading(true));

            const created = await API().Delivery().makeAnOrder({
                dropshipper_id,
                order_details,
                region,
            })

            if (hasNoAPIErrors(created)) {
                if (callback) {
                    callback();
                }
            }
            dispatch(setFetchOrdersLoading(false));
        } catch (e) {
            dispatch(setFetchOrdersLoading(false));
            alert(e)
        }
    };
}

export const makeNonPackageOrder = (
    delivery_option,
    dropshipper_id,
    name,
    contact_number,
    address,
    note,
    region,
    service_fee,
    declared_amount,
    order_details,
    callback
) => {
    return async dispatch => {
        try {
            dispatch(setFetchOrdersLoading(true));

            const payload = {
                delivery_option,
                dropshipper_id: parseFloat(dropshipper_id),
                name,
                contact_number,
                address,
                note,
                region,
                service_fee: parseFloat(service_fee),
                declared_amount: parseFloat(declared_amount),
                delivery_details: order_details
            }

            const created = API().Delivery().makeNonPackageOrder(payload)

            if (hasNoAPIErrors(created)) {
                if (callback) {
                    callback();
                }
            }
            dispatch(setFetchOrdersLoading(false));
        } catch (e) {
            dispatch(setFetchOrdersLoading(false));
            alert(e)
        }
    };
}


export const setTransactionDetails = data => {
    return {
        type: SET_TRANSACTION_DETAILS,
        payload: data
    }
}

export const fetchTransactionDetails = (id, type) => {
    return async dispatch => {
        try {
            dispatch(setTrasanctionDetailsLoading(true))

            const apiType = type === 'Package' ? API().Order() : API().Delivery()
            const result = await apiType.details(id);
            if (hasNoAPIErrors(result)) {
                dispatch(type === 'Package' ?
                    setTransactionDetails(result.data.data || []) :
                    setDeliveryTransactionDetails(result.data.data || [])
                );
            }
            
            dispatch(setTrasanctionDetailsLoading(false))
        } catch (err) {
            dispatch(setTrasanctionDetailsLoading(false))
        }
    };
};

const setDeliveryTransactionDetails = data => {
    return {
        type: SET_DELIVERY_TRANSACTION_DETAILS,
        payload: data
    }
}

export const fetchDeliveryTransactionDetails = id => {
    return async dispatch => {
        try {
            dispatch(setTrasanctionDetailsLoading(true))
            const result = API().Delivery().details(id)

            if (hasNoAPIErrors(result)) {
                dispatch(setDeliveryTransactionDetails(result.data.data || []));
            }

            dispatch(setTrasanctionDetailsLoading(false))
        } catch (err) {
            dispatch(setTrasanctionDetailsLoading(false))
        }
    }
}


export const resetParcelItems = type => {
    return {
        type: RESET_PARCEL_ITEMS
    }
}


const setSellers = data => {
    return {
        type: SET_SELLERS,
        payload: data || []
    }
}

export const fetchSellers = () => {
    return async dispatch => {
        try {
            dispatch(setFetchTransactionsLoading(true))
            const result = await API().Product().fetchSellers()
            if(hasNoAPIErrors(result)) {
                console.log('sellers', result.data)
                dispatch(setSellers(result['data']['data'] || []))
            }
            dispatch(setFetchTransactionsLoading(false))
        } catch (e) {
            dispatch(setFetchTransactionsLoading(false))

        }
    }
}

export const updateDeliveryStatus = (
    id,
    status,
    trackingNumber,
    voidOrRejectReason,
    callback
) => {
    return async dispatch => {
        try {
            dispatch(setUpdateDeliveryStatusLoading(true))

            const result = await API().Delivery().updateDeliveryStatus({
                delivery_id: parseFloat(id),
                delivery_status: status,
                tracking_number: trackingNumber,
                void_or_reject_reason: voidOrRejectReason,
            })


            alert(JSON.stringify(result))

            if(hasNoAPIErrors(result, true)) {
                if (callback) {
                    alert('Calling back!')
                    callback()
                }
            } else {
                alert('has api errors: ' + JSON.stringify(result))
            }

            dispatch(setUpdateDeliveryStatusLoading(false))
        } catch (e) {
            dispatch(setUpdateDeliveryStatusLoading(false))
            alert(e)
        }
    }
};
