import { Place } from "./components/Places";

const toRad = (value: number) => {
  return (value * Math.PI) / 180;
}

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R: number = 6371;
  const dLat: number = toRad(lat2 - lat1);
  const dLon: number = toRad(lng2 - lng1);
  const l1: number = toRad(lat1);
  const l2: number = toRad(lat2);

  const a: number =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(l1) * Math.cos(l2);
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d: number = R * c;

  return d;
}

export const sortPlacesByDistance = (places: Place[], lat: number, lon: number) => {
  const sortedPlaces: Place[] = [...places];
  
  sortedPlaces.sort((placeA, placeB) => {
    const distanceA: number = calculateDistance(lat, lon, placeA.lat, placeA.lon);
    const distanceB: number = calculateDistance(lat, lon, placeB.lat, placeB.lon);
    return distanceA - distanceB;
  });

  return sortedPlaces;
}