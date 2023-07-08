$(document).ready(function (e) {
	$("#eventSucess").hide();
	$('#eventError').hide();
	$.ajax({
		url: "http://xyz.com/webServices/upcomingEvent.php",
		type: "POST",
		dataType: "json",
		crossDomain: true,
		cache: false,
		beforeSend: function () {
			$("#eventSucess").hide();
		},
		success: function (eventDetails) {
			if (eventDetails.status === "success") {
				var output = "<div class='col s12'>";
				for (var i = 0; i < eventDetails.events.length; ++i) {
					var eventdate = new Date(eventDetails.events[i].EventDate);
					var eventdateformat = (eventdate.getDate() + '/' + (eventdate.getMonth() + 1) + '/' + eventdate.getFullYear());
					output += "<div style='background:#f4f4f4;'>";
					output += "<div class='eventdetails'>";
					if (eventDetails.events[i].EventName) {
						output += "<h5>" + eventDetails.events[i].EventName + "</h5>";
					}
					output += "<div class='divider'></div>";
					output += "<ul>";
					if (eventDetails.events[i].EventPlace) {
						output += "<li><p><strong><i class='fa fa-map-marker'></i> Venue : </strong>" + eventDetails.events[i].EventPlace + '</>';
					}
					if (eventDetails.events[i].EventDate) {
						output += "<li><p><strong><i class='fa fa-calendar'></i> Date : </strong>" + eventdateformat + "</>";
					}
					if (eventDetails.events[i].Description) {
						output += "<li><p>" + eventDetails.events[i].Description + '</>';
					}
					if (eventDetails.events[i].EventName) {
						output += "<li><a href='http://xyz.com/upcoming-events' id='eventbooking' class='btn'>Book Event</a></>";
					}
					output += "</ul>";
					output += "</div>";
					output += "</div>";
				}
				$("#eventSucess").fadeIn();
				$("#eventSucess").html(output);
				$("#eventbooking").on('click', function (e) {
					e.preventDefault();
					var weburl = $(this).attr('href');
					var ref = cordova.InAppBrowser.open(encodeURI(weburl), '_system', 'location=yes');
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
				output = "</div>";
			} else if (eventDetails.status === "error") {
				$("#eventError").fadeIn();
				$("#eventSucess").fadeOut();
			} else {
				$("#eventError").fadeIn();
				$("#eventError").css("display", "block");
				$("#eventSucess").fadeOut();
			}
		}, error: function (jqXHR, exception) {
			getErrorMessage(jqXHR, exception);
		},
	});
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