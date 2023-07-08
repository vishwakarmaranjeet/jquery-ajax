$(document).ready(function(e){
    var string = JSON.parse(localStorage.getItem("user_details"));
    if (string === null || string.length === 0 || string.length === "undefined"){
	}else {
        for (i = 0; i < string.userdetails.length; ++i) {
            var email = $.trim($("#email").val(string.userdetails[i].Email));
        }
    }
    $("#submit-btn").on("click", function(e) {
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
        } else if((isNaN(contact)) || contact == "") {
            $("#contactErr").html("Please enter valid contact no.");
            $("#contactErr").fadeIn().fadeIn();
            errCnt++;
        } else if (mob < 6){
            $("#contactErr").html("Please enter more than 6 digits");
            $("#contactErr").fadeIn().fadeIn();
            errCnt++;
        } else {
            $("#contactErr").hide();
        }
        if (message == "" || message == null){
            $("#msgErr").html("Please write your comments or any suggestions");
            $("#msgErr").fadeIn().fadeIn();
            errCnt++;
        } else {
            $("#msgErr").hide();
        }
        if ($('input[name=rating]:checked').length <= 0){
            $("#ratingErr").html("Please review us");
            $("#ratingErr").fadeIn().fadeIn();
            errCnt++;
        } else {
            $("#ratingErr").hide();
        }
        if (errCnt > 0) return false;
        else {
            var formData = $('form').serialize();
            submitFeedback(formData);
        }
    });
});
function submitFeedback(formData) {
    $.ajax({
        url: "http://xyz.com/webServices/feedBack.php",
        type: "POST",
        dataType: "json",
        crossDomain: true,
        cache: false,
        data: formData,
        beforeSend: function() {
            $("#submit-btn").val("Processing...");
            $.LoadingOverlay("show");
        },
        success: function() {
            swal({
                title: "Feedback",
                text: "Thank you for giving us your valuable feedback. Your feedback will help us in improving our services and help you server better in future.",
                type: "success",
                confirmButtonText: "OK"
            });
            $("#feedback-form")[0].reset();
            $("#submit-btn").val('submit');
        },
        error: function(jqXHR, exception) {
            getErrorMessage(jqXHR, exception);
            $("#feedback-form")[0].reset();
			$("#submit-btn").val('submit');
        },
        complete: function() {
            $.LoadingOverlay("hide");
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
