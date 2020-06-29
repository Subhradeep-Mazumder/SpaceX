import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import YouTubePlayer from "react-youtube-player";
import Loading from "./loading";



function Launches(props) {
    const [info, setInfo] = useState(null);
    const [isInfoLoaded, setIsInfoLoaded] = useState(false);
    useEffect(() => {
        axios.get("https://api.spacexdata.com/v3/launches")
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
    const opts = {
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          showinfo: 0,
          controls: 0
        },
      };
    return (
       <div className="launches_page">
           {isInfoLoaded
            ? info.map((launch, index) => <div className="launches_wrapper" key={`launch_${index}`}>
                <div className="launches_name">{launch["mission_name"]}</div>
                <div className="launches_content">
                <div className="launches_info">
                <div className="launches_year">Launch Year : {(launch["launch_year"])?launch["launch_year"]:"N/A"}</div>
                <div className="launches_Site">Launch Site : {(launch["launch_site"]["site_name_long"])?launch["launch_site"]["site_name_long"]:"N/A"}</div>
                <div className="launches_descrip">{(launch["details"])?launch["details"]:"No Details Available"}</div>
                <div className="launches_website">Article: <a href={launch["links"]["article_link"]}>{(launch["links"]["article_link"])?launch["links"]["article_link"]:"No Article Available"}</a></div>
                </div>
                {(launch["links"]["youtube_id"])?
                <div className="launches_video">
                <YouTubePlayer className="launches-player" width={400} height={400} videoId={launch["links"]["youtube_id"]} configuration={
        {
            height: 390,
            width: 640,
            showinfo: 0,
            controls: 0
        }
    } controls={false} ></YouTubePlayer>
                </div>
                :<div className="launches_video">N/A</div>
}
                </div>
            </div>)
            :   <Loading></Loading>
            }
       </div>
        );
}

export default Launches;