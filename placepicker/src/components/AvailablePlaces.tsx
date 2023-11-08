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
  // isFetching is used to handle loading states while fetching information
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);
      const response = await fetch("http://localhost:8080/places");
      const resData = await response.json();
      setAvailablePlaces(resData);
      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
};

export default AvailablePlaces;
