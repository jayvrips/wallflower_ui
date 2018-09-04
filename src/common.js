import $ from "jquery";

function ajaxCall(method, path, data, success, error) {
    let url = "http://localhost:8000" + path

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

export function fetchUsers(dispatch, users) {
    if (Object.keys(users).length !== 0)
        return;
    ajaxGet("/users",
        function(data) {
            dispatch({type: 'UPDATE_USERS', payload: data});
        },
        function(xhr, textStatus, errorThrown) {
            console.log("ERROR!!!!");
        }
    );
  }

export function fetchProfiles(dispatch, profiles) {
      if (Object.keys(profiles).length !== 0)
          return;
      ajaxGet("/profiles",
          function(data) {
              dispatch({type: 'UPDATE_PROFILES', payload: data});
          },
          function(xhr, textStatus, errorThrown) {
              console.log("ERROR!!!!");
          }
      );
  }
