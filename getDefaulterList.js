$(document).ready(function (e) {
    var string = JSON.parse(localStorage.getItem("user_details"));
    if (string === null || string.length === 0 || string.length === "undefined") {
        location.href = "index.html";
    } else {
        defaulterList();
    }
    function defaulterList() {
        $.ajax({
            url: "http://xyz.com/webServices/getDefaulterList.php",
            type: "GET",
            data: "defaulterList",
            dataType: "json",
            crossDomain: true,
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (data) {
                if (data.status === "success") {
                    var output = "";
                    for (var i = 0; i < data.defaulter.length; ++i) {
                        output += "<ul class='card'>";
                        if (data.defaulter[i].CompanyName) {
                            output += "<li><h5>" + data.defaulter[i].CompanyName + "</h5></li>";
                        }
                        if (data.defaulter[i].PersonName) {
                            output += "<li><strong>Person Name</strong>" + data.defaulter[i].PersonName + "</li>";
                        }
                        if (data.defaulter[i].Broker) {
                            output += "<li><strong>Broker</strong>" + data.defaulter[i].Broker + "</li>";
                        }
                        if (data.defaulter[i].Code) {
                            output += "<li><strong>Code</strong>" + data.defaulter[i].Code + "</li>";
                        }
                        if (data.defaulter[i].Address) {
                            output += "<li><strong>Address</strong>" + data.defaulter[i].Address + "</li>";
                        }
                        if (data.defaulter[i].City) {
                            output += "<li><strong>City</strong>" + data.defaulter[i].City + "</li>";
                        }
                        if (data.defaulter[i].TelNo) {
                            output += "<li><strong>Tel No.</strong><a href=tel:" + data.defaulter[i].TelNo + " style='color:#333;'>" + data.defaulter[i].TelNo + "</a></li>";
                        }
                        if (data.defaulter[i].MobileNo) {
                            output += "<li><strong>Mobile No.</strong><a href=tel:" + data.defaulter[i].MobileNo + " style='color:#333;'>" + data.defaulter[i].MobileNo + "</a></li>";
                        }
                        if (data.defaulter[i].TinNo) {
                            output += "<li><strong>TIN No.</strong>" + data.defaulter[i].TinNo + "</li>";
                        }
                        if (data.defaulter[i].UCode) {
                            output += "<li><strong>UCode</strong>" + data.defaulter[i].UCode + "</li>";
                        }
                        output += "</ul>";
                    }
                }

                $(".deafulterView").html(output);
                $.LoadingOverlay("hide");
            },
            error: function (jqXHR, exception) {
                getErrorMessage(jqXHR, exception);
            }
        });
    }
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