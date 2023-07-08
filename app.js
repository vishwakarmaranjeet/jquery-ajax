document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
	 isOnline();    
}
//Network status check 
function isOnline(){ 
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection'; 
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    if((states[networkState]) == states[Connection.NONE]){
		alert("No Internet Connection");
	}
}