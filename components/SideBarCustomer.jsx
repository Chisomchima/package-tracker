import styles from "../styles/Customer.module.css";
import { toast } from "react-toastify";

export default function CustomerSideBar({
  handleSubmit,
  setPackageId,
  packageDetails,
  packageId,
}) {
  return (
    <div>
      <form className="form-inline my-3 row" onSubmit={handleSubmit}>
        <div className=" d-flex col-7 mx-sm-3 mb-2">
          <input
            type="password"
            className="form-control"
            value={packageId}
            placeholder="Enter Package ID"
            onChange={(event) => {
              setPackageId(event.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2 col-3">
          Track
        </button>
      </form>
      {packageDetails && (
        <>
          <div className="card border-primary mb-3">
            <div className="card-header">Package Details</div>
            <div className="card-body text-primary">
              <h5 className="card-title"></h5>
              <div>
                <span className="text-gray">Description: </span>
                <span className="text-gray">
                  {packageDetails.from_name} {packageDetails.from_address}
                </span>
              </div>
              <div>
                <span className="text-gray">Package ID: </span>
                <span className="text-gray">
                  {packageDetails._id} 
                </span>
              </div>
              <div>
                <div>
                  <span className="text-gray">From: </span>
                  <span className="text-gray">
                    {packageDetails.from_name} {packageDetails.from_address}
                  </span>
                </div>
                <div>
                  <span className="text-gray text-capitalize">
                    Sender Address:{" "}
                  </span>
                  <span className="text-gray">
                    {packageDetails.from_address}
                  </span>
                </div>
                <div>
                  <span className="text-gray text-capitalize">
                    Reciever Name:{" "}
                  </span>
                  <span className="text-gray">{packageDetails.to_name}</span>
                </div>
                <div>
                  <span className="text-gray text-capitalize">
                    Reciever Address:{" "}
                  </span>
                  <span className="text-gray">{packageDetails.to_address}</span>
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
                  <span className="text-gray">
                    {packageDetails.active_delivery_id?.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray">Delivery ID: </span>
                  <span className="text-gray">
                    {packageDetails.active_delivery_id?._id}
                  </span>
                </div>
                <div>
                  <span className="text-gray text-capitalize">
                    Pickup Time:{" "}
                  </span>
                  <span className="text-gray">
                    {packageDetails.active_delivery_id?.pickup_time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
