$(document).ready(function (e) {
	$.ajax({
		url: "http://xyz.com/webServices/getJustClickHomeSlider.php",
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
					output += "<a class='justclickbannerLinks' href=http://" + url + " target=_blank><img onerror='imgErr(this)' src=http://xyz.com/app-homepage-slider-advt/" + imageUrl + "></></a>";
					output += "</div>";
				}
				$(".swiper-wrapper").html(output);
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					autoplay: 4000
				});
				$(".justclickbannerLinks").on('click', function (e) {
					e.preventDefault();
					var weburl = $(this).attr('href');
					cordova.InAppBrowser.open(encodeURI(weburl), '_blank', 'location=no');
					return false;
				});
			} else if (data.status === "error") {
				Materialize.toast('Something went wrong try again later', 6000);
			}
		}
	});
});
function imgErr(element) {
	element.onerror = "";
	element.src = "images/category-noimage.png";
}


