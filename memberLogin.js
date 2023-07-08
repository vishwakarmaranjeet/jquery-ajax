$(document).ready(function (e) {
    $("#login-btn").on("click", function (e) {
        e.preventDefault();
        var email = $.trim($("#email").val());
        var password = $.trim($("#password").val());
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var errCnt = 0;
        if (email == "" || email == null) {
            $("#errEmail").html("Please enter your email address.");
            $("#errEmail").fadeIn().fadeIn();
            errCnt++;
        } else if (!emailReg.test(email)) {
            $("#errEmail").html("Please enter valid email address.");
            $("#errEmail").fadeIn().fadeIn();
            errCnt++;
        } else {
            $("#errEmail").hide();
        }
        if (password == "" || password == null) {
            $("#errPassword").html("Please enter your password");
            $("#errPassword").fadeIn().fadeIn();
            errCnt++;
        } else {
            $("#errPassword").hide();
        }
        if (errCnt > 0) return false;
        else {
            var formData = $('form').serialize();
            memberLogin(formData);
        }
    });
});
// member login function
function memberLogin(formData) {
    $.ajax({
        url: "http://xyz.com/webServices/memberLogin.php",
        type: "POST",
        dataType: "json",
        crossDomain: true,
        data: formData,
        cache: false,
        beforeSend: function () {
            $("#login-btn").val('Processing...');
        },
        success: function (data) {
            if (data.status === "success") {
                localStorage.setItem("user_details", JSON.stringify(data));
                location.href = "dashboard.html";
                $("#login-btn").val("Login");
            } else if (data.status === "error") {
                swal({
                    title: "Invalid",
                    text: 'Invalid Login Credentials',
                    type: "error",
                    confirmButtonText: "OK"
                });
                $("#login-btn").val("Login");
            }
        }, error: function (jqXHR, exception) {
            getErrorMessage(jqXHR, exception);
        }, complete: function () {
            $("#login-btn").val("Login");
        }
    });
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