import $ from "jquery";

function ajaxCall(method, path, data, success, error) {
    let url = "http://192.168.43.129:8000" + path
    $.ajax(url,
        {
            method: method,
            success: success,
            error: error,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data),
            crossDomain: true
        }
    );
}

export function ajaxPost(path, data, success, error) {
    ajaxCall("POST", path, data, success, error);
}

export function ajaxPut(path, data, success, error) {
    ajaxCall("PUT", path, data, success, error);
}        


