$(document).ready(function (e) {
    $.ajax({
        url: "http://xyz.com/webServices/getCategory.php",
        type: "GET",
        data: "category",
        dataType: "json",
        crossDomain: true,
        beforeSend: function () {
            $.LoadingOverlay("show");
        },
        success: function (data) {
            if (data.status === "success") {
                var output = "";
                output += "<ul>";
                for (var i = 0; i < data.category.length; ++i) {
                    output += "<li><span><a href='brand.html?categoryId=" + data.category[i].CategoryID + "'>" + data.category[i].CategoryName + "</a></span></li>";
                }
                output += "</ul>";
                $("#categoryList").html(output);
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
});
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