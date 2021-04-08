import API from "../../api";
import {hasNoAPIErrors} from "../../utilities";
import {SET_ACCEPTANCE_PERCENTAGES, SET_LINE_CHART, SET_LINE_CHART_TOTAL_SALES, SET_PIE_CHART} from "./actionTypes";

export const setlineChartMonthToDateSales = data => {
    return {
        type: SET_LINE_CHART_TOTAL_SALES,
        payload: data,
    }
}

export const setLineChart = data => {
    return {
        type: SET_LINE_CHART,
        payload: data,
    }
}

export const setPieChart = data => {
    return {
        type: SET_PIE_CHART,
        payload: data,
    }
}

export const setAcceptancePercentages = data => {
    return {
        type: SET_ACCEPTANCE_PERCENTAGES,
        payload: data,
    }
}

export const fetchlineChartMonthToDateSales = () => {
    return async dispatch => {
        try {
            const result = await API().Analytics().lineChartMonthToDateSales()

            if (hasNoAPIErrors(result)) {
                dispatch(setlineChartMonthToDateSales(result.data.data))
            }

        } catch (e) {
            console.log('Line Chart Error', e);
        }
    };
};

export const fetchLineChart = (
    startDate,
    endDate,
    userId,
) => {
    return async dispatch => {
        try {
            const result = await API().Analytics().lineChart({
                start_date: startDate,
                end_date: endDate,
                user_id: userId,
            })

            if (hasNoAPIErrors(result)) {
                dispatch(setLineChart(result.data.data))
            }

        } catch (e) {
            console.log('Line Chart Error', e);
        }
    };
};

export const fetchPieChart = (
    startDate,
    endDate,
    userId,
) => {
    return async dispatch => {
        try {
            const result = await API().Analytics().pieChart({
                start_date: startDate,
                end_date: endDate,
                user_id: userId,
            })

            if (hasNoAPIErrors(result)) {
                dispatch(setPieChart(result.data.data))
            }

        } catch (e) {
            console.log('Pie Chart Error', e);
        }
    };
};

export const fetchAcceptancePercentages = (
    startDate,
    endDate,
    userId,
) => {
    return async dispatch => {
        try {
            const result = await API().Analytics().acceptancePercentages({
                start_date: startDate,
                end_date: endDate,
                user_id: userId,
            })

            if (hasNoAPIErrors(result)) {
                dispatch(setAcceptancePercentages(result.data.data))
            }

        } catch (e) {
            console.log('Pie Chart Error', e);
        }
    };
};
