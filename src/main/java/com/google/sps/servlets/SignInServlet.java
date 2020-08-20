package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/* Servlet that creates user session */
@WebServlet("/sign_in")
public class SignInServlet extends HttpServlet {

    private static final String PROFILE_ID_PROPERTY = "ProfileID";

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String profileID = request.getParameter("ProfileID");
        HttpSession session = request.getSession();
        session.setAttribute(PROFILE_ID_PROPERTY, profileID);
    }
}
