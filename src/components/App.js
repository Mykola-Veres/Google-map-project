import { useJsApiLoader } from '@react-google-maps/api';
import { Map } from './Map/Map';
import s from './App.module.css';
import { Autocomplete } from './Autocomplete';
import { useState } from 'react';
import { useCallback } from 'react';
import { MODE } from './Map/Map';
import { useEffect } from 'react';
import { getBrowerLocation } from 'utils/geo';

const API_KEY = process.env.REACT_APP_API_KEY;

const initialValue = {
  lat: -3.745,
  lng: -51.523,
};

const libraries = ['places'];

export const App = () => {
  const [center, setCenter] = useState(initialValue);
  const [mode, setMode] = useState(MODE.MOVE);
  const [marker, setMarker] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const onPlaceSelect = useCallback(coordinates => {
    setCenter(coordinates);
  }, []);

  const toggleMode = () => {
    switch (mode) {
      case MODE.MOVE:
        setMode(MODE.SET_MARKER);
        break;
      case MODE.SET_MARKER:
        setMode(MODE.MOVE);
        break;
      default:
        setMode(MODE.MOVE);
    }
    console.log(mode);
  };

  const onMarkerAdd = coordinates => {
    setMarker([...marker, coordinates]);
  };

  const onClearMarker = () => {
    setMarker([]);
  };

  useEffect(() => {
    getBrowerLocation()
      .then(curLoc => {
        setCenter(curLoc);
      })
      .catch(() => {
        setCenter(initialValue);
      });
  }, []);

  return (
    <div
    // className="App"
    >
      <div className={s.addressSerchConteiner}>
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
        <button className={s.btnMarker} onClick={toggleMode}>
          Set markers
        </button>
        <button className={s.btnMarker} onClick={onClearMarker}>
          Clear Markers
        </button>
      </div>
      {isLoaded ? (
        <Map
          center={center}
          mode={mode}
          markers={marker}
          onMarkerAdd={onMarkerAdd}
        />
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
};
