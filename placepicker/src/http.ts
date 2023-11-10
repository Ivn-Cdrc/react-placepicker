// every function declared with async will return a promise
export const fetchAvailablePlaces = async () => {
  const response = await fetch("http://localhost:8080/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return resData;
};
