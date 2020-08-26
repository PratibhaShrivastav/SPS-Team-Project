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
                        <!-- <form class="navbar-form navbar-right searchForm">
                            <div class="form-group">
                                <input id="searchMovieNeWindowxfxInput" type="text" class="form-control" placeholder="Search movies">
                            </div>
                            <button type="submit" class="btn btn-default">
                                <i class="glyphicon glyphicon-search"></i>
                            </button>
                        </form> -->
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

	<jsp:attribute name="pagecontent">
        <div id="wrapper">
            <div id="root" class="redesign">
                <div id="pagecontent">
                    <div id="tv-show-details" data-tv-show-id="${tv_show_id}">
                        <div class="article">
                            <div class="col-sm-3" id="poster"></div>
                            <div class="col-sm-9" id="details">
                                <div id="tvShowName"></div>
                                <div id="buttons">
                                    <center><div class="col-sm-6" id="linkToTrailer"></div></center>
                                    <center><div class="col-sm-6" id="changeTodoStatus"></div></center><br><br>
                                </div>
                                <div id="firstAirDate"></div><br>
                                <div id="status"></div><br>
                                <div id="networks"></div><br>
                                <div id="numberOfSeasons"></div><br>
                                <div id="numberOfEpisodes"></div><br>
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
                            <form onsubmit="addReview(this, 2, ${tv_show_id})">
                                <!-- <h4 class="inline">Rating: </h4><input type="number" id="rating" name="Rating" min="1" max="10" step="1"><br><br> -->
                                <h4 class="inline"> Comment: </h4><br>
                                <textarea name="Comment" rows="3" cols="117"></textarea><br>
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
        <script type="text/javascript" src="/assets/javascript/utils.js"></script>
        <script type="text/javascript" src="/assets/javascript/tv_show_dedicated_page.js"></script>
        <script src="https://www.gstatic.com/firebasejs/5.2.0/firebase.js"></script>
    </jsp:attribute>
</t:dedicated-page>