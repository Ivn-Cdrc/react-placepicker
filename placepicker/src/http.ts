import { Place } from "./components/Places";

// every function declared with async will return a promise
export const fetchAvailablePlaces = async () => {
  const response = await fetch("http://localhost:8080/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return resData;
};

export const updateUserPlaces = async (places: Place[]) => {
  console.log(JSON.stringify(places));

  // fetch can be also be used for PUT requests
  const response = await fetch('http://localhost:8080/user-places', {
    method: 'PUT',
    body: JSON.stringify({places: places}),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const resData = await response.json();

  if(!response.ok) {
    throw new Error('Failed to update user data.')
  }

  return resData.message;
}

export const fetchUserPlaces = async () => {
  const response = await fetch("http://localhost:8080/user-places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }

  return resData;
};
