package com.google.sps.data;
import lombok.Builder;

@Builder
public class BaseEntity{
    private final String user;
    private final long type;
    private final String id;
}
