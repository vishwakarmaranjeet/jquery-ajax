$(document).ready(function (e) {
    var cname = localStorage.getItem("companyname");
    var string = JSON.parse(localStorage.getItem("user_details"));
    if (string === null || string.length === 0 || string.length === "undefined") {
        location.href = "index.html";
    } else {
        var c_id = localStorage.getItem("cid");
        var c_id = getUrlVars()["cid"];
        for (var i = 0; i < string.userdetails.length; ++i) {
            var companyID = string.userdetails[i].CompanyID;
        }
        getPersonnelDetails();
        $("#logo-container").html(cname);
    }
    function getPersonnelDetails() {
        $.ajax({
            url: "http://xyz.com/webServices/getPersonnelDetails.php",
            type: "GET",
            data: "cid=" + c_id,
            dataType: "json",
            crossDomain: true,
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (data) {
                if (data.status === "success") {
                    var output = "";
                    for (var i = 0; i < data.details.length; ++i) {
                        // Age calculate
                        dob = new Date(data.details[i].DOB);
                        var today = new Date();
                        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
                        // dd-mm-yyyy format
                        var date = new Date(data.details[i].DOB);
                        var dateofbirth = (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
                        output += "<div class='row card' style='margin-bottom:12px;'>";
                        output += "<div class='col s12 center' style='background:#f4f4f4;'><img onerror='imageError(this)'  class='responsive-image circle company-pic-width' src=http://xyz.com/proprietor_profile_pic/" + data.details[i].Photo + "></div>";
                        if (data.details[i].IsNominee === 'Y') {
                            output += "<div class='col s12 center' style='background:#f4f4f4;'><h5 style='line-height:20px;'><i class='fa fa-check-circle'></i> Nominee</h5></div>";
                        }
                        output += "<div class='col s12'><h5>" + data.details[i].PersonName + "</h5></div>";
                        output += "<div class='col s6'>";
                        output += "<ul style='margin:0; padding:0;'>";
                        if (data.details[i].Designation) {
                            output += "<li><strong>Designation</strong></li>";
                            output += "<li>" + data.details[i].Designation + "</li>";
                        }
                        if (data.details[i].DOB === '1970-01-01') {
                            output += "<li><strong>Date of Birth</strong></li>";
                            output += "<li>N/A</li>";
                        } else if (data.details[i].DOB) {
                            output += "<li><strong>Date of Birth</strong></li>";
                            output += "<li>" + dateofbirth + "</li>";
                        }
                        if (data.details[i].Gender === "M") {
                            output += "<li><strong>Gender</strong></li>";
                            output += "<li>Male</li>";
                        } else {
                            output += "<li><strong>Gender</strong></li>";
                            output += "<li>Female</li>";
                        }
                        if (data.details[i].BloodGroup) {
                            output += "<li><strong>Blood Group</strong></li>";
                            output += "<li>" + data.details[i].BloodGroup + "</li>";
                        } else {
                            output += "<li><strong>Blood Group</strong></li>";
                            output += "<li>N/A</li>";
                        }
                        output += "</ul>";
                        output += "</div>";
                        output += "<div class='col s6'>";
                        output += "<ul style='margin:0; padding:0;'>";
                        if (data.details[i].DOB === '1970-01-01') {
                            output += "<li><strong>Age</strong></li>";
                            output += "<li>N/A</li>";
                        } else {
                            output += "<li><strong>Age</strong></li>";
                            output += "<li>" + age + "</li>";
                        }
                        if (data.details[i].Caste) {
                            output += "<li><strong>Caste</strong></li>";
                            output += "<li>" + data.details[i].Caste + "</li>";
                        }
                        if (data.details[i].MaritalStatus === "Married") {
                            output += "<li><strong>Marital Status</strong></li>";
                            output += "<li>Married</li>";
                        } else {
                            output += "<li><strong>Marital Status</strong></li>";
                            output += "<li>Single</li>";
                        }
                        output += "</ul>";
                        output += "</div>";
                        output += "<div class='col s12'><h5><i class='fa fa-phone'></i> Contact Details</h5></div>";
                        output += "<div class='col s6'>";
                        output += "<ul>";
                        if (data.details[i].Email) {
                            output += "<li><strong>Email</strong></li>";
                            output += "<li><a href=mailto:" + data.details[i].Email + " style='color:#333;'>" + data.details[i].Email + "</a></li>";
                        }
                        else {
                            output += "<li><strong>Email</strong></li>";
                            output += "<li>N/A</li>";
                        }
                        if (data.details[i].MobileNo) {
                            output += "<li><strong>Mobile</strong></li>";
                            output += "<li><a href=tel:" + data.details[i].MobileNo + " style='color:#333;'>" + data.details[i].MobileNo + "</a></li>";
                        } else {
                            output += "<li><strong>Mobile</strong></li>";
                            output += "<li>N/A</li>";
                        }
                        if (data.details[i].ResidenceNo) {
                            output += "<li><strong>Residence No.</strong></li>";
                            output += "<li><a href=tel:" + data.details[i].ResidenceNo + " style='color:#333;'>" + data.details[i].ResidenceNo + "</a></li>";
                        }
                        else {
                            output += "<li><strong>Residence No.</strong></li>";
                            output += "<li>N/A</li>";
                        }
                        output += "</ul>";
                        output += "</div>";
                        output += "<div class='col s6'>";
                        output += "<ul>";
                        if (data.details[i].PanNo) {
                            output += "<li><strong>PAN No.</strong></li>";
                            output += "<li>" + data.details[i].PanNo + "</li>";
                        } else {
                            output += "<li><strong>PAN No.</strong></li>";
                            output += "<li>N/A</li>";
                        }
                        if (data.details[i].AadharNo) {
                            output += "<li><strong>Aadhar No.</strong></li>";
                            output += "<li>" + data.details[i].AadharNo + "</li>";
                        } else {
                            output += "<li><strong>Aadhar No.</strong></li>";
                            output += "<li>N/A</li>";
                        }
                        output += "</ul>";
                        output += "</div>";
                        output += "</div>";
                    }
                    $("#personnelInformation").html(output);
                } else if (data.status === "error") {
                    $toastContent = 'Something went wrong try again later';
                    Materialize.toast($toastContent, 6000);
                }
            },
            complete: function () {
                $.LoadingOverlay("hide");
            },
            error: function (jqXHR, exception) {
                getErrorMessage(jqXHR, exception);
            }
        });
    }
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