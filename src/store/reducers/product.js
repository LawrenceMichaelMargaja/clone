import {
    FETCH_ALL_PRODUCTS_LOADING,
    RESET_PRODUCT_FORM,
    SET_FETCH_PRODUCT_INVENTORY_LOADING, SET_INVENTORY_ITEM_BREAKDOWN,
    SET_PRODUCT,
    SET_PRODUCT_INVENTORY,
    SET_PRODUCT_TYPES,
    SET_PRODUCTS,
    UPDATE_PRODUCT_FORM_FIELD
} from "../actions/actionTypes";


export const initialState = {
    inventoryItemBreakdown: [],
    products: [{
        "id": 31,
        "name": "Kojic",
        "url": "https://scontent.fcgy1-1.fna.fbcdn.net/v/t1.0-9/100662715_3027188573986197_6224830985540730880_n.jpg?_nc_cat=101&_nc_sid=85a577&_nc_eui2=AeGcvpbgraakXSvJRF8WltVTpNtMGvICsryk20wa8gKyvDbec7-EduSOvLTuRykpqm2qIIDN_6cclJkccc8usy8H&_nc_ohc=m0Nl0jUaRUcAX8j_S_d&_nc_ht=scontent.fcgy1-1.fna&oh=2515d319b2e53ceb82dccadb9f14261c&oe=5F4B5BA1",
        "category": "Others",
        "category_id": 3,
        "price_per_item": 100,
    },
    {
        "id": 32,
        "name": "Soap",
        "url": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F949587%2Fpexels-photo-949587.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D500&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbackground%2F&tbnid=kbn8tJPNTRmy2M&vet=12ahUKEwi-5LLZ5PfqAhUN3pQKHUZnAbIQMygCegUIARDWAQ..i&docid=_pUPWoKZqMHalM&w=500&h=333&q=images&ved=2ahUKEwi-5LLZ5PfqAhUN3pQKHUZnAbIQMygCegUIARDWAQ",
        "category": "Cosmetics",
        "category_id": 2,
        "price_per_item": 200
    }],
    parcelProducts : [{
        "id": 31,
        "name": "Kojic",
        "url": "https://scontent.fcgy1-1.fna.fbcdn.net/v/t1.0-9/100662715_3027188573986197_6224830985540730880_n.jpg?_nc_cat=101&_nc_sid=85a577&_nc_eui2=AeGcvpbgraakXSvJRF8WltVTpNtMGvICsryk20wa8gKyvDbec7-EduSOvLTuRykpqm2qIIDN_6cclJkccc8usy8H&_nc_ohc=m0Nl0jUaRUcAX8j_S_d&_nc_ht=scontent.fcgy1-1.fna&oh=2515d319b2e53ceb82dccadb9f14261c&oe=5F4B5BA1",
        "category": "Others",
        "category_id": 3,
        "remaining": 4,
        "price_per_item": 100
    },
    {
        "id": 32,
        "name": "Soap",
        "url": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F949587%2Fpexels-photo-949587.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D500&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbackground%2F&tbnid=kbn8tJPNTRmy2M&vet=12ahUKEwi-5LLZ5PfqAhUN3pQKHUZnAbIQMygCegUIARDWAQ..i&docid=_pUPWoKZqMHalM&w=500&h=333&q=images&ved=2ahUKEwi-5LLZ5PfqAhUN3pQKHUZnAbIQMygCegUIARDWAQ",
        "category": "Cosmetics",
        "category_id": 2,
        "remaining": 4,
        "price_per_item": 200
    }
    ],
    productForm: {
        id: 999,
        name: "",
        url: "",
        category: "",
        product_type_id: 999,
        product_types: [],
    },
    inventory: [],
    loading: {
        fetchAll: false,
        fetchInventory: false
    }
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PRODUCT_FORM:
            return resetProductForm(state, action.payload);
        case SET_PRODUCT:
            return setProduct(state, action.payload);
        case SET_PRODUCTS:
            return setProducts(state, action.payload);
        case SET_PRODUCT_TYPES:
            return setProductTypes(state, action.payload);
        case UPDATE_PRODUCT_FORM_FIELD:
            return updateProductFormField(state, action.payload);
        case FETCH_ALL_PRODUCTS_LOADING:
            return setFetchAllProductsLoading(state, action.payload);
        case SET_PRODUCT_INVENTORY:
            return setProductInventory(state, action.payload);
        case SET_FETCH_PRODUCT_INVENTORY_LOADING:
            return setFetchProductInventoryLoading(state, action.payload);

        case SET_INVENTORY_ITEM_BREAKDOWN:
            return setInventoryItemBreakdown(state, action.payload);
        default: {
            return state;
        }
    }
};

const setInventoryItemBreakdown = (state, payload) => {
    return {
        ...state,
        inventoryItemBreakdown: payload,
    };
}

const setProductTypes = (state, payload) => {
    return {
        ...state,
        productForm: {
            ...state.productForm,
            product_types: payload
        }
    };
};

const setProduct = (state, payload) => {
    return {
        ...state,
        productForm: {
            ...state.productForm,
            ...payload
        }
    };
};

const setProductInventory = (state, payload) => {

    return {
        ...state,
        inventory: payload
    }
}

const setProducts = (state, payload) => {
    return {
        ...state,
        products: payload
    };
};

const updateProductFormField = (state, payload) => {
    return {...state, productForm: {...state.productForm, [payload.field]: payload.value}};
};

const resetProductForm = (state, payload) => {
    return {
        ...state,
        productForm: {
            ...state.productForm,
            id: 999,
            name: "",
            url: "",
            category: "",
            category_id: 999,
        }
    };
};


const setFetchAllProductsLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            fetchAll: payload,
        }
    };
}

const setFetchProductInventoryLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            fetchInventory: payload,
        }
    };
}

export default Reducer;
