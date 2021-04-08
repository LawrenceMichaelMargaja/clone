import API from "../../api";
import {hasNoAPIErrors, objectChecker} from "../../utilities";
import {
    FETCH_ALL_PRODUCTS_LOADING,
    RESET_PRODUCT_FORM,
    SET_FETCH_PRODUCT_INVENTORY_LOADING, SET_INVENTORY_ITEM_BREAKDOWN,
    SET_PRODUCT,
    SET_PRODUCT_INVENTORY,
    SET_PRODUCT_TYPES,
    SET_PRODUCTS,
    UPDATE_PRODUCT_FORM_FIELD
} from "./actionTypes";

export const resetProductForm = () => {
    return {
        type: RESET_PRODUCT_FORM,
    }
}

export const setProduct = data => {
    return {
        type: SET_PRODUCT,
        payload: data,
    }
}

export const setProducts = data => {
    return {
        type: SET_PRODUCTS,
        payload: data,
    }
}

export const setProductTypes = data => {
    return {
        type: SET_PRODUCT_TYPES,
        payload: data,
    }
}

const setFetchAllProductsLoading = loading => {
    return {
        type: FETCH_ALL_PRODUCTS_LOADING,
        payload: loading
    };
}

const setFetchProductInventoryLoading = loading => {
    return {
        type: SET_FETCH_PRODUCT_INVENTORY_LOADING,
        payload: loading
    }
}

export const setProductInventory = data => {
    return {
        type: SET_PRODUCT_INVENTORY,
        payload: data
    }
}

export const fetchAll = filter => {

    return async (dispatch) => {
        try {
            dispatch(setFetchAllProductsLoading(true));
            const result = await API().Product().fetchAll({filter});

            if (objectChecker(result, ['data', 'data'])) {
                dispatch(setProducts(result.data.data));
                dispatch(setFetchAllProductsLoading(false));
            }
        } catch (e) {
            dispatch(setFetchAllProductsLoading(false));
            console.log(e);
        }
    };
};

export const fetchAllProductTypes = () => {

    return async (dispatch) => {
        try {
            const result = await API().Product().fetchAllTypes();

            if (hasNoAPIErrors(result)) {
                dispatch(setProductTypes(result.data.data));
            }
        } catch (e) {
            // alert('eree');
            console.log('================================');
            console.log(e);
        }
    };
};

export const updateProductFormField = (field, value) => {
    return {
        type: UPDATE_PRODUCT_FORM_FIELD,
        payload: {
            field,
            value,
        }
    }
}

/*export const updateProductFormField = (field, value) => action(
    UPDATE_PRODUCT_FORM_FIELD, {
        field,
        value,
    });*/

export const addProduct = (
    name,
    product_type_id,
    file,
    fileName,
    callback
) => {

    return async (dispatch) => {
        try {

            let formData = new FormData();

            formData.append('image', file, fileName);
            formData.append('name', name);
            formData.append('productTypeId', product_type_id.toString());

            const add = await API().Product().add(formData);

            if (hasNoAPIErrors(add)) {
                if (callback) {
                    callback();
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
};

export const updateProduct = (
    id,
    name,
    product_type_id,
    file,
    fileName,
    callback
) => {

    return async (dispatch) => {
        try {

            let formData = new FormData();

            if (file !== null) {
                formData.append('image', file, fileName);
            }

            formData.append('id', id.toString());
            formData.append('name', name);
            formData.append('productTypeId', product_type_id.toString());

            const update = await API().Product().put(formData);

            if (objectChecker(update, ['data', 'data'])) {
                if (callback) {
                    callback();
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
};


export const deleteProduct = (
    id
) => {

    return async (dispatch) => {
        try {
            const add = await API().Product().delete({
                id,
            });

            if (objectChecker(add, ['data', 'data'])) {
                dispatch(fetchAll());
            }
        } catch (e) {
            console.log(e);
        }
    };
};

export const fetchProduct = (
    id
) => {

    return async (dispatch) => {
        try {
            const result = await API().Product().fetchOne(id);

            if (hasNoAPIErrors(result)) {
                dispatch(setProduct(result['data']['data'][0]));
            }
        } catch (e) {
            console.log(e);
        }
    };
};


export const fetchProductInventory = () => {
    return async (dispatch) => {
        try {

            dispatch(setFetchProductInventoryLoading(true))
            const result = await API().Product().fetchInventory()


            if (hasNoAPIErrors(result)) {
                if (result['data']['data'] !== null) {
                    dispatch(setProductInventory(result['data']['data']))
                }
            }
            dispatch(setFetchProductInventoryLoading(false))
        } catch (e) {
            dispatch(setFetchProductInventoryLoading(false))
            alert('fetchProductInventory: ' + e)
        }
    }
}

export const setInventoryItemBreakdown = data => {
    return {
        type: SET_INVENTORY_ITEM_BREAKDOWN,
        payload: data
    }
}

export const fetchInventoryItemBreakdown = (
    inventoryId,
    successCallback,
    failCallback,
) => {
    return async (dispatch) => {
        try {
            const result = await API().Product().inventoryItemBreakdown({
                inventory_id: inventoryId,
            })

            if (hasNoAPIErrors(result)) {
                if (result['data']['data'] !== null) {
                    dispatch(setInventoryItemBreakdown(result['data']['data']))
                }
            }
        } catch (e) {
            alert('fetchProductInventory: ' + e)
        }
    }
}
