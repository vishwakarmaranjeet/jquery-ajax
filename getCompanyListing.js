$(document).ready(function (e) {
	var categoryID = getUrlVars()["categoryId"];
	var brandID = getUrlVars()["brandId"];
	var brandtop = $("#brandTop");
	$(brandtop).html("<i class='fa fa-arrow-left'></i>");
	$(brandtop).attr("href", "brand.html?categoryId=" + categoryID + "");
	var dataString = "category=" + categoryID + "&brand=" + brandID;
	getCategoryBrandName();
	companyListing();
	function companyListing() {
		$.ajax({
			url: "http://xyz.com/webServices/getCompanyListings.php",
			type: "GET",
			data: dataString,
			dataType: "json",
			crossDomain: true,
			beforeSend: function () {
				$.LoadingOverlay("show");
			},
			success: function (data) {
				if (data.status === "success") {
					var output = "";
					for (var i = 0; i < data.listings.length; ++i) {
						var url = data.listings[i].Website;
						output += "<div class='row' style='margin-top:-12px;'>";
						output += "<div class='col s12'>";
						output += "<div class='card'>";
						if (data.listings[i].ProfileImage) {
							output += "<div class='listingpage'><a href='http://xyz.com/adminmodule/justclick_company_profile/" + data.listings[i].ProfileImage + "' class='fancybox' title='" + data.listings[i].CompanyName + "'><img id='listing-profile-img' src='http://xyz.com/adminmodule/justclick_company_profile/" + data.listings[i].ProfileImage + "'></a><div class='center' style='margin-top:10px; position:relative;'><a href='http://xyz.com/adminmodule/justclick_company_profile/" + data.listings[i].ProfileImage + "' class='fancybox' title='" + data.listings[i].CompanyName + "' style='color:#333; font-weight:600; font-size:13px; text-transform: uppercase;'><i class='fa fa-arrows-alt'></i> Enlarge View</a></div></div>";
						} else {
							output += "<div class='listingpage'><img id='listing-profile-img' src='images/picture.png'></a></div>";
						}
						output += "<div class='card-content'>";
						if (data.listings[i].MembershipType === "1") {
							if (data.listings[i].CompanyName) {
								output += "<div class='center'><div class='col s12'><img src='images/like.png'></div></div>";
								output += "<span class='card-title listing-heading'>" + data.listings[i].CompanyName + "</span>";
							}
						} else {
							output += "<span class='card-title listing-heading'>" + data.listings[i].CompanyName + "</span>";
						}
						output += "<div class='listings-details'>"
						output += "<ul>"
						if (data.listings[i].Proprietor) {
							output += "<li><span style='font-weight:500;'>" + data.listings[i].Proprietor + "</span></li>";
						}
						if (data.listings[i].ContactNo) {
							output += "<li><span><a href='tel:" + data.listings[i].ContactNo + "' class='color-black'>" + data.listings[i].ContactNo + "</a></span></li>";
						}
						if (data.listings[i].ContactNo2) {
							output += "<li><span><a href='tel:" + data.listings[i].ContactNo2 + "' class='color-black'>" + data.listings[i].ContactNo2 + "</a></span></li>";
						}
						if (data.listings[i].Mobile) {
							output += "<li><span><a href='tel:" + data.listings[i].Mobile + "' class='color-black'>" + data.listings[i].Mobile + "</a></span></li>";
						}
						if (data.listings[i].Email) {
							output += "<li><span><a href='mailto:" + data.listings[i].Email + "' class='color-black'>" + data.listings[i].Email + "</a></span></li>";
						}
						if (data.listings[i].Address) {
							output += "<li><span>" + data.listings[i].Address + "<span></li>";
						}
						if (data.listings[i].City) {
							output += "<li><span>" + data.listings[i].City + " - " + data.listings[i].PinCode + "<span></li>";
						}
						if (data.listings[i].Website) {
							output += "<li><span><a class='websiteLinks' href=http://" + url + " style='color:#333;'>" + data.listings[i].Website + "</a></span></li>";
						}
						if (data.listings[i].BusinessDescription) {
							output += "<li><span>" + data.listings[i].BusinessDescription + "</span></li>";
						}
						output += "</ul>";
						output += "</div>";
						output += "</div>";
						output += "<div class='clearfix'></div>";
						if (data.listings[i].MembershipType === "1") {
							output += "<div class='card-action'>";
							if (data.listings[i].Pricelist) {
								output += "<div class='row'>";
								output += "<a class='pdflink btn col s12 m12' href='http://www.xyz.com/pricelist/" + data.listings[i].Pricelist + "' style='background:#29c8bd;'>Download Pricelist <i class='fa fa-cloud-download'></i></a>";
								output += "</div>";
							}
							output += "<div class='row'>";
							output += "<a href='online-enquiry.html?cId=" + data.listings[i].CompanyID + "&brandId=" + brandID + "&categoryId=" + categoryID + "' class='btn col s12 m12' style='background:#2cb8f5;'>send enquiry</a>";
							if (data.listings[i].ContactNo) {
								output += "<a href='tel:" + data.listings[i].ContactNo + "' class='btn col s12' style='margin-top:10px; background:#fc7467;'><i class='fa fa-phone'></i> CALL NOW</a>";
							}
							output += "</div>";
							output += "</div>";
						}
						output += "</div>";
						output += "</div>";
						output += "</div>";
					}
					if (data.listings === "0") {
						var html = "";
						html += "<p class='center'>No Records Found</p>";
						$("#notfound").html(html);
						$("#companyListing").hide();
					}
					$("#companyListing").html(output);
					$(".websiteLinks").on('click', function (e) {
						e.preventDefault();
						var weburl = $(this).attr('href');
						var ref = cordova.InAppBrowser.open(encodeURI(weburl), '_blank', 'location=no');
						ref.addEventListener('loadstart', inAppBrowserbLoadStart);
						ref.addEventListener('loadstop', inAppBrowserbLoadStop);
						ref.addEventListener('loaderror', inAppBrowserbLoadError);
						function inAppBrowserbLoadStart(event) {
							navigator.notification.activityStart("Please Wait", "It'll only take a moment...");
						}
						function inAppBrowserbLoadStop(event) {
							navigator.notification.activityStop();
						}
						function inAppBrowserbLoadError(event) {
							navigator.notification.activityStop();
						}
						return false;
					});
					$(".pdflink").on('click', function (e) {
						e.preventDefault();
						var weburl = $(this).attr('href');
						cordova.InAppBrowser.open(weburl, '_system', 'location=no');
						return false;
					});
				} else if (data.status === "error") {
					Materialize.toast('Something went wrong try again later', 6000);
				}
			}, error: function (jqXHR, exception) {
				getErrorMessage(jqXHR, exception);
			},
			complete: function () {
				$.LoadingOverlay("hide");
			}
		});
	}
	function getCategoryBrandName() {
		$.ajax({
			url: "http://xyz.com/webServices/getCategoryBrandName.php",
			type: "GET",
			data: dataString,
			dataType: "json",
			crossDomain: true,
			success: function (data) {
				if (data.status == "success") {
					var output = "";
					for (var i = 0; i < data.cbname.length; ++i) {
						output += "<p>" + data.cbname[i].CategoryName + "</p>";
						output += "<p>" + data.cbname[i].BrandName + "</p>";
					}
					$("#categorybrandname").html(output);
				}
			},
		});
	}
});
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