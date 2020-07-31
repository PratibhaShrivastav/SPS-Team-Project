package com.google.sps.data;

import lombok.AllArgsConstructor;

/** Authentication info of a user. */
@AllArgsConstructor
public final class UserStatus {

    private final boolean userLoggedIn;
    private final String urlToRedirect;
}
