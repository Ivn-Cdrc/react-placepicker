package com.example.placepicker.place;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaceService {
    @Autowired PlaceRepository placeRepository;

    public List<Place> getPlaces() throws IOException {
        return placeRepository.getPlaces();
    }

    public List<Place> getUserPlaces() throws IOException {
        return placeRepository.getUserPlaces();
    }

    public boolean addUserPlaces(List<Place> places) throws IOException {
        return placeRepository.addUserPlaces(places);
    }
}
