package com.example.placepicker.place;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class PlaceRepository {
    ObjectMapper mapper = new ObjectMapper();
    
    public List<Place> getPlaces() throws IOException {
        File file = new File("resources/places.json");
        List<Place> placesList = mapper.readValue(file, new TypeReference<>(){});

        return placesList;
    }
}
