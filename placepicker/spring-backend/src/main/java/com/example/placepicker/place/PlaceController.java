package com.example.placepicker.place;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlaceController {
    @Autowired
    PlaceService placeService;

    @GetMapping("/place")
    public List<Place> getPlaces(@PathVariable(required = false) String request)
        throws IOException {
        return placeService.getPlaces();
    }
}
