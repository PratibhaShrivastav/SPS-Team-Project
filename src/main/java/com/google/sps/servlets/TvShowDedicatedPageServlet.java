package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.gson.Gson;
import com.google.sps.data.ResponseStatus;


/* Servlet that handles dedicated web page for tv shows */
@WebServlet("/tv_shows/*")
public class TvShowDedicatedPageServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        System.out.println("Value of pathInfo " +  pathInfo);
        Long tv_show_id = Long.valueOf(pathInfo.substring(1));
        req.setAttribute("tv_show_id", tv_show_id);
        RequestDispatcher requestDispatcher = req.getRequestDispatcher("/WEB-INF/tv_show_dedicated_page.jsp");
        requestDispatcher.forward(req, resp);
    }
}