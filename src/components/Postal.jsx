import React from "react";
import Location from "./Location";


export const userContext = React.createContext();

function Postal(){
    
    const [isLoading, setLoadingState] = React.useState(false);
    const [postalCodeState, setPostalCodeState] = React.useState({
        state: "",
        error: ""
    });

    const POSTAL_API = 'https://api.zippopotam.us/in/';

    function getPromise(URL, postalCode){
        const promise = new Promise((resolve, reject)=>{
            let req = new XMLHttpRequest();
            const newURL = URL+postalCode;
            req.open("GET", newURL);
            req.onload = ()=>{
                if(req.status === 200){
                    resolve(req.response);
                }else{
                    reject("Please try another postal code");
                }
            };
            req.send();
        })
        return promise;
    }

    function handlePostalSubmit(event){
        event.preventDefault();
        const postal_code =  event.target['postal_code'].value;
        // console.log("Postal Code : ", postal_code);
        if(postal_code !== ""){
            let postalPromise = getPromise(POSTAL_API, postal_code);
            setLoadingState(true);
            postalPromise.then((result)=>{
                if((result !== '') || (result !== "sd")){
                    setPostalCodeState({error:"", state: result});
                    setLoadingState(false);
                    // console.log("Object: ");
                    // console.log(JSON.parse(result));
                }
            })
            .catch((error)=>{setPostalCodeState({error: error, state: ""});setLoadingState(false);})
        }else{
            setPostalCodeState({state: "", error: ""});
        }
    }

    function handleClear(event){
        // window.location.reload(true);
        setPostalCodeState({state: "", error: ""});
        document.getElementById("postal_inputID").value = "";
    }

    function showLoading(){
        if(isLoading === true){
            return(
                <div className="loading-div">
                    <h1 className="loading-text">.....LOADING.....</h1>
                </div>
            );
        }
    }

    // console.log(postalCodeState)

    return(
        <div>
            <section>
                <div className="header-div">
                    <h1 className="header-name" onClick={()=>{window.location.reload(true)}}>Zip Code Information App</h1>
                </div>
            </section>

            {/* postal middle section */}
            <section className="Postal-MiddlePart">
                {showLoading()};
                <form action="" method="post" onSubmit={(event)=>{handlePostalSubmit(event)}}>
                    <div className="postal-form-div col-11 col-lg-11 col-md-11 col-sm-11">
                        <span className="">
                            <label htmlFor="postal_inputID" className="postal-label">Enter postal code: </label>
                        </span>
                        <span className="">
                            <input id="postal_inputID" name="postal_code" className="postal-code-input" type="text" />
                            <span className="postal-submitbtn-div">
                                <button type="submit" className="postal-submit-btn btn">Search</button>
                            </span>
                            <span className="postal-submitbtn-div">
                                <button onClick={(event)=>{handleClear(event)}} className="postal-submit-btn btn">Clear</button>
                            </span>
                        </span>
                    </div>
                </form>
                {(postalCodeState.error!=="")&&<p className="postal-error" id="postalErrorID">!!! {postalCodeState.error}</p>}
            </section>
            
            <section>
                <userContext.Provider value={postalCodeState}>
                    <Location />
                </userContext.Provider>
            </section>
        </div>
    )
}
export default Postal;