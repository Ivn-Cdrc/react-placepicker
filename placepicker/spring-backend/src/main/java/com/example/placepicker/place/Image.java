package com.example.placepicker.place;

public class Image {
    private String src;
    private String alt;

    public Image(String src, String alt) {
        this.src = src;
        this.alt = alt;
    }

    public String getSrc() {
        return this.src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public String getAlt() {
        return this.alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }
}
