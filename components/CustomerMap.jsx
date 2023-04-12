import { useMemo, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";
import styles from "../styles/Customer.module.css";

export default function Map({ packageDetails, onLoad, currentDriverLocation }) {
  const center = useMemo(() => ({ lat: 9.0765, lng: 7.3986 }), []);
  const [directions, setDirections] = useState(null);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const icon = {
    url: "/food-delivery.png", // url
    scaledSize: new google.maps.Size(50, 50), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  };

  const fetchDirections = (position) => {
    if (!packageDetails && !currentDriverLocation) return;
    // console.log(deliveryDetails, "chisom");
    const service = new google.maps.DirectionsService();

    service.route(
      {
        origin: currentDriverLocation,
        destination: packageDetails?.to_location,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
        console.log(result, "res");
      }
    );
  };

  return (
    <div className={styles.map}>
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: "#1976D2",
                strokeWeight: 5,
              },
            }}
          />
        )}
        {currentDriverLocation && (
          <>
            <Marker
              position={currentDriverLocation}
              icon={icon}
              onclick={fetchDirections(currentDriverLocation)}
            />
          </>
        )}
      </GoogleMap>
    </div>
  );
}
