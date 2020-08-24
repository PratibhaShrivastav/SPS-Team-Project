<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags/" %>

<t:dedicated-page>
    <jsp:attribute name="css">
        <link rel="stylesheet" type="text/css" href="https://m.media-amazon.com/images/G/01/imdb/css/collections/name-38781117._CB407810786_.css" />
        <link rel="stylesheet" type="text/css" href="https://m.media-amazon.com/images/G/01/imdb/css/collections/title-flat-1272109843._CB407810813_.css" />
        <link rel="stylesheet" type="text/css" href="https://m.media-amazon.com/images/I/31QLp3YHtSL.css">
        <link rel="stylesheet" type="text/css" href="https://m.media-amazon.com/images/I/41+XUIt0rvL.css">
        <link rel="stylesheet" type="text/css" href="/assets/css/movie_dedicated_page.css">
        <link rel="stylesheet" type="text/css" href="/assets/css/reset.css">
        <noscript>
            <link rel="stylesheet" type="text/css" href="https://m.media-amazon.com/images/G/01/imdb/css/wheel/nojs-2827156349._CB468153063_.css">
        </noscript>
    </jsp:attribute>

	<jsp:attribute name="navbar">
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
                        <li>
                            <a href="index.html" class="nowPlaying">Home</a>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                Genres<span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="#" class="action" id="action">Action</a></li>
                                <li><a href="#" class="animation" id="animation">Animation</a></li>
                                <li><a href="#" class="comedy" id="comedy">Comedy</a></li>
                                <li><a href="#" class="drama" id="drama">Drama</a></li>
                                <li><a href="#" class="family" id="family">Family</a></li>
                                <li><a href="#" class="fantasy" id="fantasy">Fantasy</a></li>
                                <li><a href="#" class="horror" id="horror">Horror</a></li>
                                <li><a href="#" class="music" id="music">Music</a></li>
                                <li><a href="#" class="romance" id="romance">Romance</a></li>
                                <li><a href="#" class="scifi" id="scifi">Science Fiction</a></li>
                                <li><a href="#" class="thriller" id="thriller">Thriller</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <form class="navbar-form navbar-right searchForm">
                            <div class="form-group">
                                <input id="searchMovieNeWindowxfxInput" type="text" class="form-control" placeholder="Search movies">
                            </div>
                            <button type="submit" class="btn btn-default">
                                <i class="glyphicon glyphicon-search"></i>
                            </button>
                        </form>
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

	<jsp:attribute name="pagecontent">
        <div id="wrapper">
            <div id="root" class="redesign">
                <div id="pagecontent">
                    <div id="movie-details" data-movie-id="${movie_id}">
                        <div class="article">
                            <div class="col-sm-3" id="poster"></div>
                            <div class="col-sm-9" id="details">
                                <div id="movieName"></div>
                                <div id="buttons">
                                    <center><div class="col-sm-6" id="linkToTrailer"></div></center>
                                    <center><div class="col-sm-6" id="changeTodoStatus"></div></center><br><br>
                                </div>
                                <div id="release"></div><br>
                                <div id="rating"></div><br>
                                <div id="language"></div><br>
                                <div id="genre"></div>
                            </div>
                        </div>
                        <div class="article" id="synopsis">
                            <h2>Synopsis</h2>
                        </div>
                        <div class="article" id="addReview">
                            <h2>Add your review here</h2>
                            <form action="/api/movies/add_review" method="POST">
                                <textarea name="review" rows="3" cols="117"></textarea><br>
                                <button class="btn primary large" rel="login" type="submit">Add</button>
                            </form>
                        </div>
                        <div class="article" id="reviews">
                            <h2>Reviews</h2>
                            <ul id="reviewList"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</jsp:attribute>

    <jsp:attribute name="scripts">
        <script type="text/javascript" src="/assets/javascript/movie_dedicated_page.js"></script>
        <script src="https://www.gstatic.com/firebasejs/5.2.0/firebase.js"></script>
    </jsp:attribute>
</t:dedicated-page>