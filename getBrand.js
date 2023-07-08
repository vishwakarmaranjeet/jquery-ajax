$(document).ready(function (e) {
    var categoryID = getUrlVars()["categoryId"];
    getCategorybyID();
    $.ajax({
        url: "http://xyz.com/webServices/getCategoryBrand.php",
        type: "GET",
        data: "category_id=" + categoryID,
        dataType: "json",
        crossDomain: true,
        beforeSend: function () {
            $.LoadingOverlay("show");
        },
        success: function (data) {
            if (data.status === "success") {
                var output = "";
                output += "<ul>";
                for (var i = 0; i < data.brand.length; ++i) {
                    if (data.brand[i].BrandName) {
                        output += "<li><span><a href='companylisting.html?brandId=" + data.brand[i].BrandID + "&categoryId=" + categoryID + "'>" + data.brand[i].BrandName + "</a></span></li>";
                    }
                }
                output += "</ul>";
                $("#categoryList").html(output);
                if (data.brand === "0") {
                    var html = "";
                    html += "<p class='center'>No Records Found</p>";
                }
                $("#notfound").html(html);
            } else if (data.status === "error") {
                Materialize.toast('Something went wrong try again later', 6000);
            }
        },
        complete: function () {
            $.LoadingOverlay("hide");
        }
    });

    function getCategorybyID() {
        $.ajax({
            url: "http://xyz.com/webServices/getCategorybyID.php",
            type: "GET",
            data: "category_id=" + categoryID,
            dataType: "json",
            crossDomain: true,
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (data) {
                if (data.status === "success") {
                    var output = "";
                    for (var i = 0; i < data.category.length; ++i) {
                        output += "<p>" + data.category[i].CategoryName + "</p>";
                    }
                    $("#categoryname").html(output);
                } else if (data.status === "error") {
                    Materialize.toast('Something went wrong try again later', 6000);
                }
            }, error: function (jqXHR, exception) {
                getErrorMessage(jqXHR, exception);
            },
            complete: function () {
                $.LoadingOverlay("hide");
            }
        });
    }
});
// getting value from url 
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
// This function is used to get error message for all ajax calls
function getErrorMessage(jqXHR, exception) {
    var $toastContent = "";
    if (jqXHR.status === 0) {
        $toastContent = "Not connect.\n Verify Network.";
    } else if (jqXHR.status == 404) {
        $toastContent = "Requested page not found. [404]";
    } else if (jqXHR.status == 500) {
        $toastContent = "Internal Server Error [500].";
    } else if (exception === "parsererror") {
        $toastContent = "Requested JSON parse failed.";
    } else if (exception === "timeout") {
        $toastContent = "Time out error.";
    } else if (exception === "abort") {
        $toastContent = "Request aborted.";
    } else {
        $toastContent = "Uncaught Error.\n" + jqXHR.responseText;
    }
    Materialize.toast($toastContent, 6000);
}