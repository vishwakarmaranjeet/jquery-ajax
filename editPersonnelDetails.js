$(document).ready(function () {
	var string = JSON.parse(localStorage.getItem("user_details"));
	if (string === null || string.length === 0 || string.length === "undefined") {
		location.href = "index.html";
	} else {
		var pid = getUrlVars()["pid"];
		getPersonnelDetails();
	}
	getBloodGroup();
	getMaritalStatus();

	$("#update-btn").on("click", function (e) {
		e.preventDefault();
		var formData = $("form").serialize();
		updatePersonnelDetails(formData);
	});

	function getPersonnelDetails() {
		$.ajax({
			url: "http://xyz.com/webServices/getProprietorDetails.php",
			type: "GET",
			data: "pid=" + pid,
			dataType: "json",
			crossDomain: true,
			beforeSend: function () {
				$.LoadingOverlay("show");
			},
			success: function (data) {
				if (data.status === "success") {
					for (var i = 0; i < data.details.length; ++i) {
						var pid = $.trim($("#pid").val(data.details[i].PersonnelID));
						var personname = $.trim($("#personname").val(data.details[i].PersonName));
						var designation = $.trim($("#designation").val(data.details[i].Designation));
						if (data.details[i].DOB === "1970-01-01") {
							var dob = $.trim($("#dob").val());
						} else {
							var date = new Date(data.details[i].DOB);
							var dateofbirth = (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear());
							var dob = $.trim($("#dob").val(dateofbirth));
						}
						var caste = $.trim($("#caste").val(data.details[i].Caste));
						var email = $.trim($("#email").val(data.details[i].Email));
						var mobileno = $.trim($("#mobileno").val(data.details[i].MobileNo));
						var residenceno = $.trim($("#residenceno").val(data.details[i].ResidenceNo));
						var panno = $.trim($("#panno").val(data.details[i].PanNo));
						var aadharno = $.trim($("#aadharno").val(data.details[i].AadharNo));
					}
				} else if (data.status === "error") {
					swal({
						title: "Error",
						text: 'Something went wrong...',
						type: "error",
						confirmButtonText: "OK"
					});
				}
			},
			complete: function () {
				$.LoadingOverlay("hide");
			},
			error: function (jqXHR, exception) {
				getErrorMessage(jqXHR, exception);
			}
		});
	}

});
function updatePersonnelDetails(formData) {
	$.ajax({
		url: "http://xyz.com/webServices/updatePersonnelDetails.php",
		type: "POST",
		dataType: "json",
		crossDomain: true,
		cache: false,
		data: formData,
		beforeSend: function () {
			$("#update-btn").val("Processing...");
			$.LoadingOverlay("show");
		},
		success: function (response) {
			$("#update-btn").val("Update");
			if (response.status == "success") {
				swal({
					title: 'Personnel Details',
					text: 'Personnel details has been updated successfully',
					type: "success",
					confirmButtonText: "OK"
				});
			} else if (response.status == "error") {
				swal({
					title: 'Personnel Details',
					text: 'No Changes made to personnel details',
					type: "success",
					confirmButtonText: "OK"
				});
			}
		},
		error: function (jqXHR, exception) {
			getErrorMessage(jqXHR, exception);
			$("#update-btn").val("Update");
		},
		complete: function () {
			$.LoadingOverlay("hide");
		}
	});
}
// blood group
function getBloodGroup() {
	$.ajax({
		type: "POST",
		url: "http://xyz.com/webServices/getBloodGroup.php",
		dataType: "json",
		success: function (data) {
			var output;
			for (var i = 0; i < data.bloodgroup.length; i++) {
				output += "<option value='" + data.bloodgroup[i].BloodGroup + "'>" + data.bloodgroup[i].BloodGroup + "</option>";
			}
			$("#bloodgroup").html(output);
			$("select").material_select();
		}
	});
}
// get marital status
function getMaritalStatus() {
	$.ajax({
		type: "POST",
		url: "http://xyz.com/webServices/getMaritalStatus.php",
		dataType: "json",
		success: function (data) {
			var output;
			for (var i = 0; i < data.maritalstatus.length; i++) {
				output += "<option value='" + data.maritalstatus[i].MaritalStatus + "'>" + data.maritalstatus[i].MaritalStatus + "</option>";
			}
			$("#maritalstatus").html(output);
			$("select").material_select();
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