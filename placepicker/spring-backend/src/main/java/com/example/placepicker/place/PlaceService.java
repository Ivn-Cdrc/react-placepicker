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
        List<Place> places = placeRepository.getPlaces();
        
        if(places == null) {
            throw new FileNotFoundException("resource [places.json] cannot be resolved");
        }

        return places;
    }
}
