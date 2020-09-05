package com.google.sps.data;
import lombok.Builder;

@Builder
public final class ResponseStatus{
    private final int status_code;
    private final String status_message;
}
