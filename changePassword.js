$(document).ready(function () {
    var string = JSON.parse(localStorage.getItem("user_details"));
    if (string === null || string.length === 0 || string.length === "undefined") {
        location.href = "index.html";
    } else {
        for (var i = 0; i < string.userdetails.length; ++i) {
            var cid = $.trim($("#cid").val(string.userdetails[i].CompanyID));
        }
    }
    $("#changepassword-btn").on("click", function (e) {
        e.preventDefault();
        var newpassword = $.trim($("#newpassword").val());
        var confirmpassword = $.trim($("#confirmpassword").val());
        var errCnt = 0;
        if (newpassword == "" || newpassword == null) {
            $("#errNewpassword").html("Please enter your new password");
            $("#errNewpassword").fadeIn().fadeIn();
            errCnt++;
        } else {
            $("#errNewpassword").hide();
        }
        if (confirmpassword == "" || confirmpassword == null) {
            $("#errCpassword").html("Please enter your confirm password");
            $("#errCpassword").fadeIn().fadeIn();
            errCnt++;
        } else if (newpassword != confirmpassword) {
            $("#errMpassword").html("Your password did not match");
            $("#errCpassword").hide();
            errCnt++;
        } else {
            $("#errMpassword").hide();
            $("#errCpassword").hide();
        }
        if (errCnt > 0) {
            return false;
        }
        else {
            var formData = $("form").serialize();
            changeUserPassword(formData);
        }
    });
    function changeUserPassword(formData) {
        $.ajax({
            url: "http://xyz.com/webServices/changePassword.php",
            type: "POST",
            dataType: "json",
            crossDomain: true,
            cache: false,
            data: formData,
            beforeSend: function () {
                $.LoadingOverlay("show");
                $("#changepassword-btn").val("Processing...");
            },
            success: function (data) {
                if (data.status === "success") {
                    swal({
                        title: 'Change Password',
                        text: 'Your password has been changed successfully',
                        type: "success",
                        confirmButtonText: "OK"
                    });
                    $("#change-password")[0].reset();
                    $("#changepassword-btn").val('Change password');
                } else if (data.status === "password") {
                    swal({
                        title: 'Change Password',
                        text: 'Your password same as previous password.',
                        type: "success",
                        confirmButtonText: "OK"
                    });
                    $("#change-password")[0].reset();
                    $("#changepassword-btn").val('Change password');
                }
                else if (data.status === "error") {
                    Materialize.toast('Something went wrong try again later', 6000);
                    $("#change-password")[0].reset();
                    $("#changepassword-btn").val('Change password');
                }
            },
            complete: function () {
                $.LoadingOverlay("hide");
                $("#changepassword-btn").val('Change password');
            },
            error: function (jqXHR, exception) {
                getErrorMessage(jqXHR, exception);
                $("#changepassword-btn").val('Change password');
                $("#change-password")[0].reset();
            },

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