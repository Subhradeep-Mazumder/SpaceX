import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FalconBig from "../Big Falcon Rocketmain.jpg";
import Falcon1 from "../Falcon 1 Rocket.jpg";
import Falcon9 from "../Falcon 9 Rocket.jpg";
import FalconHeavy from "../Falcon heavy Rocket.jpg";
import Loading from "./loading";

function Rockets(props) {
    const [info, setInfo] = useState(null);
    const [isInfoLoaded, setIsInfoLoaded] = useState(false);
    useEffect(() => {
        axios.get("https://api.spacexdata.com/v3/rockets")
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
        <div className="rockets_page">
            <div className="rockets_images_wrapper">
                <img className="rocket_img falcon1" src={Falcon1}></img>
                <img className="rocket_img falcon9" src={Falcon9}></img>
                <img className="rocket_img falconheavy" src={FalconHeavy}></img>
                <img className="rocket_img falconbig" src={FalconBig}></img>
            </div>
            <div className="rocket_details" id="details">
                {isInfoLoaded
                    ? info.map((rocket, index) => <div className="rockets_wrapper" key={`rocket_${index}`}>
                        <div className="rockets_name">{rocket["rocket_name"]}</div>
                        <div className="rockets_info">
                            <div>Height: {rocket["height"]["meters"]} Meter</div>
                            <div>Mass: {rocket["mass"]["kg"]} Kg</div>
                            <div>Diameter: {rocket["diameter"]["meters"]} Meter</div>
                            <div>First Flight: {rocket["first_flight"]} </div>
                        </div>
                        <div className="rockets_descrip">{rocket["description"]}</div>
                        <div className="rockets_website">More Info: <a href={rocket["website"]}>https://www.iridiumnext.com/</a></div>
                    </div>)
                    : <Loading></Loading>
                }
            </div>
        </div>
    );
}
export default Rockets;