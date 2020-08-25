<%@tag pageEncoding="UTF-8"  description="Overall Page template" %>
<%@attribute name="navbar" fragment="true" %>
<%@attribute name="css" fragment="true"%>
<%@attribute name="pagecontent" fragment="true"%>
<%@attribute name="scripts" fragment="true"%>

<!DOCTYPE html>
<html>
<head>
	<title>BingeList</title>
	<link href="https://fonts.googleapis.com/css?family=Carrois+Gothic+SC" rel="stylesheet">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<meta name="google-signin-client_id" content="604444953382-df3e44jciqotq136aj24fasopo8k6ru2.apps.googleusercontent.com">
	<script src="https://apis.google.com/js/api:client.js"></script>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
	<script type="text/javascript" src="/assets/javascript/auth.js"></script>
	<jsp:invoke fragment="css"/>
</head>

<body id="styleguide-v2" class="fixed">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<jsp:invoke fragment="navbar"/>
	<jsp:invoke fragment="pagecontent"/>
	<jsp:invoke fragment="scripts"/>
</body>
</html>