<%@tag pageEncoding="UTF-8"  description="Overall Page template" %>
<%@attribute name="header" fragment="true" %>

<!DOCTYPE html>
<html>
<head>
	<title>BingeList</title>
    
    <meta name="google-signin-client_id" content="604444953382-df3e44jciqotq136aj24fasopo8k6ru2.apps.googleusercontent.com">

    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script src="https://apis.google.com/js/api:client.js"></script>

    <script type="text/javascript" src="assets/javascript/auth.js"></script>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

	<link rel="stylesheet" type="text/css" href="assets/css/reset.css">
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">

	<link href="https://fonts.googleapis.com/css?family=Carrois+Gothic+SC" rel="stylesheet">
</head>
  <body>
    <div id="pageheader">
      <jsp:invoke fragment="header"/>
    </div>
    <div id="body">
      <jsp:doBody/>
    </div>
    <!-- JQUERY -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<!-- Firebase -->
	<script src="https://www.gstatic.com/firebasejs/5.2.0/firebase.js"></script>
	<!-- css -->
	<script type="text/javascript" src="assets/javascript/app.js"></script>
  </body>
</html>
