import $ from "jquery";

export function ajaxPut(url, data, success, error){
   
	 $.ajax(url,
                {
                    method: "PUT",
                    success: success,
                    error: error,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(data),
                    crossDomain: true
                }
         ) 
}        


