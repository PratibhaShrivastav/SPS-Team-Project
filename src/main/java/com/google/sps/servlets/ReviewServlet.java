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
import com.google.gson.Gson;
import com.google.sps.data.ResponseStatus;
import com.google.sps.data.UserReview;
import java.util.List;
import java.util.ArrayList;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;

/* Servlet that handles adding review and rating to entity */
@WebServlet("/add_review")
public class ReviewServlet extends HttpServlet {

    private static final String PROFILE_ID = "ProfileID";
    private static final String REVIEW_ENTITY = "ReviewEntity";
    private static final String PROFILE_ID_PROPERTY = "ProfileID";
    private static final String FULL_NAME_PROPERTY = "FullName";
    private static final String ENTITY_TYPE_PROPERTY = "EntityType";
    private static final String ENTITY_ID_PROPERTY = "EntityID";
    private static final String ENTITY_RATING_PROPERTY = "Rating";
    private static final String ENTITY_COMMENT_PROPERTY = "Comment";
    private static final String TIMESTAMP_PROPERTY = "timestamp";
    private static final Gson GSON = new Gson();

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Query query = new Query(REVIEW_ENTITY).addSort(TIMESTAMP_PROPERTY, SortDirection.DESCENDING);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = datastore.prepare(query);
        List<UserReview> reviewList = new ArrayList<>();
        results.asIterable().forEach(entity -> {
            UserReview userReviewObj = UserReview.userReviewBuilder()
                .user((String)entity.getProperty(PROFILE_ID_PROPERTY))
                .name((String)entity.getProperty(FULL_NAME_PROPERTY))
                .id((String)entity.getProperty(ENTITY_ID_PROPERTY))
                .type((long)entity.getProperty(ENTITY_TYPE_PROPERTY))
                .rating((long)entity.getProperty(ENTITY_RATING_PROPERTY))
                .comment((String)entity.getProperty(ENTITY_COMMENT_PROPERTY))
                .build();
            reviewList.add(userReviewObj);
        });
        response.setContentType("application/json");
        response.getWriter().println(GSON.toJson(reviewList));
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        String profileID = (String)session.getAttribute("ProfileID");
        String fullName = (String)session.getAttribute("FullName");
        if (profileID.equals(null) || fullName.equals(null)) {
            return;
        }
        String entityID = String.valueOf(request.getParameter("EntityID"));
        int entityType = Integer.parseInt(request.getParameter("EntityType"));
        long timestamp = System.currentTimeMillis();
        int rating = Integer.parseInt(request.getParameter("Rating"));
        String comment = request.getParameter("Comment");

        Entity reviewEntity = new Entity(REVIEW_ENTITY);
        reviewEntity.setProperty(PROFILE_ID_PROPERTY, profileID);
        reviewEntity.setProperty(FULL_NAME_PROPERTY, fullName);
        reviewEntity.setProperty(ENTITY_TYPE_PROPERTY, entityType);
        reviewEntity.setProperty(ENTITY_ID_PROPERTY, entityID);
        reviewEntity.setProperty(TIMESTAMP_PROPERTY, timestamp);
        reviewEntity.setProperty(ENTITY_RATING_PROPERTY, rating);
        reviewEntity.setProperty(ENTITY_COMMENT_PROPERTY, comment);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        datastore.put(reviewEntity);

        ResponseStatus responseStatus = ResponseStatus.builder().status_code(HttpServletResponse.SC_CREATED).status_message("Created").build();
        response.setContentType("application/json");
        response.getWriter().write(GSON.toJson(responseStatus));
    }
}
