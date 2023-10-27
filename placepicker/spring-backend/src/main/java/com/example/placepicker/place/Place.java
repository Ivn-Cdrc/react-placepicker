package com.example.placepicker.place;

import com.example.placepicker.place.Image;

public class Place {
    private String id;
    private String title;
    private Image image;
    private String lat;
    private String lon;

    public Place(String id, String title, Image image, String lat, String lon) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.lat = lat;
        this.lon = lon;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Image getImage() {
        return this.image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public String getLat() {
        return this.lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLon() {
        return this.lon;
    }

    public void setLon(String lon) {
        this.lon = lon;
    }

}
