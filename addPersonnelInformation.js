$(document).ready(function () {
	var string = JSON.parse(localStorage.getItem("user_details"));
	if (string === null || string.length === 0 || string.length === 'undefined') {
		location.href = "member-login.html";
	} else {
		for (var i = 0; i < string.user.length; ++i) {
			var cid = $.trim($("#cid").val(string.user[i].CompanyID));
		}
	}
	$('#form-data').submit(function () {
		if (!validateForm()) {
			return false;
		}
		return true;
	});

	//ajax request for designation
	$.ajax({
		type: "POST",
		url: 'http://xyz.com/app/ws/getDesignation.php',
		dataType: 'json',
		success: function (data) {
			var output;
			for (var i = 0; i < data.designation.length; i++) {
				output += "<option value='" + data.designation[i].Designation + "'>" + data.designation[i].Designation + "</option>";
			}
			$("#designation").html(output);
			$('select').material_select();
		}
	});
	//ajax request for marital status
	$.ajax({
		type: "POST",
		url: 'http://xyz.com/app/ws/getMaritalStatus.php',
		dataType: 'json',
		success: function (data) {
			var output;
			for (var i = 0; i < data.maritalstatus.length; i++) {
				output += "<option value='" + data.maritalstatus[i].MaritalStatus + "'>" + data.maritalstatus[i].MaritalStatus + "</option>";
			}
			$("#maritalstatus").html(output);
			$('select').material_select();
		}
	});

	// pick date	  
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 300 // Creates a dropdown of 15 years to control year
	});
});
// onclick log out
$("#logout").on('click', function () {
	clear_me();
	location.href = "member-login.html";
});
function clear_me() {
	localStorage.clear();
}
function imageError(element) {
	element.onerror = '';
	element.src = 'images/no-profile.png';
}

function validateForm() {
	var personname = $.trim($("#personname").val());
	var errCnt = 0;
	if (personname == "" || personname == null) {
		$("#personname").css('border-bottom', '1px solid #f44336');
		$("#errpersonname").html("Please enter person name");
		$("#errpersonname").fadeIn().fadeIn();
		errCnt++;
	} else {
		$("#errpersonname").hide();
		$("#personname").css('border-bottom', '1px solid #4caf50');
	}
	if (errCnt > 0) return false;
	else {
		$.ajax({
			url: "http://xyz.com/app/ws/addPersonnelInformation.php",
			type: 'POST',
			dataType: 'json',
			crossDomain: true,
			cache: false,
			data: $('form').serialize(),
			beforeSend: function () {
				$("#update-btn").val('Connecting...');
				$.LoadingOverlay("show");
			},
			success: function (response) {
				$("#update-btn").val('Add');
				$("#form-data")[0].reset();
				if (response.status == "success") {
					swal({
						title: 'Personnel Information',
						text: 'Personnel information added successfully',
						type: "success",
						confirmButtonText: "OK"
					});
				} else if (response.status == "error") {
					swal({
						title: 'Personnel Information',
						text: 'Something went wrong try again later.',
						type: "error",
						confirmButtonText: "OK"
					});
				} else if (response.status == "exits") {
					swal({
						title: 'Personnel Information',
						text: 'This record already exits',
						type: "error",
						confirmButtonText: "OK"
					});
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$("#update-btn").val('Add');
				if (jqXHR.status == 0) {
					alert("Please make sure that you are connected to the internet");
				} else {
					alert("We are unable to process your request, please try again later");
				}
				//$("#login-form")[0].reset();  
			}, complete: function () {
				$.LoadingOverlay("hide");
			}
		});
	}
}