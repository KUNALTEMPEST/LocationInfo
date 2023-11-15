import React from "react"
import {Route, Routes} from "react-router-dom"
import Location from "./Location.jsx"
import Postal from "./Postal.jsx"

function App(){
    return(
        <div>
            <Routes>
                <Route exact path="/" element={<Postal />} />
                <Route exact path="https://locationdetail-fbf60.web.app/" element={<Postal />} />
            </Routes>
        </div>
    )

}

export default App;