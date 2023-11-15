import React from "react";
import { userContext } from "./Postal";

function Location(){
    let postal_code = React.useContext(userContext);
    if(postal_code && postal_code.state)    postal_code = JSON.parse(postal_code.state);
    // console.log(Object.keys(postal_code));
    let placesInfo = [];
    if(postal_code) placesInfo = postal_code.places;

    function displayCountry(){
        if(postal_code && postal_code.country && postal_code.country!==""){
            return(
            <div className="col-4 country-div">
                <p className="country-name">Country</p>
                <p className="country-name-value">{postal_code.country}</p>
            </div>
        )}
    }

    function displayState(){
        if(placesInfo && placesInfo[0] && placesInfo[0].state !== ""){
            return(
                <div className="col-4 state-div">
                    <p className="state-name">State</p>
                    <p className="state-name-value">{placesInfo[0].state}</p>
                </div>
            )
        }
    }

    function displayPlaceName(){
        if(placesInfo && placesInfo[0] && placesInfo[0]["place name"] !== ""){
            return(
                <div className="col-4 placeName-div">
                    <p className="placeName-name">Places Name</p> 
                {
                    placesInfo.map((place, index)=>{
                        return (
                            <p className="placeName-name-value" key={index}>{index+1}. {place["place name"]}</p>
                        )
                    }) 
                }
                </div>
            )
        }
    }

    return(
        <div className="location-div-main">
            <div className="row">
                {displayCountry()}
                {displayState()}
                {displayPlaceName()}
            </div>
        </div>
    )
}

export default Location;