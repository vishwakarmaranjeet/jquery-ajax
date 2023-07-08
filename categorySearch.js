$(document).ready(function (e) {
	$("#keyword").keyup(function () {
		var search_input = $(this).val();
		var dataString = 'keyword=' + search_input;
		if (search_input.length <= 0) {
			$("#searchresultdata").hide();
			$("#notfound").hide();
			$("#categoryList").show();
		} else {
			$.ajax({
				type: "POST",
				url: "http://xyz.com/webServices/autoCompleteCategory.php",
				data: dataString,
				dataType: "json",
				crossDomain: true,
				success: function (response) {
					if (response.status === "success") {
						var output = "";
						output += "<ul>";
						for (var i = 0; i < response.category.length; ++i) {
							output += "<li><a href='brand.html?categoryId=" + response.category[i].CategoryID + "'>" + response.category[i].CategoryName + "</a></li>";
						}
						output += "</ul>";
						$("#searchresultdata").show();
						$("#notfound").hide();
						$("#categoryList").hide();
						$("#searchresultdata").html(output);

					} else if (response.status === "error") {
						$("#notfound").html("No Results found");
						$("#notfound").show();
						$("#searchresultdata").hide();
					}
				}
			});
		}
	});
});