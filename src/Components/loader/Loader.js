import React from 'react'
import Spinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function Loader() {
    return (
        <Spinner
        type="Hearts"
        color="#e63964"
        height={100}
        width={100}
      />
    )
}
export default Loader

