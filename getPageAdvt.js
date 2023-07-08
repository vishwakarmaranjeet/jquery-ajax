$(document).ready(function (e) {
	$.ajax({
		url: "http://xyz.com/webServices/getPageAdvt.php",
		type: "GET",
		data: "pageAdvt",
		dataType: "json",
		crossDomain: true,
		success: function (data) {
			if (data.status === "success") {
				var output = "";
				for (var i = 0; i < data.advt.length; ++i) {
					var url = data.advt[i].Url;
					var imageUrl = data.advt[i].Image;
					output += "<li><a class='bottombannerLinks' href='http://" + url + "' target='_blank'><img src=http://xyz.com/app-advt-images/" + imageUrl + "></a></li>";
				}
				$(".bxslider").html(output);
				$(".bottombannerLinks").on('click', function (e) {
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
				$(".bxslider").bxSlider({
					auto: true,
					adaptiveHeight: true,
					pager: false,
					controls: false,
					onSliderLoad: function () {
						$(".bxslider").css("visibility", "visible");
					}
				});

			} else if (data.status === "error") {
				Materialize.toast('Something went wrong try again later', 6000);
			}
		},
	});
});
