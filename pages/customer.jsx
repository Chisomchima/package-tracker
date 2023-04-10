import styles from "../styles/Customer.module.css";
import CustomerSideBar from "../components/SideBarCustomer";
import { useState, useEffect } from "react";
import {
  useLoadScript,
  Marker,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Map from "../components/Map";
import axios from "axios";
import { toast } from "react-toastify";
// AIzaSyBMPcFbvgjAzqQ1lVrXCas8e5gv9XZjt4E

export default function Customer() {
  const [packageId, setPackageId] = useState("");
  const [packageDetails, setPackageDetails] = useState(null);
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBMPcFbvgjAzqQ1lVrXCas8e5gv9XZjt4E",
  });

  const fetchDirections = () => {
    if (!packageDetails) return;
    // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    const service = new google.maps.DirectionsService();
    console.log(packageDetails.from_location, 'packageDetails.from_location')
    service.route(
      {
        origin: packageDetails.from_location,
        destination: packageDetails.to_location,
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
     // this is the functionality for location setting
  // const getAddress = async (dets) => {
  //   // const results = await getGeocode({ address: "Bala Kona Street" });
  //   // console.log(results, "results");
  //   const dets = await getLatLng(results[0]);
  //   setDriverLocation(dets);
  //   mapRef?.current?.panTo(dets);
  //   console.log(driverLocation);
  // };
  // // setTimeout(() => {
  //   getAddress();
  // // }, 6000);

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
    try{
      await fetchPackageById(packageId);
      await fetchDirections()
    } catch (err){
      console.log(err)
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
            directions={directions}
            setDirections={setDirections}
          />
        </div>
      )}
    </div>
  );
}
