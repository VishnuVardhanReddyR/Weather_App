import React from "react";

const Weather = (props) => {
    return (
        <div className="container text-light">
            <div className="cards pt-4">
                <h1>
                    {props.city}
                </h1>
                {props.lat? (<h5> <b>Lattitude</b> - {props.lat}, <b>Longitude</b> - {props.long}</h5>) : null}
                <h5 className="py4">
                    <i className={`wi ${props.weatherIcon} display-1`}></i>
                </h5>
                {props.temp_celsius? (<h1 className="py2"><small>Temperature in celsius</small> - {props.temp_celsius}&deg;</h1>) : null }
                {minmaxTemp(props.temp_min,props.temp_max)}
                {props.description? (<h4 className="py-3"> <small>Weather condition is</small> <b>{props.description}</b> </h4>): null}
            </div>
        </div>
    );
};

function minmaxTemp(min,max){
    if(min && max){
    return(
        <h3>
            <span className="px-4">min - {min}&deg;</span>
            <span className="px-4">max - {max}&deg;</span>
        </h3>
    );
    }
}

export default Weather;