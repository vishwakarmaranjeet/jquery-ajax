$(document).ready(function (e) {
	var categoryID = getUrlVars()["categoryId"];
	$("#space-available").hide();
	$.ajax({
		url: "http://xyz.com/webServices/getJustClickCategoryBanner.php",
		type: "GET",
		dataType: "json",
		data: "category_id=" + categoryID,
		crossDomain: true,
		success: function (data) {
			if (data.status === "success") {
				var output = "";
				for (var i = 0; i < data.banners.length; ++i) {
					var url = data.banners[i].Url;
					var imageUrl = data.banners[i].Image;
					output += "<div class='swiper-slide'>";
					output += "<a class='brandbannerLinks' href=http://" + url + " target=_blank><img onerror='categoryimageError(this)' src=http://xyz.com/app-category-banner/" + imageUrl + "></></a>";
					output += "</div>";
				}
				$(".swiper-wrapper").html(output);
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					autoplay: 4000
				});
				$(".brandbannerLinks").on('click', function (e) {
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
				$("#space-available").hide();
			} else if (data.status === "noimage") {
				$("#space-available").show();

			} else if (data.status === "error") {
				Materialize.toast("Soemthing went wrong try again later", 6000);
			}
		}
	});
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
function categoryimageError(element) {
	element.onerror = "";
	element.src = "images/category-noimage.png";
}

