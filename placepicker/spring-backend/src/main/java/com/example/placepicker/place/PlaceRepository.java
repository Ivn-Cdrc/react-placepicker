package com.example.placepicker.place;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class PlaceRepository {
    private ObjectMapper mapper = new ObjectMapper();

    // automatically looks in the /resources directory
    @Value("classpath:places.json")
    Resource placesResource;

    @Value("classpath:user-places.json")
    Resource userPlacesResource;
    
    public List<Place> getPlaces() throws IOException {
        List<Place> placesList;

        // if exception is thrown, controller advice will catch it.
        File file = placesResource.getFile();
        placesList = mapper.readValue(file, new TypeReference<>(){});
        
        return placesList;
    }

    public List<Place> getUserPlaces() throws IOException {
        List<Place> userPlacesList;

        File file = userPlacesResource.getFile();
        userPlacesList = mapper.readValue(file, new TypeReference<>(){});

        return userPlacesList;
    }

    // returns true if successfully added place, else return false
    public boolean addUserPlaces(List<Place> places) throws IOException {

        for(Place place : places) {
            System.out.println(place.title());
        }

        File file = userPlacesResource.getFile();
        //List<Place> userPlaces = getUserPlaces();

        mapper.writeValue(new File(file.getPath()), places);

        return true;

        // check for duplicates and other conditions if needed
        // if(userPlaces.contains(place)) {
        //     return false;
        // } else {
        //     userPlaces.add(place);
        //     mapper.writeValue(file, userPlaces);
        //     return true;
        // }
    }
}
