$(document).ready(function (e) {
	$("#forgot-btn").on("click", function (e) {
		e.preventDefault();
		var email = $.trim($("#email").val());
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var errCnt = 0;
		if (email == "" || email == null) {
			$("#errEmail").html("Please enter your email id");
			$("#errEmail").fadeIn().fadeIn();
			errCnt++;
		} else if (!emailReg.test(email)) {
			$("#errEmail").html("Please enter valid email id");
			$("#errEmail").fadeIn().fadeIn();
			errCnt++;
		} else {
			$("#errEmail").hide();
		}
		if (errCnt > 0) return false;
		else {
			var formData = $('form').serialize();
			forgotPassword(formData);
		}
	});
});
function forgotPassword(formData) {
	$.ajax({
		url: "http://xyz.com/webServices/forgotPassword.php",
		type: "POST",
		dataType: "json",
		data: formData,
		crossDomain: true,
		cache: false,
		beforeSend: function () {
			$("#forgot-btn").val('Processing...');
			$.LoadingOverlay("show");
		},
		success: function (data) {
			$("#forgot-form")[0].reset();
			if (data.status === "success") {
				var userpassword = JSON.stringify(data);
				for (var i = 0; i < data.message.length; ++i) {
					swal({
						title: "Your Password",
						text: data.message,
						type: "success",
						confirmButtonText: "OK"
					});
				}
			} else if (data.status === "error") {
				for (var i = 0; i < data.message.length; ++i) {
					swal({
						title: "Error",
						text: data.message,
						type: "error",
						confirmButtonText: "OK"
					});
				}
			}
		},
		error: function (jqXHR, exception) {
			getErrorMessage(jqXHR, exception);
			$("#forgot-btn").val("Send");
			$("#forgot-form")[0].reset();
		}, complete: function () {
			$.LoadingOverlay("hide");
			$("#forgot-btn").val("Send");
			$("#forgot-form")[0].reset();
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