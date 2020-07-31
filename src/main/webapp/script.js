// Fetch the user status and initiates the required front end.
async function getUserStatus() {
    const response = await fetch('/user-status');
    const userStatus = await response.json();
    
    if (userStatus.userLoggedIn) {
        const urlToLogoutElement = document.getElementById('logout');
        urlToLogoutElement.href = userStatus.urlToRedirect;

        const hideLogoutElement = document.getElementById('logout-form');
        hideLogoutElement.hidden = false;
    } else {
        const urlToLoginElement = document.getElementById('login');
        urlToLoginElement.href = userStatus.urlToRedirect;

        const hideLoginElement = document.getElementById('login-form');
        hideLoginElement.hidden = false;
    }
}
