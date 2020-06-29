import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./loading";



function Payloads(props) {
    const [info, setInfo] = useState(null);
    const [isInfoLoaded, setIsInfoLoaded] = useState(false);
    useEffect(() => {
        axios.get("https://api.spacexdata.com/v3/payloads")
            .then((res) => {
                let { data } = res;
                setInfo(data);
                setIsInfoLoaded(true);
            }).catch(() => {
                toast.error(
                    <div style={{ textAlign: "center" }}> Failed to load company info</div>
                );
            })
    }, [])

    return (
       <div className="payloads_page">
            {isInfoLoaded
            ? info.map((payload, index) => <div className="payloads_wrapper" key={`payload_${index}`}>
                <div className="payloads_name">{payload["payload_id"]}</div>
                <div className="payloads_info">
                    <div>Manufacturer: {(payload["manufacturer"]) ?
                        payload["manufacturer"] : "N/A"} </div>
                    <div>Customers: {(payload["customers"].length) ?
                        payload["customers"].map((items)=> items) : "N/A"}</div>
                    <div>Mass: {(payload["payload_mass_kg"])
                        ? payload["payload_mass_kg"]+"Kg" : "N/A"} </div>
                    <div>Payload Type: {(payload["payload-type"])
                        ? payload["payload-type"] : "N/A"} </div>
                </div>
                      
            </div>)
            :   <Loading></Loading>
            }
       </div>
        );
}

export default Payloads;