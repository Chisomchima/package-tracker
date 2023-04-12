import styles from "../styles/Customer.module.css";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import io from "socket.io-client";
const socket = io.connect("https://package-tracker-j0qm.onrender.com");

export default function DriverSidebar({
  handleSubmit,
  deliveryId,
  deliveryDetails,
  setDeliveryDetails,
  setDeliveryId,
}) {
  const [pickedUp, setPickedUp] = useState(true);
  const [inTransit, setIntransit] = useState(true);
  const [delivered, setDelivered] = useState(true);
  const [failed, setFailed] = useState(true);

  const changeStatus = (status) => {
    socket.emit("status_changed", { deliveryId: deliveryId, status: status });
  };

  useEffect(() => {
    // disable buttons by status
    if (deliveryDetails?.status === "open") {
      setPickedUp(false);
    }
    if (deliveryDetails?.status === "picked-up") {
      setIntransit(false);
    }
    if (deliveryDetails?.status === "in-transit") {
      setDelivered(false);
      setFailed(false);
    }

    // delivery update socket
    const deliveryUpdate = () => {
      socket.on("delivery_updated", (data) => {
        console.log(data, "emmited data");
        setDeliveryDetails(data);
        toast(`Delivery has been updated to ${data.status}`, {
          hideProgressBar: false,
          autoClose: 3000,
          type: "success",
        });
      });
    };
    deliveryUpdate();
    return () => {
      socket.disconnect();
    };
  }, [deliveryDetails]);

  return (
    <div>
      <form className="form-inline my-3 row" onSubmit={handleSubmit}>
        <div className=" d-flex col-7 mx-sm-3 mb-2">
          <input
            type="password"
            className="form-control"
            value={deliveryId}
            placeholder="Enter Delivery ID"
            onChange={(event) => {
              setDeliveryId(event.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2 col-3">
          Track
        </button>
      </form>
      {deliveryDetails && (
        <>
          <div className="card border-primary mb-3">
            <div className="card-header">Package Details</div>
            <div className="card-body text-primary">
              <h5 className="card-title"></h5>
              <div>
                <span className="text-gray">Description: </span>
                <span className="text-gray">
                  {deliveryDetails.package_id.description}
                </span>
              </div>
              <div>
                <span className="text-gray">Delivery ID: </span>
                <span className="text-gray">
                  {deliveryDetails._id}
                </span>
              </div>
              <div>
                <div>
                  <span className="text-gray">Sender: </span>
                  <span className="text-gray">
                    {deliveryDetails.package_id.from_name}
                  </span>
                </div>
                <div>
                  <span className="text-gray text-capitalize">
                    Sender Address:{" "}
                  </span>
                  <span className="text-gray">
                    {deliveryDetails.package_id.from_address}
                  </span>
                </div>
                <div>
                  <span className="text-gray text-capitalize">
                    Reciever Name:{" "}
                  </span>
                  <span className="text-gray">
                    {deliveryDetails.package_id.to_name}
                  </span>
                </div>
                <div>
                  <span className="text-gray text-capitalize">
                    Package ID:{" "}
                  </span>
                  <span className="text-gray">
                    {deliveryDetails.package_id._id}
                  </span>
                </div>
                <div>
                  <span className="text-gray text-capitalize">
                    Reciever Address:{" "}
                  </span>
                  <span className="text-gray">
                    {deliveryDetails.package_id.to_address}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-secondary mb-3">
            <div className="card-header">Delivery Details</div>
            <div className="card-body text-primary">
              <h5 className="card-title"></h5>
              <div>
                <div>
                  <span className="text-gray">Status: </span>
                  <span className="text-gray">{deliveryDetails.status}</span>
                </div>
                <div>
                  <span className="text-gray text-capitalize">
                    Pickup Time:{" "}
                  </span>
                  <span className="text-gray">
                    {deliveryDetails.pickup_time}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-column d-flex w-50">
            <button
              type="button"
              className={`btn mb-2 btn-primary ${pickedUp ? 'disable' : 'pointer'}`}
              onClick={() => changeStatus("picked-up")}
              disabled={pickedUp}
            >
              Picked Up
            </button>
            <button
              type="button"
              class="btn mb-2 btn-warning"
              onClick={() => changeStatus("in-transit")}
              disabled={inTransit}
            >
              In Transit
            </button>
            <button
              type="button"
              class="btn mb-2 btn-success"
              onClick={() => changeStatus("delivered")}
              disabled={delivered}
            >
              Delivered
            </button>
            <button
              type="button"
              class="btn mb-2 btn-danger"
              onClick={() => changeStatus("failed")}
              disabled={failed}
            >
              Failed
            </button>
          </div>
        </>
      )}
    </div>
  );
}
