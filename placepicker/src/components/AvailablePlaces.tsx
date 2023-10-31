import { useState, useEffect } from "react";

import Places from "./Places";
import { Place } from "./Places";

interface AvailablePlacesProps {
  onSelectPlace: (place: Place) => void;
}

const AvailablePlaces = ({ onSelectPlace }: AvailablePlacesProps) => {
  // must first render the component without data, then render it again once
  // data has been fetched
  const [availablePlaces, setAvailablePlaces] = useState<Place[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/places")
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setAvailablePlaces(responseData.places);
      });
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
};

export default AvailablePlaces;
