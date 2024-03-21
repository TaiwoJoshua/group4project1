import React from 'react';
import { FaCheck, FaSpinner, FaWifi } from 'react-icons/fa6';
import "./Offline.css";
import { LiaCheckCircle, LiaExclamationTriangleSolid, LiaTimesSolid } from 'react-icons/lia';
import { useNavigate, useSearchParams } from 'react-router-dom';

// External Controller

// React.useEffect(() => {
//     function changeStatus() {
//         if(!navigator.onLine){
//             localStorage.setItem("lilyOfflinePath", path === "/offline" ? localStorage.getItem("lilyOfflinePath") : path);
//             navigate(`/offline?redirectTo=${localStorage.getItem("lilyOfflinePath")}`);
//         }
//     }
//     if(!navigator.onLine){
//         localStorage.setItem("lilyOfflinePath", path === "/offline" ? localStorage.getItem("lilyOfflinePath") : path);
//         navigate(`/offline?redirectTo=${localStorage.getItem("lilyOfflinePath")}`);
//     }
//     window.addEventListener("offline", changeStatus);
//     return () => {
//       window.removeEventListener("offline", changeStatus);
//     };
// }, [navigate, path]);


function Offline() {
    const [transitionOnline, setTransitionOnline] = React.useState(false);
    const [connect, setConnect] = React.useState(false);
    const navigate = useNavigate();
    const redirectTo = useSearchParams()[0].get("redirectTo");

    function handleConnect(type){
        setConnect(true);
        setTimeout(() => {
            setConnect(type);
            setTimeout(() => {
                setConnect(false);
            }, 2000);
        }, 5000);
    }

    React.useEffect(() => {
        function changeStatus() {
            handleConnect("success");
            setTimeout(() => {
                setTransitionOnline(true);
                setTimeout(() => {
                    navigate(redirectTo ? redirectTo : "/");
                    setTimeout(() => {
                        setTransitionOnline(false);
                    }, 2000);
                }, 2000);
            }, 5000);
        }
        if(navigator.onLine){
            changeStatus();
        }
        window.addEventListener("online", changeStatus);
        return () => {
          window.removeEventListener("online", changeStatus);
        };
    }, [navigate, redirectTo]);

    const redbg = {backgroundColor: "red"};
    const greenbg = {backgroundColor: "green"};

    return (
        <section className='offline'>
            <h1 className="heading" style={{fontSize: "3em"}}>
                {
                transitionOnline 
                ? 
                <span><FaWifi /><FaCheck className='times' style={{color: "green"}} /></span> 
                : 
                <span><FaWifi /><LiaTimesSolid className='times' /></span> 
                }
            </h1>
            <h1 className='heading' style={{fontSize: "2.5em"}}>{transitionOnline ? "Online" : "Offline"}</h1>
            <p>{connect ? connect === "success" ? "Restoring Page..." : "Attempting to Reconnect..." : "Please check your internet connection"}</p>
            <button className="button" onClick={() => handleConnect("failed")} disabled={connect} style={connect === "failed" ? redbg : connect === "success" ? greenbg : null}>
                {
                    connect 
                    ? 
                        connect === "failed" 
                        ? 
                        <span style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <LiaExclamationTriangleSolid style={{marginRight: "5px", fontSize: "1.2em"}} /> Failed
                        </span> 
                        : 
                            connect === "success" 
                            ? 
                            <span style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <LiaCheckCircle style={{marginRight: "5px", fontSize: "1.2em"}} /> Success
                            </span>
                            :
                            <span style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <FaSpinner className='spinner' style={{marginRight: "5px"}} /> Reconnecting...
                            </span> 
                    : 
                    "Try Again"
                }
            </button>
        </section>
    );
}

export default Offline;