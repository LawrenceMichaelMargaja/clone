export const initialState = {
    sellerTiles: {
        orders: 0,
        accepted: 0,
        transit: 0,
        delivered: 0,
    },
    dropshipperTiles: {
        pending: 0,
        accepted: 0,
        fulfilled: 0
    },
    sellerSales: 0,
    dropshipperDelivered: 0
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};

export default Reducer;
