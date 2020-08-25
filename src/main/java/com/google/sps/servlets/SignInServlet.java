package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;


/* Servlet that creates user session */
@WebServlet("/sign_in")
public class SignInServlet extends HttpServlet {

    private static final String USER_ENTITY = "UserEntity";
    private static final String PROFILE_ID_PROPERTY = "ProfileID";
    private static final String FULL_NAME_PROPERTY = "FullName";
    private static final String EMAIL_PROPERTY = "Email";
    private static final String IMAGE_URL_PROPERTY = "ImageUrl";

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String profileID = request.getParameter("ProfileID");
        String fullName = request.getParameter("FullName");
        String email = request.getParameter("Email");
        String imageUrl = request.getParameter("ImageUrl");
        HttpSession session = request.getSession();
        session.setAttribute(PROFILE_ID_PROPERTY, profileID);
        session.setAttribute(FULL_NAME_PROPERTY, fullName);

        addUser(profileID, fullName, email, imageUrl);
    }

    private void addUser(String profileID, String fullName, String email, String imageUrl) {
        Filter propertyFilter = new FilterPredicate(PROFILE_ID_PROPERTY, FilterOperator.EQUAL, profileID);
        Query query = new Query(USER_ENTITY).setFilter(propertyFilter);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = datastore.prepare(query);
        
        for (Entity entity : results.asIterable()) {
            return;
        }
        Entity userEntity = new Entity(USER_ENTITY);
        userEntity.setProperty(PROFILE_ID_PROPERTY, profileID);
        userEntity.setProperty(FULL_NAME_PROPERTY, fullName);
        userEntity.setProperty(EMAIL_PROPERTY, email);
        userEntity.setProperty(IMAGE_URL_PROPERTY, imageUrl);
        datastore.put(userEntity);
    }
}
