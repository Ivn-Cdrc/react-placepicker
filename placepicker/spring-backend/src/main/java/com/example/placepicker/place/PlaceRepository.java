package com.example.placepicker.place;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class PlaceRepository {
    @Autowired
    private ResourceLoader resourceLoader;

    private ObjectMapper mapper = new ObjectMapper();

    @Value("classpath:places.json")
    Resource placesResource;
    
    public List<Place> getPlaces() throws IOException {
        File file = placesResource.getFile();
        List<Place> placesList = mapper.readValue(file, new TypeReference<>(){});

        return placesList;
    }
}
