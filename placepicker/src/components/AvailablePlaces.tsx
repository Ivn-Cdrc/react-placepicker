import { useState, useEffect } from "react";

import Places from "./Places";
import { Place } from "./Places";
import ErrorComponent from "./ErrorComponent";
import { sortPlacesByDistance } from "../loc";
import { fetchAvailablePlaces } from "../http";

interface AvailablePlacesProps {
  onSelectPlace: (place: Place) => void;
}

const AvailablePlaces = ({ onSelectPlace }: AvailablePlacesProps) => {
  // must first render the component without data, then render it again once
  // data has been fetched
  const [availablePlaces, setAvailablePlaces] = useState<Place[]>([]);
  // isFetching is used to handle loading states while fetching information
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>();

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);

      try {
        const places: Place[] = await fetchAvailablePlaces();

        // gets the current position of the user. Takes some time to execute
        // cannot use async await with this function
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces: Place[] = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error: unknown) {
        // handling an error response
        setError(error as Error);
        setIsFetching(false);
      }      
    };

    fetchPlaces();
  }, []);

  if (error) {
    return (
      <ErrorComponent title="An error occurred!" message={error.message} />
    );
  }

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
