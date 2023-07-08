$(document).ready(function (e) {
    var string = JSON.parse(localStorage.getItem("user_details"));
    if (string === null || string.length === 0 || string.length === "undefined") {
        location.href = "index.html";
    } else {
        var MIN_LENGTH = 1;
        $("#defaulter-search").bind("submit", function (e) {
            e.preventDefault();
            var text = $.trim($("#keyword").val());
            var errCnt = 0;
            if (text === "" || text === null) {
                $("#searchErr").html("Please enter your search query");
                $("#searchErr").fadeIn().fadeIn();
                errCnt++;
            } else {
                $("#searchErr").hide();
            }
            if (errCnt > 0) {
                return false;
            }
            defaulterSearch(text);
        });
        $("#keyword").keyup(function () {
            var keyword = $("#keyword").val();
            if (keyword.length >= MIN_LENGTH) {
                $.get("http://xyz.com/webServices/autoCompleteDefaulter.php", {
                    keyword: keyword
                })
                    .done(function (data) {
                        $("#results").html("");
                        var results = $.parseJSON(data);
                        $(results).each(function (key, value) {
                            $("#results").append("<div class='item'>" + value + "</div>");
                        });
                        $(".item").on("click", function () {
                            var text = $(this).html();
                            text = text.replace("&amp;", "&");
                            $("#keyword").val(text);
                            defaulterSearch(text);
                            $("#searchErr").hide();
                        });
                    });
            } else {
                $("#results").html("");
            }
        });
    }
    $("#keyword").blur(function () {
        $("#results").fadeOut(200);
    })
        .focus(function () {
            $("#results").show();
        });
    function defaulterSearch(text) {
        $.ajax({
            url: "http://xyz.com/webServices/defaulterSearch.php",
            type: "GET",
            data: "keyword=" + text,
            dataType: "json",
            crossDomain: true,
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (data) {
                if (data.status === "success") {
                    var output = "";
                    for (var i = 0; i < data.defaulter.length; ++i) {
                        output += "<div class='row'>";
                        output += "<ul class='defaulterSearch'>";
                        if (data.defaulter[i].CompanyName) {
                            output += "<li><h5><i class='fa fa-building-o' aria-hidden='true'></i>" + data.defaulter[i].CompanyName + "</h5></li>";
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
                    }
                    output += "</ul>";
                    output += "</div>";
                    $("#defaulterResult").fadeIn();
                    $("#defaulterResult").html(output);
                    $("#errorResults").hide();
                    $.LoadingOverlay("hide");
                } else if (data.status === "error") {
                    $("#errorResults").fadeIn();
                    $("#errorResults").css("display", "block");
                    $("#defaulterResult").hide();
                    $.LoadingOverlay("hide");
                }
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