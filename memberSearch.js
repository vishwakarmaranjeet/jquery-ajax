$(document).ready(function (e) {
	var string = JSON.parse(localStorage.getItem("user_details"));
	var MIN_LENGTH = 3;
	$("#member-search").bind("submit", function (e) {
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
		memberSearch(text);
	});
	$("#keyword").keyup(function () {
		var keyword = $("#keyword").val();
		if (keyword.length >= MIN_LENGTH) {
			$.get("http://xyz.com/webServices/autoCompleteMember.php", {
				keyword: keyword
			})
				.done(function (data) {
					$("#results").html("");
					var results = $.parseJSON(data);
					$(results).each(function (key, value) {
						$("#results").append("<div class='item'>" + value + "</div>");
					})
					$(".item").on("click", function () {
						var text = $(this).html();
						text = text.replace("&amp;", "&");
						$("#keyword").val(text);
						memberSearch(text);
					});
					$("#searchErr").hide();
				});
		} else {
			$("#results").html("");
		}
	});
	function memberSearch(text) {
		$.ajax({
			url: "http://xyz.com/webServices/memberSearch.php",
			type: "GET",
			dataType: "json",
			crossDomain: true,
			cache: false,
			data: "keyword=" + text,
			beforeSend: function () {
				$.LoadingOverlay("show");
			},
			success: function (memberdetails) {
				var output = "";
				if (memberdetails.status === "success") {
					for (var i = 0; i < memberdetails.members.length; ++i) {
						var c_id = memberdetails.members[i].CompanyID;
						$.ajax({
							url: "http://xyz.com/webServices/getPersonnelDetailsbyId.php",
							type: "GET",
							dataType: "json",
							crossDomain: true,
							cache: false,
							data: "cid=" + c_id,
							success: function (details) {
								var html = "";
								for (var i = 0; i < details.persondetails.length; ++i) {
									html += "" + details.persondetails[i].PersonName;
								}
								$(".personneldetails").html(html);
							}
						});
						output += "<div class='row'>";
						output += "<div class='col s12'>";
						output += "<div class='companyPicDiv center'>";
						if (memberdetails.members[i].ProfileImage) {
							output += "<a href=http://xyz.com/company_profile_pic/" + memberdetails.members[i].ProfileImage + " class='fancybox'><img  onerror='imageErr(this)' src='http://xyz.com/company_profile_pic/" + memberdetails.members[i].ProfileImage + "'></a>";

						} else {
							output += "<img onerror='imageErr(this)' src='http://xyz.com/app/images/no-image-found.jpg'>";
						}
						output += "<h5>" + memberdetails.members[i].CompanyName + "</h5>";
						if (string !== null && string !== 0 && string !== "undefined") {
							var name = memberdetails.members[i].CompanyName;
							localStorage.setItem('companyname', name);
							output += "<a href='company-personnel-information.html?cid=" + memberdetails.members[i].CompanyID + "' class='waves-effect waves-light btn'>MORE DETAILS</a>";
						}
						output += "</div>";
						output += "<ul class='memberSearchDetails'>";
						if (memberdetails.members[i].MembershipType) {
							output += "<li><img src='images/sm-icons/like.png' class='smsearchIcon'><span>" + memberdetails.members[i].MembershipType + " Member</span></li>";
						}
						output += "<li><img src='images/sm-icons/avatar.png' class='smsearchIcon'><span class='personneldetails' style='font-weight:700;'></span></li>";
						if (memberdetails.members[i].MobileNo) {
							output += "<li><img src='images/sm-icons/mobile.png' class='smsearchIcon'><span><a href='tel:" + memberdetails.members[i].MobileNo + "' class='color-black'>" + memberdetails.members[i].MobileNo + "</a></span></li>";
						}
						if (memberdetails.members[i].TelNo) {
							output += "<li><img src='images/sm-icons/telephone.png' class='smsearchIcon'><span><a href='tel:" + memberdetails.members[i].TelNo + "' class='color-black'>" + memberdetails.members[i].TelNo + "</a></span></li>";
						}
						if (string !== null && string !== 0 && string !== "undefined") {
							if (memberdetails.members[i].TelNo2) {
								output += "<li><img src='images/sm-icons/telephone.png' class='smsearchIcon'><a href='tel:" + memberdetails.members[i].TelNo2 + "' class='color-black'>&nbsp;" + memberdetails.members[i].TelNo2 + "</a></span></li>";
							}
							if (memberdetails.members[i].TelNo3) {
								output += "<li><img src='images/sm-icons/telephone.png' class='smsearchIcon'><span><a href='tel:" + memberdetails.members[i].TelNo3 + "' class='color-black'>" + memberdetails.members[i].TelNo3 + "</a></span></li>";
							}
						}
						if (memberdetails.members[i].Email) {
							output += "<li><img src='images/sm-icons/mail.png' class='smsearchIcon'><span><a href='mailto:" + memberdetails.members[i].Email + "' class='color-black'>" + memberdetails.members[i].Email + "</a></span></li>";
						}
						if (string !== null && string !== 0 && string !== "undefined") {
							if (memberdetails.members[i].Email2) {
								output += "<li><img src='images/sm-icons/mail.png' class='smsearchIcon'><span><a href='mailto:" + memberdetails.members[i].Email2 + "' class='color-black'>" + memberdetails.members[i].Email2 + "</a></span></li>";
							}
						}
						if (memberdetails.members[i].FaxNo) {
							output += "<li><img src='images/sm-icons/fax-machine.png' class='smsearchIcon'><span><a class='color-black'>" + memberdetails.members[i].FaxNo + "</a></span></li>";
						}
						if (memberdetails.members[i].Address) {
							output += "<li><img src='images/sm-icons/map.png' class='smsearchIcon'> <span>" + memberdetails.members[i].Address + " - " + memberdetails.members[i].PinNo + "</span></li>";
						}
						if (memberdetails.members[i].City) {
							output += "<li><img src='images/sm-icons/city.png' class='smsearchIcon'> <span>" + memberdetails.members[i].City + "</span></li>";
						}
						if (memberdetails.members[i].State) {
							output += "<li><img src='images/sm-icons/state.png' class='smsearchIcon'> <span>" + memberdetails.members[i].State + "</span></li>";
						}
						if (memberdetails.members[i].BusinessDescription) {
							output += "<li><img src='images/sm-icons/note.png' class='smsearchIcon'><span>" + memberdetails.members[i].BusinessDescription + "</span></li>";
						}
						if (memberdetails.members[i].Website) {
							output += "<li><img src='images/sm-icons/internet.png' class='smsearchIcon'><span><a class='membersearchWebsite' href='http://" + memberdetails.members[i].Website + "' style='color:#333;'> " + memberdetails.members[i].Website + " </a></span></li>";
						}
						if (string !== null && string !== 0 && string !== "undefined") {
							var establishment = new Date(memberdetails.members[i].EstablishmentYear);
							var establishmentyear = (establishment.getDate() + '/' + (establishment.getMonth() + 1) + '/' + establishment.getFullYear());
							var enroll = new Date(memberdetails.members[i].EnrollmentDate);
							var enrollmentdate = (enroll.getDate() + '/' + (enroll.getMonth() + 1) + '/' + enroll.getFullYear());
							output += "<li><h5>OTHER DETAILS</h5></li>";
							if (memberdetails.members[i].CompanyType) {
								output += "<li><strong> Constitution </strong>" + memberdetails.members[i].CompanyType + "</li>";
							}
							if (memberdetails.members[i].MembershipNo) {
								output += "<li><strong>Membership No. </strong>" + memberdetails.members[i].MembershipNo + "</li>";
							}
							if (memberdetails.members[i].EstablishmentYear === "1970-01-01") {
								output += "<li><strong> Establishment Year </strong>N/A</li>";
							} else {
								output += "<li><strong> Establishment Year </strong>" + establishmentyear + "</li>";
							}
							if (memberdetails.members[i].EnrollmentDate === "1970-01-01") {
								output += "<li><strong> Enrollment Date</strong>N/A</li>";
							} else {
								output += "<li><strong> Enrollment Date</strong>" + enrollmentdate + "</li>";
							}
							if (memberdetails.members[i].PanNo) {
								output += "<li><strong> PAN No. </strong>" + memberdetails.members[i].PanNo + "</li>";
							}
							if (memberdetails.members[i].TinNo) {
								output += "<li><strong> TIN No. </strong>" + memberdetails.members[i].TinNo + "</li>";
							}
							if (memberdetails.members[i].CinNo) {
								output += "<li><strong> CIN No. </strong>" + memberdetails.members[i].CinNo + "</li>";
							}
							if (memberdetails.members[i].CstNo) {
								output += "<li><strong> CST No. </strong>" + memberdetails.members[i].CstNo + "</li>";
							}
							if (memberdetails.members[i].ExciseNo) {
								output += "<li><strong> Excise No. </strong>" + memberdetails.members[i].ExciseNo + "</li>";
							}
							if (memberdetails.members[i].ExportImportNo) {
								output += "<li><strong> Export Import No. </strong>" + memberdetails.members[i].ExportImportNo + "</li>";
							}
							if (memberdetails.members[i].LbtNo) {
								output += "<li><strong> LBT No. </strong>" + memberdetails.members[i].LbtNo + "</li>";
							}
							if (memberdetails.members[i].GstNo) {
								output += "<li><strong> GST No. </strong>" + memberdetails.members[i].GstNo + "</li>";
							}
							output += "</div>";
						}
						output += "</ul>";
						output += "</div>";
						output += "</div>";
					}
					$("#searchResults").fadeIn();
					$("#searchResults").html(output);
					$("#errorResults").hide();
					$.LoadingOverlay("hide");
					$(".membersearchWebsite").on('click', function (e) {
						e.preventDefault();
						var weburl = $(this).attr('href');
						cordova.InAppBrowser.open(encodeURI(weburl), '_blank', 'location=no');
						return false;
					});
				} else if (memberdetails.status === "error") {
					$("#searchResults").hide();
					$("#errorResults").css("display", "block");
					$("#errorResults").fadeIn();
					$.LoadingOverlay("hide");
				}
			},
			error: function (jqXHR, exception) {
				getErrorMessage(jqXHR, exception);
			},
			complete: function () {
				$.LoadingOverlay("hide");
			}
		});
	}
	$("#keyword").blur(function () {
		$("#results").fadeOut(200);
	})
		.focus(function () {
			$("#results").show();
		});
});
function editProfile() {
	var string = JSON.parse(localStorage.getItem("user_details"));
	if (string === null || string.length === 0 || string.length === "undefined") {
		location.href = "member-login.html";
	} else {
		location.href = "dashboard.html";
	}
}
function imageErr(element) {
	element.onerror = "";
	element.src = "images/company-image.png";
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