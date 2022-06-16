const initialValue = {
  lat: -3.745,
  lng: -51.523,
};

export const getBrowerLocation = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude: lat, longitude: lng } = pos.coords;
          resolve({ lat, lng });
        },
        () => {
          reject(initialValue);
        }
      );
    } else {
      reject(initialValue);
    }
  });
};
