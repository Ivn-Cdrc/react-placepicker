interface Image {
  src: string;
  alt: string;
}

export interface Place {
  id: string;
  title: string;
  image: Image;
  lat: number;
  lon: number;
}

interface PlacesProps {
  title: string;
  places: Place[];
  isLoading?: boolean;
  loadingText?: string;
  fallbackText: string;
  onSelectPlace: (place: Place) => void;
}

const Places = ({
  title,
  places,
  isLoading,
  loadingText,
  fallbackText,
  onSelectPlace,
}: PlacesProps) => {
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {isLoading && <p className="fallback-text">{loadingText}</p>}
      {!isLoading && places && places.length === 0 && (
        <p className="fallback-text">{fallbackText}</p>
      )}
      {(!isLoading && places && places.length > 0) && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img
                  src={`http://localhost:8080/images/${place.image.src}`}
                  alt={place.image.alt}
                />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Places;
