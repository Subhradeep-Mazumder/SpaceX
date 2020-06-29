import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Twitter from '../twitter.png';
import Loading from "./loading";



function Missions(props) {
    const [info, setInfo] = useState(null);
    const [isInfoLoaded, setIsInfoLoaded] = useState(false);
    useEffect(() => {
        axios.get("https://api.spacexdata.com/v3/missions")
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
       <div className="missions_page">
           {isInfoLoaded
            ? info.map((mission, index) => <div className="missions_wrapper" key={`mission_${index}`}>
                <div className="missions_name">{(mission["mission_name"])?mission["mission_name"]:"Not Available"}</div>
                <div className="missions_descrip">{(mission["description"])?mission["description"]:"Not Available"}</div>
                <div className="missions_website">Website: <a href={mission["website"]}>{(mission["website"])?mission["website"]:"Not Available"}</a></div>
                <div className="missions_follow">
                    <span >Follow mission: </span>
                    <a href={mission["twitter"]}><img className="follow_img" src={Twitter}></img></a>
                </div>
            </div>)
            :   <Loading></Loading>
            }
       </div>
        );
}

export default Missions;