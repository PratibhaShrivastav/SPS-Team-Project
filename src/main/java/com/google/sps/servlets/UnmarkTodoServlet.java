package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.gson.Gson;
import com.google.sps.data.ResponseStatus;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;


/* Servlet that handles removing items from todo list */
@WebServlet("/unmark_todo")
public class UnmarkTodoServlet extends HttpServlet {

    private static final String TODO_ENTITY = "TodoEntity";
    private static final String PROFILE_ID_PROPERTY = "ProfileID";
    private static final String ENTITY_ID_PROPERTY = "EntityID";
    private static final String ENTITY_TYPE_PROPERTY = "EntityType";
    private static final Gson GSON = new Gson();

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        String profileID = (String)session.getAttribute("ProfileID");
        if (profileID.equals(null)) {
            return;
        }
        String entityID = String.valueOf(request.getParameter("EntityID"));
        long entityType = Integer.parseInt(request.getParameter("EntityType"));
        Filter propertyFilter = new FilterPredicate(PROFILE_ID_PROPERTY, FilterOperator.EQUAL, profileID);
        Query query = new Query(TODO_ENTITY).setFilter(propertyFilter);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = datastore.prepare(query);
        for (Entity entity : results.asIterable()) {
            String ID = (String)entity.getProperty(ENTITY_ID_PROPERTY);
            long type = (long)entity.getProperty(ENTITY_TYPE_PROPERTY);
            if ((ID.equals(entityID)) && (type == entityType))
            {
                Key entityKey = entity.getKey();
                datastore.delete(entityKey);
                break;
            }
        }
        ResponseStatus responseStatus = ResponseStatus.builder().status_code(HttpServletResponse.SC_OK).status_message("OK").build();
        response.setContentType("application/json");
        response.getWriter().write(GSON.toJson(responseStatus));  
    }

}
