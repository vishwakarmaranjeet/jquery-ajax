$(document).ready(function (e) {
	$.ajax({
		url: "http://xyz.com/webServices/getFancybox.php",
		type: "GET",
		data: "fancybox=" + "fancybox",
		dataType: "json",
		crossDomain: true,
		success: function (data) {
			if (data.status === "success") {
				var output = "";
				for (var i = 0; i < data.fancybox.length; ++i) {
					if (data.fancybox[i].Status === "1") {
						var image = data.fancybox[i].Image;
						output += "<img src='http://xyz.com/fancybox/" + image + "' class='img-responsive'>";
						setTimeout(function () {
							$.fancybox({
								fitToView: true, // images won't be scaled to fit to browser's height
								autoScale: true,
								maxWidth: "100%",
								autoScale: true,
								content: $("#alert"),
								beforeShow: function () {
									$(".fancybox-skin").css("padding", "0");
								},
								helpers: {
									overlay: { closeClick: false }
								}
							});
						}, 2000)
					}
				}
				$("#alert").html(output);
			}
		}
	});
});