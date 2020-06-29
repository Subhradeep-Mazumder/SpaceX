import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import video from "../videoplayback.mp4"
import Elen from "../elen-mask.jpg";
import Loading from "./loading";


function Home() {
    const [info, setInfo] = useState(null);
    const [isInfoLoaded, setIsInfoLoaded] = useState(false);
    useEffect(() => {
        axios.get("https://api.spacexdata.com/v3/info")
            .then((res) => {
                setInfo(res.data);
                setIsInfoLoaded(true);
            }).catch(() => {
                toast.error(
                    <div style={{ textAlign: "center" }}> Failed to load company info</div>
                );
            })
    }, [])

    return (
       <div className="home">
           {isInfoLoaded
            ? <div>
               <video className="home-video" autoPlay={true} loop={true} >
                    <source src={video} type="video/mp4"/>
                </video>
                <div className="textovervideo">
                    <div className="spacextag">SPACE-X</div>
                    <div className="summary"><p>{info["summary"]}</p></div>
                </div>
                <div className="founder">
                    <div className="founder-bio">
                        <h2>Founder</h2>
                        <p>Elon Musk is a South African-born American entrepreneur and businessman who founded X.com in 1999 , SpaceX in 2002 and Tesla Motors in 2003. Musk became a multimillionaire in his late 20s when he sold his start-up company, Zip2, to a division of Compaq Computers. 

Musk made headlines in May 2012, when SpaceX launched a rocket that would send the first commercial vehicle to the International Space Station. He bolstered his portfolio with the purchase of SolarCity in 2016, and cemented his standing as a leader of industry by taking on an advisory role in the early days of President Donald Trump's administration.</p></div>
                    <img className="founder-img" src={Elen} >
                    </img>
                </div>
            </div>
            :   <Loading></Loading>
            }
       </div>
        );
}

export default Home;