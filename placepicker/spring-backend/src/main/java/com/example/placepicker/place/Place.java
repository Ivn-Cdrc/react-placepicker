package com.example.placepicker.place;

import com.example.placepicker.place.Image;

public record Place(String id, String title, Image image, String lat, String lon) {}