import { useState, useEffect } from "react";

import Places from "./Places";
import { Place } from "./Places";
import ErrorComponent from "./ErrorComponent";

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
        const response = await fetch("http://localhost:8080/places");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        setAvailablePlaces(resData);
      } catch (error: unknown) {
        // handling an error response
        setError(error as Error);
      }

      setIsFetching(false);
    };

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorComponent title="An error occurred!" message={error.message} />
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
