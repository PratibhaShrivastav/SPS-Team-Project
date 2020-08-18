package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.gson.Gson;
import com.google.sps.data.ResponseStatus;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;


/* Servlet that handles removing items from todo list */
@WebServlet("/unmark_todo")
public class UnmarkTodoServlet extends HttpServlet {

    private static final String TODO_ENTITY = "TodoEntity";
    private static final String ENTITY_ID_PROPERTY = "EntityID";
    private static final Gson GSON = new Gson();

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        long entityID = Integer.parseInt(request.getParameter("EntityID"));
        Query query = new Query(TODO_ENTITY);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = datastore.prepare(query);
        for (Entity entity : results.asIterable()) {
            long ID = (long)entity.getProperty(ENTITY_ID_PROPERTY);
            if (ID == entityID)
            {
                Key entityKey = entity.getKey();
                datastore.delete(entityKey);
                break;
            }
        }
        ResponseStatus responseStatus = ResponseStatus.builder().status_code(HttpServletResponse.SC_OK).status_message("OK").build();
        response.setContentType("application/json");
        response.getWriter().write(GSON.toJson(responseStatus));
        response.sendRedirect("/to-do.jsp");  
    }

}