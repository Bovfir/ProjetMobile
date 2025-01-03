import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function LocationRequest() {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission de localisation refusée');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if(reverseGeocode && reverseGeocode.length > 0) {
        setCity(reverseGeocode[0].city);
      }
    })();
  }, []);

  return { location, city, errorMsg };
}
