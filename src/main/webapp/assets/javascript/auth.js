function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
    var profileID = profile.getId();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/sign_in');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('ProfileID=' + profileID);
    $(".g-signin2").css("display","none");
	$(".sign-out").css("display","block");
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		$(".sign-out").css("display","none");
		$(".g-signin2").css("display","block");
	});
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/sign_out');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}
