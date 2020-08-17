package com.google.sps.servlets;

import java.util.Collections;
import java.io.IOException;
import java.security.GeneralSecurityException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.gson.Gson;
import com.google.sps.data.ResponseStatus;


/* Servlet that handles adding items to todo list */
@WebServlet("/mark_todo")
public class MarkTodoServlet extends HttpServlet {

    private static final String CLIENT_ID = "604444953382-df3e44jciqotq136aj24fasopo8k6ru2.apps.googleusercontent.com";
    private static final String EMAIL_ID = "EmailID";
    private static final String TODO_ENTITY = "TodoEntity";
    private static final String ENTITY_TYPE_PROPERTY = "EntityType";
    private static final String ENTITY_ID_PROPERTY = "EntityID";
    private static final String TIMESTAMP_PROPERTY = "timestamp";
    private static final Gson GSON = new Gson();

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String emailID = request.getParameter("EmailID");
        int entityType = Integer.parseInt(request.getParameter("EntityType"));
        int entityID = Integer.parseInt(request.getParameter("EntityID"));
        long timestamp = System.currentTimeMillis();

        // Payload payload = verifyTokenID(tokenID);

        // String userID = "";
        // if (payload != null) {
        //     userID = payload.getSubject();
        // }

        Entity todoEntity = new Entity(TODO_ENTITY);
        todoEntity.setProperty(EMAIL_ID, emailID);
        todoEntity.setProperty(ENTITY_TYPE_PROPERTY, entityType);
        todoEntity.setProperty(ENTITY_ID_PROPERTY, entityID);
        todoEntity.setProperty(TIMESTAMP_PROPERTY, timestamp);
        
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        datastore.put(todoEntity);

        // ResponseStatus responseStatus = ResponseStatus.builder().status_code(HttpServletResponse.SC_CREATED).status_message("Created").build();
        // response.setContentType("application/json");
        // response.getWriter().write(GSON.toJson(responseStatus));

        response.sendRedirect("/");
    }

    private Payload verifyTokenID(String tokenID) {
        NetHttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new GsonFactory();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
            .setAudience(Collections.singletonList(CLIENT_ID))
            .build();
        
        Payload payload = null;
        try {
            GoogleIdToken idToken = verifier.verify(tokenID);
            if (idToken != null) {
                payload = idToken.getPayload();
            } else {
                System.out.println("Invalid token.");
            }
        } catch (GeneralSecurityException e) {
            System.out.println(e.getLocalizedMessage());
        } catch (IOException e) {
            System.out.println(e.getLocalizedMessage());
        }

        return payload;
    }
}
