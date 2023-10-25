import Places from "./Places";
import { Place } from "./Places";

const AvailablePlaces = ({
  onSelectPlace,
}: {
  onSelectPlace: (place: Place) => void;
}) => {
  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
};

export default AvailablePlaces;
