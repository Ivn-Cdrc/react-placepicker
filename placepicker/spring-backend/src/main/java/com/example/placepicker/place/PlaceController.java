package com.example.placepicker.place;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlaceController {
    @Autowired
    PlaceService placeService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/places")
    public ResponseEntity<List<Place>> getPlaces(
        @PathVariable(required = false) String request) throws IOException {
        List<Place> places = placeService.getPlaces();
        
        if(places.isEmpty() == true) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(places);
        }
    }
}
