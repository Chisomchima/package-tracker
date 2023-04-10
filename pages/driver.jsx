import styles from "../styles/Customer.module.css";
import DriverSidebar from "../components/SideBarDriver";
import { useState, useEffect, useCallback, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";
import io from "socket.io-client";
const socket = io.connect("https://package-tracker-j0qm.onrender.com");
import Map from "../components/DriverMap";
import axios from "axios";
import { toast } from "react-toastify";

export default function Customer() {
  const [deliveryId, setDeliveryId] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
  });

  useEffect(() => {
    // Update the position of the marker every 20000ms
    const interval = setInterval(() => {
       // this is the functionality for getting driver current locationlocation setting
      navigator.geolocation.watchPosition(successCallback, errorCallback);
      console.log(currentLocation, "currentLocation");
      // emit the location_changed event
      if (currentLocation) {
        socket.emit("location_changed", {
          deliveryId: deliveryId,
          location: currentLocation,
        });
        socket.on("location_updated", (data)=>{
          toast("Delivery location has bean updated", {
              hideProgressBar: false,
              autoClose: 3000,
              type: "success",
            })
            console.log(data,'emmited data')
      })
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [currentLocation]);

  const successCallback = (position) => {
    const coords = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentLocation(coords);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  const fetchDeliveryById = async (id) => {
    try {
      if (id !== undefined) {
        const res = await axios.get(
          `https://package-tracker-j0qm.onrender.com/api/delivery/find/${id}`
        );
        setDeliveryDetails(res.data);
      }
    } catch (err) {
      console.log(err);
      toast("something went wrong", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetchDeliveryById(deliveryId);
      mapRef?.current?.panTo(currentLocation);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <DriverSidebar
          deliveryId={deliveryId}
          deliveryDetails={deliveryDetails}
          setDeliveryId={setDeliveryId}
          setDeliveryDetails={setDeliveryDetails}
          handleSubmit={handleSubmit}
        />
      </div>
      {!isLoaded ? (
        <div className={styles.map}>Loading...</div>
      ) : (
        <div className={styles.map}>
          <Map
            styles={{ width: "100%" }}
            deliveryDetails={deliveryDetails}
            onLoad={onLoad}
            currentLocation={currentLocation}
          />
        </div>
      )}
    </div>
  );
}
