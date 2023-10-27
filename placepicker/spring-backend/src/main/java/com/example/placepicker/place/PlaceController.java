package com.example.placepicker.place;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlaceController {
    
    @GetMapping("/place")
    public Place[] getPlaces() {
        
    }
}
