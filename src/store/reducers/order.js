import {
    COLLECT_ORDERED_PRODUCTS,
    DECREMENT_PRODUCT_QUANTITY_COUNT,
    INCREMENT_PRODUCT_QUANTITY_COUNT,
    RESET_ORDER_FORM,
    SET_FETCH_ALL_ORDERS_LOADING,
    SET_FETCH_ALL_TRANSACTIONS_LOADING,
    SET_FETCH_ORDER_INVENTORY_LOADING,
    SET_ORDER_INVENTORY,
    SET_ORDERS,
    SET_SUBMIT_ORDER_LOADING,
    SUBMIT_PACKAGE_ORDER,
    UPDATE_ORDER_ITEM_AMOUNT,
    UPDATE_ORDER_TOTAL,
    UPDATE_PARCEL_FORM_FIELD
} from "../actions/actionTypes";

export const initialState = {
    orders: [],
    orderForm: {
        items: {},
        total:0,
        checkout:{
            name:"Jason Gandia",
            region:"Luzon",
            address:"Manila",

            // Add these new fields
            contact_number: '',
            note: '',

            user_id: 40,
            order_details : "",
            recipient: {
                name: "Reeze T",
                address: "Cavite City",
                amount_declared: 5000
            },
            service_fee: 0
        }
    },
    inventory: [{
        date_created: 'August 1, 2020',
        type: 'Package',
        amount: 10750,
        region:'Vis/Min'
    },{
        date_created: 'August 2, 2020',
        type: 'Parcel',
        amount: 500,
        region:'Luzon'
    }],
    loading: {
        fetchAll: false,
        fetchOne: false,
        fetchOptions: false,
        updating: false,
        creating: false,
        deleting: false,
        fetchInventory: false
    }
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return setOrders(state, action.payload);
        case SET_FETCH_ALL_ORDERS_LOADING:
            return setFetchAllOrdersLoading(state, action.payload);
        case SET_FETCH_ALL_TRANSACTIONS_LOADING:
            return setFetchAllTransactionsLoading(state, action.payload);
        case INCREMENT_PRODUCT_QUANTITY_COUNT:
            return incrementProductQuantityCount(state, action.payload);
        case DECREMENT_PRODUCT_QUANTITY_COUNT:
            return decrementProductQuantityCount(state, action.payload);
        case UPDATE_ORDER_ITEM_AMOUNT:
            return updateOrderItemAmount(state, action.payload); 
        case COLLECT_ORDERED_PRODUCTS:
            return collectOrderedProducts(state,action.payload);
        case UPDATE_ORDER_TOTAL:
            return updateOrderTotal(state, action.payload);
        case RESET_ORDER_FORM:
            return resetOrderForm(state);
        case SUBMIT_PACKAGE_ORDER:
            return submitPackageOrder(state, action.payload);
        case SET_SUBMIT_ORDER_LOADING:
            return setSubmitOrderLoading(state, action.payload);
        case SET_FETCH_ORDER_INVENTORY_LOADING:
            return setFetchOrderInventoryLoading(state, action.payload);
        case SET_ORDER_INVENTORY:
            return setOrderInventory(state, action.payload);
        case UPDATE_PARCEL_FORM_FIELD:
            return updateParcelFormField(state, action.payload);
        default: {
            return state;
        }
    }
};

const setOrders = (state, payload) => {

    // alert('HAHA: ' + JSON.stringify(payload));
    return {
        ...state,
        orders: payload
    };
};

const setFetchAllTransactionsLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            fetchAll: payload,
        }
    };
};

const setFetchAllOrdersLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            fetchAll: payload,
        }
    };
};

const resetOrderForm = (state) => {

    const items = {}
    const total = 0
    return {
        ...state,
        orderForm: {
            ...state.orderForm,
            items: {
                ...state.items,
                ...items
            },
            total:total,
            checkout:{
                ...state.checkout,
                name:"",
                region:"",
                user_id: 40,
                order_details : ""
            }
        }
    };
};

const collectOrderedProducts = (state, payload) => {
    const items = {...state.orderForm.items}
    if(items.hasOwnProperty(payload.id)){
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
            items : {
                ...state.items,
                ...items
            }
        }
    };
};

const incrementProductQuantityCount = (state, payload) => {
    const items = {
        ...state.orderForm.items
    }
    items[payload]['quantity']++

    return {
        ...state,
        orderForm: {
            ...state.orderForm,
            items : {
                ...state.items,
                ...items
            }
        }
    };
}

const decrementProductQuantityCount = (state, payload) => {
    const items = {
        ...state.orderForm.items
    }

    if(!items.hasOwnProperty(payload)) {
        return {...state};
    } else {
        items[payload]['quantity']--
    }

    if(!items[payload]['quantity']) {
        delete items[payload]
    }

    return {
        ...state,
        orderForm: {
            ...state.orderForm,
            items : {
                ...state.items,
                ...items
            }
        }
    };
    
    
}

const updateOrderItemAmount = (state, payload) => {
    const items = {...state.orderForm.items}
    if(!items.hasOwnProperty(payload)) {
        return {...state}
    }
    items[payload]['amount'] = items[payload]['quantity'] *  items[payload]['price_per_item'];
    return {
        ...state,
        orderForm: {
            ...state.orderForm,
            items : {
                ...state.items,
                ...items
            }
        }
    }
}


const updateOrderTotal = (state, payload) => {
    const items = {...state.orderForm.items}
    let total = 0
    Object.values(items).map(function(item) {
        total += item['amount']
    })
    return {
        ...state,
        orderForm: {
            ...state.orderForm,
            total:total
        }
    }
}

const submitPackageOrder = (state, payload) => {
    return {
        ...state
    }
}

const setSubmitOrderLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            creating:payload
        }
    }
}

const setFetchOrderInventoryLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            fetchInventory: payload,
        }
    };
}

const setOrderInventory = (state, payload) => {
    return {
        ...state,
        inventory: payload
    }
}

const updateParcelFormField = (state, payload) => {
    console.log(state.orderForm.checkout,payload.field, payload.value)
    let field = {...state.orderForm.checkout}
    console.log(field, payload.field)

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

export default Reducer;
