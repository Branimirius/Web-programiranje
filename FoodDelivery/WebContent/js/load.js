
var baseUrl = 'http://localhost:3665/NBWebProject/rest/';

$(document).ready(function() {
	
	$('#cartPanel').hide();
	$('#profilePanel').hide();
	$('#logout').hide();

	checkLoginStatus();
	
	$('#logout').click(function () {
        logoutUser();
    });
});

function checkLoginStatus() {
	$.ajax({
		url : "rest/user/loginstat"
	}).then(function(user) {

		if (user != undefined) {
			$('#login').hide();
			$('#profilePanel').text(user.username);
			$('#profilePanel').show();
			$('#logout').show();
			
			if (user.role == "customer") {
				$('#cartPanel').show();
			}
		}
	});
}

function logoutUser() {
    $.ajax({
		url: "rest/user/logout",

		success : function() {
			alert("Uspešno ste se izlogovali!")
			refresh();
		},
		
		error : function(message) {
			alert(message.responseText);
		}
    });
}

function refresh() {
	window.location.href = "http://localhost:3665/NBWebProject/home.html";
}