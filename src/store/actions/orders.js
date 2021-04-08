import API from "../../api";
import {hasNoAPIErrors} from "../../utilities";
import {
    COLLECT_ORDERED_PRODUCTS,
    DECREMENT_PRODUCT_QUANTITY_COUNT,
    INCREMENT_PRODUCT_QUANTITY_COUNT,
    RESET_ORDER_FORM,
    SET_FETCH_ALL_ORDERS_LOADING,
    SET_FETCH_ORDER_INVENTORY_LOADING,
    SET_ORDER_INVENTORY,
    SET_ORDERS,
    SET_SUBMIT_ORDER_LOADING,
    UPDATE_ORDER_ITEM_AMOUNT,
    UPDATE_ORDER_TOTAL,
    UPDATE_PARCEL_FORM_FIELD
} from "./actionTypes";
import {setFetchTransactionsLoading} from "./delivery";

const setFetchAllOrdersLoading = loading => {
    return {
        type: SET_FETCH_ALL_ORDERS_LOADING,
        payload: loading
    }
};

const setSubmitOrderLoading = loading => {
    return {
        type: SET_SUBMIT_ORDER_LOADING,
        payload: loading
    }
}

const setFetchOrderInventoryLoading = loading => {
    return {
        type: SET_FETCH_ORDER_INVENTORY_LOADING,
        payload: loading
    }
}

export const setOrderInventory = data => {
    return {
        type: SET_ORDER_INVENTORY,
        payload: data
    }
}

export const setOrders = data => {
    return {
        type: SET_ORDERS,
        payload: data
    }
};

export const fetchAllOrders = () => {
    return async dispatch => {
        try {
            dispatch(setFetchAllOrdersLoading(true));

            const result = await API().Order().fetchAll();

            if (hasNoAPIErrors(result)) {
                dispatch(setFetchAllOrdersLoading(false));

                // Transform data
                const orders = result.data.data;

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

                    console.log('looping', i);

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

                dispatch(setOrders(formattedOrder2));
            }

            dispatch(setFetchAllOrdersLoading(false));
        } catch (e) {
            dispatch(setFetchAllOrdersLoading(false));
            console.log(e);
        }
    };
};

export const incrementProductQuantityCount = productId => {
    return {
        type: INCREMENT_PRODUCT_QUANTITY_COUNT,
        payload: productId
    };
};

export const decrementProductQuantityCount = productId => {
    return {
        type: DECREMENT_PRODUCT_QUANTITY_COUNT,
        payload: productId
    };
};

export const updateOrderItemAmount = (productId) => {
    return {
        type: UPDATE_ORDER_ITEM_AMOUNT,
        payload: productId
    };
};


export const collectOrderedProducts = (product) => {
    return {
        type: COLLECT_ORDERED_PRODUCTS,
        payload: product
    };
};

export const updateOrderTotal = () => {
    return {
        type: UPDATE_ORDER_TOTAL,
        payload: []
    };
};

export const submitPackageOrder = (
    user_id,
    order_details,
    callback
) => {
    return async dispatch => {
        try {
            dispatch(setSubmitOrderLoading(true));

            const created = API().Order().create({
                user_id,
                order_details
            })

            if (hasNoAPIErrors(created)) {
                if (callback) {
                    callback();
                }
            }
            dispatch(setSubmitOrderLoading(false));
        } catch (e) {
            dispatch(setSubmitOrderLoading(false));
            alert(e)
        }
    };
};

export const resetOrderForm = () => {
    return {
        type: RESET_ORDER_FORM
    }
};

export const updateParcelFormField = (field, value) => {
    return {
        type: UPDATE_PARCEL_FORM_FIELD,
        payload: {
            field,
            value,
        }
    }
}

export const fetchOrderInventory = () => {
    return async (dispatch) => {
        try {
            dispatch(setFetchOrderInventoryLoading(true))
            // const result = API().Order().fetchInventory()

            // if (hasNoAPIErrors([])) {
            //     dispatch(setOrderInventory([]))
            // }

            dispatch(setFetchOrderInventoryLoading(false))
        } catch (e) {
            dispatch(setFetchOrderInventoryLoading(false))
        }
    }
}

export const updateOrder = (
    orderID,
    voidOrRejectReason,
    callback,
) => {
    return async (dispatch) => {
        try {

            dispatch(setFetchTransactionsLoading(true));

            const payload = {
                order_id: parseFloat(orderID),
                void_or_reject_reason: voidOrRejectReason,
            }

            const result = await API().Order().update(payload)

            if (hasNoAPIErrors(result)) {
                if (callback) {
                    callback();
                }
            }
            dispatch(setFetchTransactionsLoading(false))
        } catch (e) {
            dispatch(setFetchTransactionsLoading(false))
        }
    }
}
