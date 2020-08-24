function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
    var profileID = profile.getId();
    var fullName = profile.getName();
    var email = profile.getEmail();
    var imageUrl = profile.getImageUrl();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/sign_in');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('ProfileID=' + profileID + 
             '&FullName=' + fullName + 
             '&Email=' + email +
             '&ImageUrl=' + imageUrl);
    $(".g-signin2").css("display","none");
    $(".user-image").attr("src",imageUrl);
    $(".full-name").text(fullName);
    $(".email").text(email);
	$(".user").css("display","block");
	$(".sign-out").css("display","block");
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/sign_out');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
    window.location.reload();
}
