$(document).ready(function () {
	var string = JSON.parse(localStorage.getItem("user_details"));
	if (string === null || string.length === 0 || string.length === "undefined") {
		location.href = "index.html";
	} else {
		for (var i = 0; i < string.userdetails.length; ++i) {
			var companyID = string.userdetails[i].CompanyID;
		}
		getCompanyDetails();
	}
	// get company details
	function getCompanyDetails() {
		$.ajax({
			url: "http://xyz.com/webServices/getCompanyDetails.php",
			type: "GET",
			data: "cid=" + companyID,
			dataType: "json",
			crossDomain: true,
			cache: false,
			beforeSend: function () {
				$.LoadingOverlay("show");
			},
			success: function (details) {
				if (details.status === "success") {
					for (var i = 0; i < details.companydetails.length; ++i) {
						var cid = $.trim($("#cid").val(details.companydetails[i].CompanyID));
						var description = $.trim($("#description").val(details.companydetails[i].BusinessDescription));
						var address = $.trim($("#address").val(details.companydetails[i].Address));
						var city = $.trim($("#city").val(details.companydetails[i].City));
						if (details.companydetails[i].EstablishmentYear === "1970-01-01") {
							var establishment = $.trim($("#establishment").val());
						} else {
							var date = new Date(details.companydetails[i].EstablishmentYear);
							var establishment = (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear());
							var establishment = $.trim($("#establishment").val(establishment));
						}
						if (details.companydetails[i].EnrollmentDate === "1970-01-01") {
							var enrollment = $.trim($("#enrollment").val());
						} else {
							var edate = new Date(details.companydetails[i].EnrollmentDate);
							var enrollment = (edate.getDate() + '-' + (edate.getMonth() + 1) + '-' + edate.getFullYear());
							var enrollment = $.trim($("#enrollment").val(enrollment));
						}
						var pinno = $.trim($("#pinno").val(details.companydetails[i].PinNo));
						var email = $.trim($("#email").val(details.companydetails[i].Email));
						var email2 = $.trim($("#email2").val(details.companydetails[i].Email2));
						var mobileno = $.trim($("#mobileno").val(details.companydetails[i].MobileNo));
						var officeno = $.trim($("#officeno").val(details.companydetails[i].TelNo));
						var officeno2 = $.trim($("#officeno2").val(details.companydetails[i].TelNo2));
						var officeno3 = $.trim($("#officeno3").val(details.companydetails[i].TelNo3));
						var residenceno = $.trim($("#residenceno").val(details.companydetails[i].ResidenceNo));
						var faxno = $.trim($("#faxno").val(details.companydetails[i].FaxNo));
						var intercom = $.trim($("#intercom").val(details.companydetails[i].Intercom));
						var website = $.trim($("#website").val(details.companydetails[i].Website));
						var panno = $.trim($("#panno").val(details.companydetails[i].PanNo));
						var cinno = $.trim($("#cinno").val(details.companydetails[i].CinNo));
						var vatno = $.trim($("#tinno").val(details.companydetails[i].TinNo));
						var cstno = $.trim($("#cstno").val(details.companydetails[i].CstNo));
						var exciseno = $.trim($("#exciseno").val(details.companydetails[i].ExciseNo));
						var exportimportno = $.trim($("#exportimportno").val(details.companydetails[i].ExportImportNo));
						var lbtno = $.trim($("#lbtno").val(details.companydetails[i].LbtNo));
						var gstno = $.trim($("#gstno").val(details.companydetails[i].GstNo));
					}
				} else if (details.status === "error") {
					Materialize.toast('Something went wrong try again later', 6000);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$("#update-btn").val("Update");
			},
			complete: function () {
				$.LoadingOverlay("hide");
			}
		});
	}
	$("#update-btn").on("click", function (e) {
		e.preventDefault();
		var formData = $("form").serialize();
		updateCompanyDetails(formData);
	});
	$("#address").html($("#address").html().trim());
	$("#description").html($("#description").html().trim());
});
function updateCompanyDetails(formData) {
	$.ajax({
		url: "http://xyz.com/webServices/updateCompanyDetails.php",
		type: "POST",
		dataType: "json",
		crossDomain: true,
		cache: false,
		data: formData,
		beforeSend: function () {
			$.LoadingOverlay("show");
			$("#update-btn").val("Processing...");
		},
		success: function (data) {
			$("#update-btn").val('Update');
			if (data.status === "success") {
				swal({
					title: 'Company Profile',
					text: 'Company profile has been updated successfully.',
					type: "success",
					confirmButtonText: "OK"
				});
			} else if (data.status === "error") {
				swal({
					title: 'Company Profile',
					text: 'No changes made to company profile.',
					type: "success",
					confirmButtonText: "OK"
				});
			}
		},
		error: function (jqXHR, exception) {
			getErrorMessage(jqXHR, exception);
			$("#update-btn").val('Update');
		}, complete: function () {
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