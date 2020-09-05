package com.google.sps.data;

import lombok.Builder;
import lombok.AllArgsConstructor;

@Builder @AllArgsConstructor
public class UserEntity{
    private final String profileID;
    private final String fullName;
    private final String email;
    private final String imageUrl;
}
