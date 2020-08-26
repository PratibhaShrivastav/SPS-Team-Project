<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags/" %>

<t:to-do-page>

    <jsp:attribute name="header">
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li><a href="/home.jsp" class="nowPlaying">Home</a></li>
                        <li><a href="/to-do.jsp" class="nowPlaying">Binge List</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Genres<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="/home.jsp?genre-action=1" class="action" id="action">Action</a></li>
                                <li><a href="/home.jsp?genre-animation=1" class="animation" id="animation">Animation</a></li>
                                <li><a href="/home.jsp?genre-comedy=1" class="comedy" id="comedy">Comedy</a></li>
                                <li><a href="/home.jsp?genre-drama=1" class="drama" id="drama">Drama</a></li>
                                <li><a href="/home.jsp?genre-family=1" class="family" id="family">Family</a></li>
                                <li><a href="/home.jsp?genre-fantasy=1" class="fantasy" id="fantasy">Fantasy</a></li>
                                <li><a href="/home.jsp?genre-horror=1" class="horror" id="horror">Horror</a></li>
                                <li><a href="/home.jsp?genre-music=1" class="music" id="music">Music</a></li>
                                <li><a href="/home.jsp?genre-romance=1" class="romance" id="romance">Romance</a></li>
                                <li><a href="/home.jsp?genre-scifi=1" class="scifi" id="scifi">Science Fiction</a></li>
                                <li><a href="/home.jsp?genre-thriller=1" class="thriller" id="thriller">Thriller</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <form class="navbar-form navbar-right searchForm" action="/home.jsp" method="GET">
                            <div class="form-group">
                                <input name="search-item" id="searchMovieNeWindowxfxInput" type="text" class="form-control" placeholder="Search movies">
                            </div>
                            <button type="submit" class="btn btn-default">
                                <i class="glyphicon glyphicon-search"></i>
                            </button>
                        </form>
                        <li class="icon-bar">
                            <div class="user">
                                <img class="user-image">
                            </div>
                        </li>
                        <li>
                            <div class="user">
                                <div class="user-info">
                                    <p class="full-name"></p>
                                    </br>
                                    <p class="email"></p>
                                </div>
                            </div>
                        </li>
                        <li class="icon-bar">
                            <div class="g-signin2" data-onsuccess="onSignIn" data-width="120" data-height="45"></div>
                        </li>
                        <li class="icon-bar">
                            <div class="sign-out">
                                <button id="signout-button" onclick="signOut()">Sign Out</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </jsp:attribute>
    
    <jsp:body>

	<!-- Displaying the movies -->
    <div id="movie-display">
        <h1 id="toDoList"> Binge List</h1>
        <div class="container">
            <div class="row">
                <div id="movie-grid">
                    
                    <!-- Jquery get us the movie posters! Need a place to put the poster images -->
                </div>
            </div>
        </div>
    </div>

	</jsp:body>

</t:to-do-page>