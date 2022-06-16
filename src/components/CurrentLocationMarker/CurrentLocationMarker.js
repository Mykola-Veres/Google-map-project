import { Marker } from '@react-google-maps/api';
// import s from './Current.module.css';

export const CurrentLocationMarker = ({ positions }) => {
  return (
    <Marker
      position={positions}
      icon={{ url: '/gps-location-maps.svg' }}
      label={{
        text: 'you are here',
        // className: s.text,
        fontSize: '24px',
        color: 'red',
      }}
    />
  );
};
