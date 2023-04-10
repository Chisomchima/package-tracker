
import Link from "next/link";
import {useState, useEffect} from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns = [
  { field: "_id", headerName: "ID", width: 200 },
  { field: "package_id", headerName: "Package ID", width: 200 },
  { field: "pickup_time", headerName: "Pickup Time", width: 150 },
  { field: "end_time", headerName: "End Time", width: 150 },
  {
    field: "status",
    headerName: "Status",
    type: "number",
    width: 150,
  },
];


export default function DataTable() {

   const [rows, setRows] = useState([])

   useEffect(()=> {
    const fetchDelivery = async () => {
      try {
          const res = await axios.get(
            `https://package-tracker-j0qm.onrender.com/api/delivery`
          );
          setRows(res.data);
            console.log(res.data)
      } catch (err) {
        console.log(err);
        toast("something went wrong", {
          hideProgressBar: false,
          autoClose: 2000,
          type: "error",
        });
      }
    };
    fetchDelivery()
   }, [])
  return (
    <div style={{ display: "flex", height: "90vh" }}>
      <div style={{ height: "100%", flex: 1, display: "flex", alignItems:'center', justifyContent:'center', flexDirection: "column", backgroundColor: "black" }}>
      <Link href="/delivery-list">
          <a style={{ textDecoration: "none", padding: "10px", margin:"10px", backgroundColor: "grey", color: "white" }}>Delivery List</a>
        </Link>
        <Link href="/package-list">
          <a style={{ textDecoration: "none", padding: "10px", margin:"10px", backgroundColor: "grey", color: "white" }}>Package List</a>
        </Link>
      </div>
      <div style={{ height: 400, flex: 3, height: "70%", padding: "50px" }}>
      <div className="d-flex mb-3 align-items-center justify-content-between">
          <h1>Delivery List</h1>
          <button className="btn btn-secondary">Add new Delivery</button>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={10}
          disableSelectionOnClick
          getRowId={(el)=> el._id}
        />
      </div>
    </div>
  );
}
