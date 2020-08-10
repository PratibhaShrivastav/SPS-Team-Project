function onSignIn(googleUser) {
	$(".g-signin2").css("display","none");
	$(".sign-out").css("display","block");
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		$(".sign-out").css("display","none");
		$(".g-signin2").css("display","block");
	});
}
