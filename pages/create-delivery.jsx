import axios from 'axios'
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
const statusEnum = ["open", "picked-up", "in-transit", "delivered", "failed"];

const DeliveryForm = () => {
    const [packages, setpackages] = useState([])
  const [packageId, setPackageId] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [status, setStatus] = useState("open");

useEffect(()=> {
    const getPagckages = async () => {
        try{
            const res = await axios.get('https://package-tracker-j0qm.onrender.com/api/package')
            setpackages(res.data)
            console.log(res.data)
        } catch(err) {
            console.log(err);
            toast("something went wrong", {
              hideProgressBar: false,
              autoClose: 2000,
              type: "error",
            });
        }
    } 
    getPagckages()
}, [])
  const handleSubmit = async(e) => {
    e.preventDefault();
    const deliveryData = {
      package_id: packageId,
      pickup_time: pickupTime,
      start_time: startTime,
      end_time: endTime,
      location,
      status,
    };
    console.log(deliveryData);
    // Here you can make a POST request to your API to create the delivery with the deliveryData
    try {
        const res = await axios.post(
          `https://package-tracker-j0qm.onrender.com/api/delivery`, deliveryData
        );
        toast("Successfully created a delivery", {
          hideProgressBar: false,
          autoClose: 2000,
          type: "success",
        });
        // setRows(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
        toast("something went wrong", {
          hideProgressBar: false,
          autoClose: 2000,
          type: "error",
        });
      }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "white",
      }}
    >
      <h1 className="text-dark">Create A delivery</h1>
      <div className="container bg-dark p-5 m-2 w-75 h-75">
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label htmlFor="status">Package:</label>
            <select
              id="packageid"
              value={packageId}
              className="form-control"
              onChange={(e) => setPackageId(e.target.value)}
            >
              {packages.map((packagesval) => (
                <option key={packagesval.from_name} value={packagesval._id}>
                  {packagesval.from_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pickupTime">Pickup Time:</label>
            <input
              type="datetime-local"
              id="pickupTime"
              value={pickupTime}
              className="form-control"
              onChange={(e) => setPickupTime(e.target.value)}
            />
          </div>

          <div class="form-group">
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              className="form-control"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div class="form-group">
            <label htmlFor="endTime">End Time:</label>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              className="form-control"
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <div class="form-group">
            <label htmlFor="lat">Latitude:</label>
            <input
              type="number"
              id="lat"
              value={location.lat}
              className="form-control"
              onChange={(e) =>
                setLocation({ ...location, lat: e.target.value })
              }
            />
          </div>

          <div class="form-group">
            <label htmlFor="lng">Longitude:</label>
            <input
              type="number"
              id="lng"
              value={location.lng}
              className="form-control"
              onChange={(e) =>
                setLocation({ ...location, lng: e.target.value })
              }
            />
          </div>

          <div class="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              className="form-control"
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusEnum.map((statusValue) => (
                <option key={statusValue} value={statusValue}>
                  {statusValue}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-outline-secondary mt-3">
            Create Delivery
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryForm;
