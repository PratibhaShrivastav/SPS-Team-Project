package com.google.sps.data;
import lombok.Builder;

public final class UserReview extends BaseEntity{
    private final String name;
    private final long rating;
    private final String comment;

    @Builder(builderMethodName = "userReviewBuilder")
    public UserReview(final String user, final String name, final long type, final String id, final long rating, final String comment) {
        super(user, type, id);
        this.name = name;
        this.rating = rating;
        this.comment = comment;
    }
}