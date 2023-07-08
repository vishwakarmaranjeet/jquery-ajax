$(document).ready(function(e) {
    otherDetails();
    contactDetails();
	 function contactDetails() {
        var contactInfo;
        $.ajax({
            url: "http://xyz.com/webServices/contactInfo.php",
            type: "POST",
            data: "contactInfo="+contactInfo,
            dataType: "json",
            crossDomain: true,
            success: function(data) {
                if (data.status === "success") {
                   	var output = "";
                    for(var i=0; i<data.info.length; ++i) {
						var output="<ul>";
                        output+="<li style='margin-top:10px;'><img src='images/sm-icons/map-icon.png'><strong> Address</strong></li>";
                        output+="<li><span>"+data.info[i].Address+"</span></li>";
                        output+="<li><img src='images/sm-icons/office-telephone.png'><strong>&nbsp;Contact No.</strong></li>";
                        output+="<li><span><a href='tel:"+data.info[i].Phone+"' class='color-black'>"+data.info[i].Phone+"</a></span></li>";
                        output+="<li><img src='images/sm-icons/email.png'><strong>&nbsp;E-Mail</strong></li>";
                        output+="<li><span><a href='mailto:"+data.info[i].Email+"' class='color-black'>"+data.info[i].Email+"</a></span></li>";
                        output+="<li><img src='images/sm-icons/faxno.png'><strong>&nbsp;Fax No.</strong></li>";
                        output+="<li><span>"+data.info[i].Fax+"</span></li>";
						output+="<li><img src='images/sm-icons/internet-1.png'><strong>&nbsp;Website</strong></li>";
                        output+="<li><span><a class='website' href=http://"+data.info[i].Website+" style='color:#333;'>"+data.info[i].Website+"</a></span></li>";
						output+="</ul>";
                    }
                    $("#contact-info").html(output);
					$(".website").on('click', function(e){
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
                }
            },
            /*error: function(jqXHR, exception) {
                getErrorMessage(jqXHR, exception);
            }*/
        });
    }
    function otherDetails() {
        var otherInfo;
        $.ajax({
            url: "http://xyz.com/webServices/otherInfo.php",
            type: "POST",
            data: "otherInfo="+otherInfo,
            dataType: "json",
            crossDomain: true,
            success: function(data) {
                if (data.status === "success") {
                    var output = "<ul>";
                    for (var i = 0; i<data.info.length; ++i) {
                        output+="<li><img src='images/sm-icons/id-card.png'><strong>PAN No.</strong></li>";
                        output+="<li><span>"+data.info[i].PanNo+"</span></li>";
                        output+="<li style='margin-top:10px;'><img src='images/sm-icons/banks.png'><strong>Bank Name</strong></li>";
                        output+="<li><span>"+data.info[i].BankName+"</span></li>";
                        output+="<li style='margin-top:10px;'><img src='images/sm-icons/user.png'><strong>S/B A/C No.</strong></li>";
                        output+="<li><span>"+data.info[i].AcNo+"</span></li>";
                        output+="<li style='margin-top:10px;'><img src='images/sm-icons/map-icon.png'><strong>Bank Branch</strong></li>";
                        output+="<li><span>"+data.info[i].BranchName+"</span></li>";
                        output+="<li style='margin-top:10px;'><img src='images/sm-icons/code.png'><strong>IFSC Code</strong></li>";
                        output+="<li><span>"+data.info[i].IfscCode+"</span></li>";
                    }
                    $("#other-info").html(output);
						var output = "";
						output+="</ul>";
						output+="<h5 style='font-weight:700;'>STAY CONNECTED</h5>";
						output+="<ul class='social-media'>";
						output+="<li><a href='#' onclick='facebook();'><img src='images/facebook.png'></a></li>";
						output+="<li><a href='#' onclick='twitter();'><img src='images/twitter.png'></i></a></li>";
						output+="<li><a href='#' onclick='gplus();'><img src='images/google-plus.png'></i></a></li>";
						output+="</ul>";
                    	$("#social-media").html(output);
                }
            },
            error: function(jqXHR, exception) {
                getErrorMessage(jqXHR, exception);
            }
        });
    }
});
// social media function
function facebook(){
    var ref = cordova.InAppBrowser.open('https://www.facebook.com', '_blank', 'location=no');
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
}
function twitter(){
    var ref = cordova.InAppBrowser.open('https://twitter.com', '_blank', 'location=no');
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
}
function gplus(){
    var ref = cordova.InAppBrowser.open('https://plus.google.com/110127823146697271283', '_blank', 'location=no');
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
}
 function openLink(){
	 cordova.InAppBrowser.open("https://play.google.com/store/apps/details?id=", "_system"); 
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