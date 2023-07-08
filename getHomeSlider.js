$(document).ready(function (e) {
	$.ajax({
		url: "http://xyz.com/webServices/getHomeSlider.php",
		type: "GET",
		dataType: "json",
		crossDomain: true,
		success: function (data) {
			if (data.status === "success") {
				var output = "";
				for (var i = 0; i < data.banners.length; ++i) {
					var url = data.banners[i].Url;
					var imageUrl = data.banners[i].Image;
					output += "<div class='swiper-slide'>";
					output += "<a class='homebannerLinks' href=http://" + url + " target=_blank><img onerror='imageError(this)' src=http://xyz.com/app-homepage-slider-advt/" + imageUrl + "></></a>";
					output += "</div>";
				}
				$(".swiper-wrapper").html(output);
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					autoplay: 4000
				});
				$(".homebannerLinks").on('click', function (e) {
					e.preventDefault();
					var weburl = $(this).attr('href');
					var ref = cordova.InAppBrowser.open(encodeURI(weburl), '_blank', 'location=no');
					return false;
				});
			} else if (data.status === "error") {
				swal({
					title: "Error",
					text: 'Something went wrong try again later',
					type: "error",
					confirmButtonText: "OK"
				});
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


