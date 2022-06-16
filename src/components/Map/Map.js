import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useRef } from 'react';
import s from './Map.module.css';
import { defaultTheme } from './Theme';
import { CurrentLocationMarker } from '../CurrentLocationMarker/CurrentLocationMarker';

const containerStyle = {
  width: '700px',
  height: '700px',
};

const defaultOption = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: true,
  clickableIcons: false,
  keyBoardShortcuts: false,
  disableDoubleClickZoom: true,
  fullScreenControl: false,
  styles: defaultTheme,
};

export const MODE = {
  MOVE: 0,
  SET_MARKER: 1,
};

export const Map = ({ center, mode, markers, onMarkerAdd }) => {
  const mapRef = useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  const onClick = loc => {
    if (mode === MODE.SET_MARKER) {
      const lat = loc.latLng.lat();
      const lng = loc.latLng.lng();
      console.log(loc);
      console.log({ lat, lng });
      onMarkerAdd({ lat, lng });
    }
  };

  return (
    <div className={s.conteiner}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOption}
        onClick={onClick}
      >
        <CurrentLocationMarker positions={center} />

        {markers.map(pos => {
          return (
            <Marker
              position={pos}
              // icon={{ url: '/gps-location-maps.svg' }}
              label={{
                text: 'You are here',
                // className: s.text,
                fontSize: '24px',
                color: 'red',
              }}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
};
