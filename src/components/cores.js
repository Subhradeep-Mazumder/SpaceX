import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./loading";



function Cores(props) {
    const [info, setInfo] = useState(null);
    const [isInfoLoaded, setIsInfoLoaded] = useState(false);
    useEffect(() => {
        axios.get("https://api.spacexdata.com/v3/cores")
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
       <div className="cores_page">
           {isInfoLoaded
            ? info.map((core, index) => <div className="cores_wrapper" key={`core_${index}`}>
                <div className="cores_name">{core["core_serial"]}</div>
                <div className="cores_info">
                    <div>Status: {(core["status"])?core["status"]:"N/A"} </div>
                    <div>Missions: {(core["missions"].length)?core["missions"].map((items)=>items["name"]):"N/A"}</div>
                    <div>Details:</div>
                </div>
                <div className="cores_descrip">{(core["details"])?core["details"]:"No Details Available"}</div>
                
            </div>)
            :   <Loading></Loading>
            }
       </div>
        );
}

export default Cores;