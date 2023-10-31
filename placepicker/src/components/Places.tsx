interface Image {
  src: string;
  alt: string;
}

export interface Place {
  id: string;
  title: string;
  image: Image;
  lat: string;
  lon: string;
}

interface PlacesProps {
  title: string;
  places: Place[];
  fallbackText: string;
  onSelectPlace: (place: Place) => void;
}

const Places = ({
  title,
  places,
  fallbackText,
  onSelectPlace,
}: PlacesProps) => {
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {(places && places.length === 0) && <p className="fallback-text">{fallbackText}</p>}
      {(places && places.length > 0) && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img
                  src={`http://localhost:3000/${place.image.src}`}
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
