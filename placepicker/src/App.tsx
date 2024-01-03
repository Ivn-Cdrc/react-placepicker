import { useRef, useState, useCallback, useEffect } from "react";
import { Fragment } from "react";

import Places from "./components/Places";
import Modal from "./components/Modal";
import DeleteConfirmation from "./components/DeleteConfirmation";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces";

import { Place } from "./components/Places.jsx";
import { fetchUserPlaces, updateUserPlaces } from "./http";
import ErrorComponent from "./components/ErrorComponent";

function App() {
  const selectedPlace = useRef<Place | null>(null);

  const [userPlaces, setUserPlaces] = useState<Place[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState<string>("");

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);

      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error: unknown) {
        setError(error as Error);
      }

      setIsFetching(false);
    };
  }, []);

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
      return error.message;
    } else {
      return String(error);
    }
  };

  const handleStartRemovePlace = (place: Place) => {
    setModalIsOpen(true);
    selectedPlace.current = place;
  };

  const handleStopRemovePlace = () => {
    setModalIsOpen(false);
  };

  const handleSelectPlace = async (selectedPlace: Place) => {
    // alternative way to handle request is to execute it first, then update state
    // however you will need to show an updating or in progress state
    // await updateUserPlaces([selectedPlace, ...userPlaces]);

    // checking if place already exists in previously picked places
    // optimistic updating. Updating the local state before sending the request
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    // state update will not immediately be available
    // it will only be available after the component function re-executes
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error: unknown) {
      // set to previous state if the request fails
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces("failed to update places.");
    }
  };

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current?.id
        )
      );

      try {
        // performing optimistic updating by updating state, then sending http request
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current?.id)
        );
      } catch (error: unknown) {
        // roll back the change on request failure
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces("Failed to delete place.");
      }

      setModalIsOpen(false);
    },
    [userPlaces]
  );

  function handleError() {
    setErrorUpdatingPlaces("");
  }

  return (
    <Fragment>
      <Modal open={errorUpdatingPlaces != ""} onClose={handleError}>
        {errorUpdatingPlaces != "" && (
          <ErrorComponent
            title="An error occurred!"
            message={errorUpdatingPlaces}
            onConfirm={handleError}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && (
          <ErrorComponent title="An error occurred!" message={error.message} />
        )}
        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isLoading={isFetching}
            loadingText="Fetching your places..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </Fragment>
  );
}

export default App;
