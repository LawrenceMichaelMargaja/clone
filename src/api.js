import axios from "./axios_custom";
import {serialize} from "./utilities/utilities";

const postData   = async (url, obj)  => await axios.post(url, typeof obj === "undefined" ? {} : obj);
const putData    = async (url, obj)  => await axios.put(url, typeof obj === "undefined" ? {} : obj);
const getData    = async (url, obj)  => await axios.get(url + ((typeof obj !== "undefined") ? `?${serialize(obj)}` : '').toString() );
const getOne     = async (url, id)   => await axios.get(url + `${id}`);
const deleteData = async (url, obj)  => await axios.delete(url, typeof obj === "undefined"  ? {} : {data: obj});

const Analytics = () => {

    const baseUrl = 'analytics';

    return {
        lineChart : (obj)                    => getData(baseUrl + '/line-chart', obj),
        lineChartMonthToDateSales : (obj)    => getData(baseUrl + '/line-chart-total-sales', obj),
        pieChart : (obj)                     => getData(baseUrl + '/pie-chart', obj),
        acceptancePercentages : (obj)        => getData(baseUrl + '/acceptance-percentages', obj),
    }
}


const User = () => {

    const baseUrl = 'user';

    return {
        login : (obj)                        => postData(baseUrl + '/login', obj),
        fetchAll : (obj)                     => getData(baseUrl + '/', obj),
        fetchOne : (id)                      => getOne(baseUrl + '/', id),
        fetchAllBankTypes: (obj)             => getData(baseUrl + '/bank-types', obj),
        fetchAllRegions: (obj)               => getData(baseUrl + '/regions', obj),
        fetchAllUserTypes: (obj)             => getData(baseUrl + '/user-types', obj),
        fetchAllUsersByType: (obj)           => getData(baseUrl + '/user-type/' + obj, {}),
        add    : (obj)                       => postData(baseUrl + '/', obj),
        delete   : (obj)                     => deleteData(baseUrl + '/', obj),
        put   : (obj)                        => putData(baseUrl + '/', obj),
        refreshUserData: (obj)               => getData(baseUrl + '/refresh-data', obj),
    }
};

const Product = () => {

    const baseUrl = 'product';

    return {
        fetchAll : (obj)                     => getData(baseUrl + '/', obj),
        fetchOne : (id)                      => getOne(baseUrl + '/', id),
        put   : (obj)                        => putData(baseUrl + '/', obj),
        add : (obj)                          => postData(baseUrl + '/', obj),
        delete   : (obj)                     => deleteData(baseUrl + '/', obj),
        fetchAllTypes : (obj)                => getData(baseUrl + '/types', obj),
        fetchInventory: (obj)                => getData(baseUrl + '/inventory', obj),
        fetchSellers : (obj)                 => getData(baseUrl + '/seller-list', obj),
        inventoryItemBreakdown : (obj)       => getData(baseUrl + '/inventory-item-breakdown', obj),
    }
};

const CoinTransaction = () => {

    const baseUrl = 'coin-transaction';

    return {
        fetchAll : (obj)                     => getData(baseUrl + '/', obj),
    }
};

const Coin = () => {

    const baseUrl = 'coin';

    return {
        fetchAll : (obj)                     => getData(baseUrl + '/', obj),
    }
};

const Transaction = () => {

    const baseUrl = 'transaction';

    return {
        fetchAll : (obj)                     => getData(baseUrl + '/', obj),
        add : (obj)                          => postData(baseUrl + '/', obj),
        delete : (obj)                       => deleteData(baseUrl + '/', obj),
    }
};

const Order = () => {

    const baseUrl = 'order';

    return {
        fetchAll : (obj)                   => getData(baseUrl + '/', obj),
        create : (obj)                     => postData(baseUrl + '/', obj),
        details: (id)                      => getOne(baseUrl + '/', id),
        // update: (id)                    => putData(baseUrl + '/', id),
        update: (obj)                      => putData(baseUrl +'/', obj),
    }
};

const Delivery = () => {

    const baseUrl = 'delivery';

    return {
        myStore : (obj)                     => getData(baseUrl + '/my-store', obj),
        transactions : (obj)                => getData(baseUrl + '/transactions', obj),
        coinTransactions : (obj)            => getData(baseUrl + '/coin-transactions', obj),
        coinTransactions2 : (obj)            => getData(baseUrl + '/coin-transactions2', obj),
        makeAnOrder: (obj)                  => postData(baseUrl + '/order-package', obj),
        makeNonPackageOrder: (obj)          => postData(baseUrl + '/order-parcel', obj),
        details: (id)                       => getOne(baseUrl+'/', id),
        updateDeliveryStatus: (obj)         => putData(baseUrl+'/', obj),
        serviceFee: (obj)                   => getData(baseUrl+'/service-fee', obj)
    }
};

const Withdrawal = () => {

    const baseUrl = 'withdrawal';

    return {
        getAll: (obj)                       => getData(baseUrl + '/', obj),
        create: (obj)                       => postData(baseUrl + '/', obj),
        update: (obj)                       => putData(baseUrl + '/', obj),
    }
};

const API = () => ({
    User,
    Product,
    Coin,
    CoinTransaction,
    Transaction,
    Order,
    Delivery,
    Withdrawal,
    Analytics
});

export default API;
