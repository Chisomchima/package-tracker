import { useMemo, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";
import io from "socket.io-client"
const socket = io.connect("http://localhost:5000/")
import styles from "../styles/Customer.module.css";

export default function Map({
  deliveryDetails,
  onLoad,
  currentLocation,
}) {
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
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};

  const fetchDirections = (position) => {
    if (!deliveryDetails && !currentLocation) return;
    console.log(deliveryDetails, 'chisom')
    const service = new google.maps.DirectionsService();
    // console.log(packageDetails.from_location, 'packageDetails.from_location')
    service.route(
      {
        origin: position,
        destination: deliveryDetails?.package_id.to_location,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
        console.log(result, 'res')
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
        {currentLocation && (
          <>
            <Marker position={currentLocation}  icon={icon} onclick={fetchDirections(currentLocation)}/>
          </>
        )}
      </GoogleMap>
    </div>
  );
}
