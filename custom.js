$(document).ready(function(e){
	$(".button-collapse").sideNav({
		  menuWidth: 300, //Default is 240   
		  edge: 'left', //Choose the horizontal origin
		  closeOnClick: true //Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
	$('.collapsible').collapsible();
	var string = JSON.parse(localStorage.getItem("user_details"));   
	if(typeof string !== 'undefined' && string !== null){  
		for(i=0; i < string.userdetails.length; ++i){
			$(".my-profile").append("<a href='dashboard.html'>"+string.userdetails[i].Username+"</a>");
		}
		$(".logout").css("display", "block");
		$("#my-profile").css("display", "block"); 
		$("#defaulters-link").css("display", "block");
		$("#change-password-link").css("display", "block");
		$("#my-profile-home").css("display", "block");
		$("#defaulter-search").css("display", "block");
		$("#member-login-link").css("display", "none");
		$("#became-a-member").css("display", "none");
		$("#member-login-home").css("display", "none");
	}else{  
		$(".logout").css("display", "none");
		$(".nav-top-div").css("padding-bottom", "2em"); 
		$("#member-login-link").css("display", "block");
		$("#member-login-home").css("display", "block");
		$("#became-a-member").css("display", "block");
		$("#defaulters-link").css("display", "none");
		$("#change-password-link").css("display", "none"); 
		$("#defaulter-search").css("display", "none");
		$("#my-profile-home").css("display", "none");
		$("#my-profile").css("display", "none");
	}
});
function userLogout() {
	localStorage.removeItem("user_details"); 
} 
$("#user-logout").on("click", function(){
	userLogout();
	location.href="member-login.html"; 
});  
function imageError(element){
	element.onerror="";
	element.src="images/no-profile.png";
}
function holidays(){
	var ref = cordova.InAppBrowser.open("http://xyz.com/holidays", "_blank", "location=no");
}
function circular(){
	var ref = cordova.InAppBrowser.open("http://xyz.com/circular.php", "_blank", "location=no");
}
