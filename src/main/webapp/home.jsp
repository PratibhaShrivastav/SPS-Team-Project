<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags/" %>

<t:home-page>
    <jsp:attribute name="header">
	<nav class="navbar navbar-inverse">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
				<!-- <a class="navbar-brand" href="#">Home</a> -->
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li><a href="home.jsp" class="nowPlaying">Home</a></li>
                    <li><a href="to-do.jsp" class="nowPlaying">To-Do List</a></li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Genres<span class="caret"></span></a>
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
                            <!-- Submit -->
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
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</nav>

    </jsp:attribute>
    
    <jsp:body>
        
	<!-- Displaying the movies -->
	<div id="movie-display">
	<div class="container">
		<div class="row">
			<div id="movie-grid">
            </div>
        </div>
        <div class="row">
            <div id="show-grid">	
                    <!-- Jquery get us the movie posters! Need a place to put the poster images -->
            </div>
        </div>
        <div class="row">
            <div id="book-grid">	
                    <!-- Jquery get us the movie posters! Need a place to put the poster images -->
            </div>
        </div>
        <div class="row">
            <div id="search-movie-grid">	
                    <!-- Jquery get us the movie posters! Need a place to put the poster images -->
            </div>
        </div>
        <div class="row">
            <div id="search-show-grid">	
                    <!-- Jquery get us the movie posters! Need a place to put the poster images -->
            </div>
        </div>
        <div class="row">
            <div id="search-book-grid">	
                    <!-- Jquery get us the movie posters! Need a place to put the poster images -->
            </div>
        </div>
	</div>
	</jsp:body>
</t:home-page>
