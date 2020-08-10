package com.google.sps.data;
import lombok.Builder;

@Builder
public class BaseEntity{
    private final long type;
    private final long id;
}