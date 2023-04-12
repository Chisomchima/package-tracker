import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "from_address", headerName: "From", width: 150 },
  { field: "to_address", headerName: "To", width: 150 },
  { field: "from_name", headerName: "Sender", width: 100 },
  {
    field: "to_name",
    headerName: "Reciever",
    type: "number",
    width: 100,
  },
  { field: "active_delivery_id", headerName: "Delivery ID", width: 250 },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(
          `https://package-tracker-j0qm.onrender.com/api/package`
        );
        setRows(res.data);
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
    fetchPackage();
  }, []);
  return (
    <div style={{ display: "flex", height: "90vh" }}>
      <div
        style={{
          height: "100%",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "black",
        }}
      >
        <Link href="/delivery-list">
          <a
            style={{
              textDecoration: "none",
              padding: "10px",
              margin: "10px",
              backgroundColor: "grey",
              color: "white",
            }}
          >
            Delivery List
          </a>
        </Link>
        <Link href="/package-list">
          <a
            style={{
              textDecoration: "none",
              padding: "10px",
              margin: "10px",
              backgroundColor: "grey",
              color: "white",
            }}
          >
            Package List
          </a>
        </Link>
      </div>
      <div style={{ height: 400, flex: 3, height: "70%", padding: "50px" }}>
        <div className="d-flex mb-3 align-items-center justify-content-between">
          <h1>Package List</h1>
          <Link href="/create-package">
            <a
              style={{
                textDecoration: "none",
                padding: "10px",
                margin: "10px",
                backgroundColor: "grey",
                color: "white",
              }}
            >
              Add new Package
            </a>
          </Link>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          getRowId={(el) => el._id}
        />
      </div>
    </div>
  );
}
