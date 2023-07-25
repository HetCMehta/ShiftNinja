package com.technologyinnovation.service;

import com.technologyinnovation.model.User;

public interface UserService {
    User signUp(User user);

    boolean login(User user);

    User getLoggedInUser();
}
