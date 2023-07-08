$(document).ready(function (e) {
    var string = JSON.parse(localStorage.getItem("user_details"));
    if (string === null || string.length === 0 || string.length === "undefined") {
    } else {
        for (i = 0; i < string.userdetails.length; ++i) {
            var email = $.trim($("#email").val(string.userdetails[i].Email));
            var cname = $.trim($("#cname").val(string.userdetails[i].CompanyName));
        }
    }
    var categoryID = getUrlVars()["categoryId"];
    var brandID = getUrlVars()["brandId"];
    var c_id = getUrlVars()["cId"];
    var brandtop = $("#brandTop");
    $(brandtop).html("<i class='fa fa-arrow-left'></i>");
    $(brandtop).attr("href", "companylisting.html?categoryId=" + categoryID + "&brandId=" + brandID + "");
    getCategoryBrandName();
    function getCategoryBrandName() {
        $.ajax({
            url: "http://xyz.com/webServices/getJustClickCompanybyID.php",
            type: "GET",
            data: "c_id=" + c_id,
            dataType: "json",
            crossDomain: true,
            success: function (data) {
                if (data.status === "success") {
                    var output = "";
                    for (var i = 0; i < data.company.length; ++i) {
                        output += "<h5 class='listing-heading'>" + data.company[i].CompanyName + "</h5>";
                        var mobilesms = $.trim($("#mobilesms").val(data.company[i].Mobile));
                        var receipt = $.trim($("#receipt").val(data.company[i].Email));
                    }
                    $("#cbname").html(output);
                }
            },
        });
    }
    $("#submit-btn").on("click", function (e) {
        e.preventDefault();
        var name = $.trim($("#name").val());
        var email = $.trim($("#email").val());
        var contact = $.trim($("#contact").val());
        var message = $.trim($("#message").val());
        var mob = contact.length;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var errCnt = 0;
        if (name == "" || name == null) {
            $("#nameErr").html("Please enter your name");
            $("#nameErr").fadeIn().fadeIn();
            errCnt++;
        } else {
            $("#nameErr").hide();
        }
        if (email == "" || email == null) {
            $("#emailErr").html("Please enter your email address");
            $("#emailErr").fadeIn().fadeIn();
            errCnt++;
        } else if (!emailReg.test(email)) {
            $("#emailErr").html("Please enter valid email address");
            $("#emailErr").fadeIn().fadeIn();
            errCnt++;
        } else {
            $("#emailErr").hide();
        }
        if (contact == "" || contact == null) {
            $("#contactErr").html("Please enter your contact no.");
            $("#contactErr").fadeIn().fadeIn();
            errCnt++;
        } else if ((isNaN(contact)) || contact == "") {
            $("#contactErr").html("Please enter valid contact no.");
            $("#contactErr").fadeIn().fadeIn();
            errCnt++;
        } else if (mob < 6) {
            $("#contactErr").html("Please enter more than 6 digits");
            $("#contactErr").fadeIn().fadeIn();
            errCnt++;
        } else {
            $("#contactErr").hide();
        }
        if (message == "" || message == null) {
            $("#msgErr").html("Please provide your requirements");
            $("#msgErr").fadeIn().fadeIn();
            errCnt++;
        } else {
            $("#msgErr").hide();
        }
        if (errCnt > 0) {
            return false;
        }
        else {
            var formData = $("form").serialize();
            submitFeedback(formData);
        }
    });
});
function submitFeedback(formData) {
    $.ajax({
        url: "http://xyz.com/webServices/getJustClickEnquiry.php",
        type: "POST",
        crossDomain: true,
        cache: false,
        dataType: "json",
        data: formData,
        beforeSend: function () {
            $("#submit-btn").val('Processing...');
            $.LoadingOverlay("show");
        },
        success: function (data) {
            if (data.status === "success") {
                swal({
                    title: "Thank you",
                    text: "Thank you for submitting your business enquiry. We will get back to you very soon. Please came back and see us often.",
                    type: "success",
                    confirmButtonText: "OK"
                });
                $("#feedback-form")[0].reset();
                $("#submit-btn").val("submit");
            }
        },
        error: function (jqXHR, exception) {
            getErrorMessage(jqXHR, exception);
            $("#feedback-form")[0].reset();
        },
        complete: function () {
            $.LoadingOverlay("hide");
            $("#feedback-form")[0].reset();
            $("#submit-btn").val("submit");
        }
    });
}
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
function imageErr(element) {
    element.onerror = "";
    element.src = "images/picture.png";
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