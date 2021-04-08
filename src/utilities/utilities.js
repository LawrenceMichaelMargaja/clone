export const getQueryParams = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const convertedParams = {};

    params.forEach((val, key) => {
        convertedParams[key] = val;
    });

    return convertedParams;
};

export const serialize = function (obj) {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
};


export const objectChecker = (object, objectProperties, customFailResult, acceptNull) => {

    if (typeof object !== 'undefined') {

        for (let i = 0; i < objectProperties.length; i++) {


            if (acceptNull === false) {
                if (object === null) {
                    object = true;
                    break;
                }
            }


            if (typeof object !== "object" || object === null) {
                object = false;
                break;
            }
            
            if (!(objectProperties[i] in object)) {
                object = false;
                break;
            } else {
                object = object[objectProperties[i]];
            }
        }
    }

    if (object === false && customFailResult) {
        return customFailResult;
    }

    return object;
};


export const validJSON = (text) => {
    // Guard against null
    if (!text) {
        return false
    }

    if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        return true;
    } else {
        return false;
    }
};

export const hasNoAPIErrors = (object, acceptNull = false) => {
    if (typeof object === "object") {
        return objectChecker(object, ['data', 'data', 'errors'], false, acceptNull) === false;
    }

    if (object === true) {
        return true;
    }
};

export const getAdminId = () => {
    const adminId = JSON.parse(localStorage.getItem("userDetails"))['id'];

    return parseFloat(adminId);
};


export const currency = amount => {
    return (new Intl.NumberFormat('en-PH', {
          style: 'currency',
          currency: 'PHP',
          minimumFractionDigits: 2
        })).format(amount || 0);
}
