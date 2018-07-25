import $ from "jquery";

function ajaxCall(method, path, data, success, error) {
    let url = "http://192.168.136.3:8000" + path

    let params =
    {
        method: method,
        success: success,
        error: error,
        crossDomain: true
    }

    if (data) {
        params["contentType"] = "application/json; charset=utf-8";
        params["dataType"] = "json";
        params["data"] = JSON.stringify(data);
    }

    $.ajax(url, params);
}

export function ajaxGet(path, success, error) {
    ajaxCall("GET", path, null, success, error);
}

export function ajaxPost(path, data, success, error) {
    ajaxCall("POST", path, data, success, error);
}

export function ajaxPut(path, data, success, error) {
    ajaxCall("PUT", path, data, success, error);
}        


