import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

const PackageForm = () => {
  const [deliveries, setdeliveries] = useState([])
  const [deliveryId, setDeliveryId] = useState('')
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [height, setHeight] = useState("");
  const [fromName, setFromName] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toName, setToName] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [fromLocation, setFromLocation] = useState({ lat: "", lng: "" });
  const [toLocation, setToLocation] = useState({ lat: "", lng: "" });

  useEffect(()=> {
    const getDelivery = async () => {
        try{
            const res = await axios.get('https://package-tracker-j0qm.onrender.com/api/delivery')
            setdeliveries(res.data)
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
    getDelivery()
}, [])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const packageData = {
      description,
      weight,
      width,
      depth,
      height,
      // active_delivery_id: deliveryId, 
      from_name: fromName,
      from_address: fromAddress,
      to_name: toName,
      to_address: toAddress,
      from_location: fromLocation,
      to_location: toLocation,
    };
    console.log(packageData);
    // Here you can make a POST request to your API to create the package with the packageData
    try {
      const res = await axios.post(
        `https://package-tracker-j0qm.onrender.com/api/package/`, packageData
      );
      toast("Successfully created a package", {
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
      <h1 className="text-dark">Create A Package</h1>
      <div className="container bg-dark p-5 m-2 w-75 h-75">
        <form onSubmit={handleSubmit}>
        {/* <div class="form-group">
            <label htmlFor="status">Delivery:</label>
            <select
              id="deliveryid"
              value={deliveryId}
              className="form-control"
              onChange={(e) => setDeliveryId(e.target.value)}
            >
              {deliveries.map((deliveryval) => (
                <option key={deliveryval._id} value={deliveryval._id}>
                  {deliveryval._id}
                </option>
              ))}
            </select>
          </div> */}
          <div className="row">
            <div className="form-group col-4">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group col-4">
              <label htmlFor="weight">Weight:</label>
              <input
                type="number"
                id="weight"
                value={weight}
                className="form-control"
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="form-group col-4">
              <label htmlFor="width">Width:</label>
              <input
                type="number"
                id="width"
                value={width}
                className="form-control"
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-6">
              <label htmlFor="depth">Depth:</label>
              <input
                type="number"
                id="depth"
                value={depth}
                className="form-control"
                onChange={(e) => setDepth(e.target.value)}
              />
            </div>

            <div className="form-group col-6">
              <label htmlFor="height">Height:</label>
              <input
                type="number"
                id="height"
                value={height}
                className="form-control"
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-4">
              <label htmlFor="fromName">From Name:</label>
              <input
                type="text"
                id="fromName"
                value={fromName}
                className="form-control"
                onChange={(e) => setFromName(e.target.value)}
              />
            </div>
            <div className="form-group col-4">
              <label htmlFor="fromAddress">From Address:</label>
              <input
                type="text"
                id="fromAddress"
                value={fromAddress}
                className="form-control"
                onChange={(e) => setFromAddress(e.target.value)}
              />
            </div>

            <div className="form-group col-4">
              <label htmlFor="toName">To Name:</label>
              <input
                type="text"
                id="toName"
                value={toName}
                className="form-control"
                onChange={(e) => setToName(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-6">
              <label htmlFor="toAddress">To Address:</label>
              <input
                type="text"
                id="toAddress"
                value={toAddress}
                className="form-control"
                onChange={(e) => setToAddress(e.target.value)}
              />
            </div>

            <div className="form-group col-6">
              <label htmlFor="fromLat">From Latitude:</label>
              <input
                type="number"
                id="fromLat"
                value={fromLocation.lat}
                className="form-control"
                onChange={(e) =>
                  setFromLocation({ ...fromLocation, lat: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="fromLng">From Longitude:</label>
            <input
              type="number"
              id="fromLng"
              value={fromLocation.lng}
              className="form-control"
              onChange={(e) =>
                setFromLocation({ ...fromLocation, lng: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="fromLat">To Latitude:</label>
            <input
              type="number"
              id="fromLat"
              value={toLocation.lat}
              className="form-control"
              onChange={(e) =>
                setToLocation({ ...toLocation, lat: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="fromLng">To Longitude:</label>
            <input
              type="number"
              id="fromLng"
              value={toLocation.lng}
              className="form-control"
              onChange={(e) =>
                setToLocation({ ...toLocation, lng: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-outline-secondary mt-3">
            Create Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default PackageForm;
