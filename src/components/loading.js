import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";



function Loading() {
   
    return (
       <div className="loading_wrapper">
        <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className="loading_text">Loading</div>
        </div>
        );
}

export default Loading;