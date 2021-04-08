import {
    SET_ACCEPTANCE_PERCENTAGES,
    SET_LINE_CHART,
    SET_LINE_CHART_TOTAL_SALES,
    SET_PIE_CHART
} from "../actions/actionTypes";

export const initialState = {
    pieChart: [],
    lineChart: [],
    lineChartMonthToDateSales: [],
    acceptancePercentages: [],
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LINE_CHART:
            return setLineChart(state, action.payload);
        case SET_LINE_CHART_TOTAL_SALES:
            return setlineChartMonthToDateSales(state, action.payload);
        case SET_PIE_CHART:
            return setPieChart(state, action.payload);
        case SET_ACCEPTANCE_PERCENTAGES:
            return setAcceptancePercentages(state, action.payload);
        default:
            return state
    }
}

const setAcceptancePercentages = (state, payload) => {
    return {
        ...state,
        acceptancePercentages: payload,
    }
}

const setlineChartMonthToDateSales = (state, payload) => {
    return {
        ...state,
        lineChartMonthToDateSales: payload,
    }
}

const setLineChart = (state, payload) => {
    return {
        ...state,
        lineChart: payload,
    }
}

const setPieChart = (state, payload) => {
    return {
        ...state,
        pieChart: payload,
    }
}

export default Reducer;
