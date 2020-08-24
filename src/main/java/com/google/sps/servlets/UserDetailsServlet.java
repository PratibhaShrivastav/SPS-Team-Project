package com.google.sps.servlets;

import com.google.gson.Gson;
import com.google.sps.data.UserEntity;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;

/* Servlet that gets the current user details */
@WebServlet("/user-details")
public class UserDetailsServlet extends HttpServlet {

    private static final String EMPTY = "";
    private static final String USER_ENTITY = "UserEntity";
    private static final String PROFILE_ID_PROPERTY = "ProfileID";
    private static final String FULL_NAME_PROPERTY = "FullName";
    private static final String EMAIL_PROPERTY = "Email";
    private static final String IMAGE_URL_PROPERTY = "ImageUrl";
    private static final Gson gson = new Gson();

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        String profileID = (String)session.getAttribute("ProfileID");
        Filter propertyFilter = new FilterPredicate(PROFILE_ID_PROPERTY, FilterOperator.EQUAL, profileID);
        Query query = new Query(USER_ENTITY).setFilter(propertyFilter);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = datastore.prepare(query);
        UserEntity user = new UserEntity(EMPTY, EMPTY, EMPTY, EMPTY);
        for (Entity entity : results.asIterable()) {
            String fullName = (String)entity.getProperty(FULL_NAME_PROPERTY);
            String email = (String)entity.getProperty(EMAIL_PROPERTY);
            String imageUrl = (String)entity.getProperty(IMAGE_URL_PROPERTY);
            user = new UserEntity(profileID, fullName, email, imageUrl);            
            break;
        }

        response.setContentType("application/json;");
        response.getWriter().println(gson.toJson(user));
    }
}
