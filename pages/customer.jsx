import styles from "../styles/Customer.module.css";
import CustomerSideBar from "../components/SideBarCustomer";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  useLoadScript,
  Marker,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Map from "../components/CustomerMap";
import axios from "axios";
import { toast } from "react-toastify";
import io from "socket.io-client";
const socket = io.connect("https://package-tracker-j0qm.onrender.com");

export default function Customer() {
  const [packageId, setPackageId] = useState("");
  const [packageDetails, setPackageDetails] = useState(null);
  const [currentDriverLocation, setCurrentDriverLocation] = useState(null);
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
  });

  useEffect(() => {
    socket.on(
      "location_updated",
      (data) => {
        toast("Delivery location has been updated", {
          hideProgressBar: false,
          autoClose: 3000,
          type: "success",
        });
        console.log(data, "emmited data");
        mapRef?.current?.panTo(data?.location);
        setCurrentDriverLocation(data?.location)
      },
  
    );
  },[]);

  const fetchPackageById = async (id) => {
    try {
      if (id !== undefined) {
        const res = await axios.get(
          `https://package-tracker-j0qm.onrender.com/api/package/find/${id}`
        );
        setPackageDetails(res.data);
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
      await fetchPackageById(packageId);
      // mapRef?.current?.panTo(currentDriverLocation);
      // console.log(currentDriverLocation, packageDetails, 'currentdriverlocs')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <CustomerSideBar
          packageId={packageId}
          packageDetails={packageDetails}
          setPackageId={setPackageId}
          handleSubmit={handleSubmit}
        />
      </div>
      {!isLoaded ? (
        <div className={styles.map}>Loading...</div>
      ) : (
        <div className={styles.map}>
          <Map
            styles={{ width: "100%" }}
            packageDetails={packageDetails}
            onLoad={onLoad}
            currentDriverLocation={currentDriverLocation}
          />
        </div>
      )}
    </div>
  );
}
