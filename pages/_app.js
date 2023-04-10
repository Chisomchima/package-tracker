import { useEffect } from "react";
import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
 

useEffect(() => {
  require("bootstrap/dist/js/bootstrap.bundle.min.js");
}, []);
  return (
      <Layout>
          <Component {...pageProps} />
          <ToastContainer />
      </Layout>
  )
}

export default MyApp
