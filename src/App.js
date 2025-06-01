import React from "react";
import {motion} from "framer-motion";
import "./App.scss";
import Shape from "./components/Shape";
import CloudNavbar from "./components/CloudNavbar";
import ParallaxScene from "./components/ParallaxScene";

function App() {
    return (
        <div>
            <CloudNavbar/>

            <div className="app">
                <motion.h1
                    initial={{y: -100, opacity: 0}}
                    animate={{y: 100, opacity: 1}}
                    transition={{type: "spring", stiffness: 70}}
                >
                    EVERY CHILD <Shape type="spike"/> IS UNIQUE <Shape type="circle"/> AND <br/> DESERVES TO EXPRESS
                    THEIR <br/> INDIVIDUALITY THROUGH <Shape type="star"/> FASHION
                </motion.h1>
            </div>

            <ParallaxScene/>


        </div>
    );
}

export default App;
