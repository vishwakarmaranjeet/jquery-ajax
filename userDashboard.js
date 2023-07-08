$(document).ready(function () {
    var string = JSON.parse(localStorage.getItem("user_details"));
    if (string === null || string.length === 0 || string.length === "undefined") {
        location.href = "index.html";
    } else {
        for (var i = 0; i < string.userdetails.length; ++i) {
            var CompanyID = string.userdetails[i].CompanyID;
        }
        companyDetails();
    }
    function companyDetails() {
        $.ajax({
            url: "http://xyz.com/webServices/getCompanyDetails.php",
            type: "GET",
            data: "cid=" + CompanyID,
            dataType: "json",
            crossDomain: true,
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (data) {
                if (data.status === "success") {
                    var output = "";
                    var html = "";
                    for (var i = 0; i < data.companydetails.length; ++i) {
                        var establishment = new Date(data.companydetails[i].EstablishmentYear);
                        var establishmentyear = (establishment.getDate() + '/' + (establishment.getMonth() + 1) + '/' + establishment.getFullYear());
                        var enroll = new Date(data.companydetails[i].EnrollmentDate);
                        var enrollmentdate = (enroll.getDate() + '/' + (enroll.getMonth() + 1) + '/' + enroll.getFullYear());
                        $("a#logo-container").append("<div class='brand-logo sm-font' id='cp'>Welcome," + data.companydetails[i].Email + "</>");
                        $("#cname").append("<h5 style='font-weight:500;'>" + data.companydetails[i].CompanyName + "</h5>");
                        $("#profile-pic").append("<a href='edit-profile.html'><img onerror='imgError(this)' class='responsive-image circle company-pic-width' src=http://xyz.com/company_profile_pic/" + data.companydetails[i].ProfileImage + "></>");
                        output += "<ul>";
                        if (data.companydetails[i].MembershipType) {
                            output += "<li><img src='images/sm-icons/like.png' class='smsearchIcon'><span>" + data.companydetails[i].MembershipType + " Member</span></li>";
                        }
                        if (data.companydetails[i].Address) {
                            output += "<li><img src='images/sm-icons/map.png' class='smsearchIcon'><span>" + data.companydetails[i].Address + "-" + data.companydetails[i].PinNo + "</span></li>";
                        }
                        if (data.companydetails[i].City) {
                            output += "<li><img src='images/sm-icons/city.png' class='smsearchIcon'><span>" + data.companydetails[i].City + "</span></li>";
                        }
                        if (data.companydetails[i].State) {
                            output += "<li><img src='images/sm-icons/state.png' class='smsearchIcon'><span>" + data.companydetails[i].State + "</span></li>";
                        }
                        if (data.companydetails[i].Email) {
                            output += "<li><img src='images/sm-icons/mail.png' class='smsearchIcon'><span>" + data.companydetails[i].Email + "</span></li>";
                        }
                        if (data.companydetails[i].Email2) {
                            output += "<li><img src='images/sm-icons/mail.png' class='smsearchIcon'><span>" + data.companydetails[i].Email2 + "</span></li>";
                        }
                        if (data.companydetails[i].MobileNo) {
                            output += "<li><img src='images/sm-icons/mobile.png' class='smsearchIcon'><span>" + data.companydetails[i].MobileNo + "</span></li>";
                        }
                        if (data.companydetails[i].TelNo) {
                            output += "<li><img src='images/sm-icons/telephone.png' class='smsearchIcon'><span>" + data.companydetails[i].TelNo + "</span></li>";
                        }
                        if (data.companydetails[i].TelNo2) {
                            output += "<li><img src='images/sm-icons/telephone.png' class='smsearchIcon'><span>" + data.companydetails[i].TelNo2 + "</span></li>";
                        }
                        if (data.companydetails[i].TelNo3) {
                            output += "<li><img src='images/sm-icons/telephone.png' class='smsearchIcon'><span>" + data.companydetails[i].TelNo3 + "</span></li>";
                        }
                        if (data.companydetails[i].FaxNo) {
                            output += "<li><img src='images/sm-icons/fax-machine.png' class='smsearchIcon'><span>" + data.companydetails[i].FaxNo + "</span></li>";
                        }
                        if (data.companydetails[i].BusinessDescription) {
                            output += "<li><img src='images/sm-icons/note.png' class='smsearchIcon'><span>" + data.companydetails[i].BusinessDescription + "</span></li>";
                        }
                        if (data.companydetails[i].Website) {
                            output += "<li><img src='images/sm-icons/internet.png' class='smsearchIcon'><span>" + data.companydetails[i].Website + "</span></li>";
                        }
                        output += "</ul>";
                        // other details 
                        html += "<ul>";
                        html += "<div class='other-heading'><h5>OTHER DETAILS</h5></div>";
                        if (data.companydetails[i].CompanyType) {
                            html += "<li><strong>Constitution</strong>" + data.companydetails[i].CompanyType + "</li>";
                        }
                        if (data.companydetails[i].MembershipNo) {
                            html += "<li><strong>Membership No.</strong>" + data.companydetails[i].MembershipNo + "</li>";
                        }
                        if (data.companydetails[i].EstablishmentYear === '1970-01-01') {
                            html += "<li><strong>Establishment Year</strong>N/A</li>";
                        } else {
                            html += "<li><strong>Establishment Year </strong>" + establishmentyear + "</li>";
                        }
                        if (data.companydetails[i].EnrollmentDate === '1970-01-01') {
                            html += "<li><strong>Enrollment Date</strong>N/A</li>";
                        } else {
                            html += "<li><strong>Enrollment Date</strong>" + enrollmentdate + "</li>";
                        }
                        if (data.companydetails[i].PanNo) {
                            html += "<li><strong>PAN No.</strong>" + data.companydetails[i].PanNo + "</li>";
                        } else {
                            html += "<li><strong>PAN No.</strong>N/A</li>";
                        }
                        if (data.companydetails[i].TinNo) {
                            html += "<li><strong>TIN No.</strong>" + data.companydetails[i].TinNo + "</li>";
                        } else {
                            html += "<li><strong>TIN No.</strong>N/A</li>";
                        }
                        if (data.companydetails[i].CinNo) {
                            html += "<li><strong>CIN No.</strong>" + data.companydetails[i].CinNo + "</li>";
                        } else {
                            html += "<li><strong>CIN No.</strong>N/A</li>";
                        }
                        if (data.companydetails[i].CstNo) {
                            html += "<li><strong>CST No.</strong>" + data.companydetails[i].CstNo + "</li>";
                        } else {
                            html += "<li><strong>CST No.</strong>N/A</li>";
                        }
                        if (data.companydetails[i].ExciseNo) {
                            html += "<li><strong>Excise No.</strong>" + data.companydetails[i].ExciseNo + "</li>";
                        } else {
                            html += "<li><strong>Excise No.</strong>N/A</li>";
                        }
                        if (data.companydetails[i].ExportImportNo) {
                            html += "<li><strong>Export Import No.</strong>" + data.companydetails[i].ExportImportNo + "</li>";
                        } else {
                            html += "<li><strong>Export Import No. </strong>N/A</li>";
                        }
                        if (data.companydetails[i].LbtNo) {
                            html += "<li><strong>LBT No.</strong>" + data.companydetails[i].LbtNo + "</li>";
                        } else {
                            html += "<li><strong>LBT No.</strong>N/A</li>";
                        }
                        if (data.companydetails[i].GstNo) {
                            html += "<li><strong>GST No.</strong>" + data.companydetails[i].GstNo + "</li>";
                        } else {
                            html += "<li><strong>GST No.</strong>N/A</li>";
                        }
                        html += "</ul>";
                    }
                    $(".company-details").html(output);
                    $(".other-details").html(html);
                } else if (data.status === "error") {
                    Materialize.toast('Something went wrong try again later', 6000);
                }
            },
            complete: function () {
                $.LoadingOverlay("hide");
            },
            error: function (jqXHR, exception) {
                getErrorMessage(jqXHR, exception);
            },
        });
    }
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
function imgError(element) {
    element.onerror = "";
    element.src = "images/company-image.png";
} 