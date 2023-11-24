import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import React, { useEffect, useRef } from "react";

const ExperimentLabsTemplateLayout = ()=>{

    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>

        </div>
    );
}

export default ExperimentLabsTemplateLayout