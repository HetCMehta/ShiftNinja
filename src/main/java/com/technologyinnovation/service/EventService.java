package com.technologyinnovation.service;

import com.technologyinnovation.model.*;

import java.util.List;

public interface EventService {
    Event createEvent(Event event);
    List<Event> getAllEvents();
}
