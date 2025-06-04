import React from "react";
import {motion} from "framer-motion";
import "./App.scss";

import Shape from "./components/Shape";
import CloudNavbar from "./components/CloudNavbar";
import ParallaxScene from "./components/ParallaxScene";
import CloudLine from "./components/CloudLine";
import KidsCarousel from "./components/KidsCarousel";
import BlueCircle from "./components/BlueCircle";
import Card from "./components/Card";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import GoShoppingButton from "./components/GoShoppingButton";

import blob1 from "./components/assets/svgs/Group.svg";
import blob2 from "./components/assets/svgs/Misc_01.svg";
import blob3 from "./components/assets/svgs/Misc_02.svg";
import blob4 from "./components/assets/svgs/Highlight_05.svg";
import blob5 from "./components/assets/svgs/Arrow_10.svg";
import blob6 from "./components/assets/svgs/Underline_07.svg";
import blob7 from "./components/assets/svgs/Highlight_08.svg";
import blob8 from "./components/assets/svgs/Highlight_11.svg";
import blob9 from "./components/assets/svgs/Misc_03.svg";
import blob10 from "./components/assets/svgs/Arrow_05.svg";

const signatureTitleStyle = {
    position: "absolute",
    top: "225%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    textAlign: "center",
};
const signatureTitleH1Style = {fontSize: "4rem", margin: 0};
const buttonWrapperStyle = {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    marginTop: "-110rem",
    marginLeft: "50rem",
};
const sampleGridStyle = (mt) => ({
    display: "flex",
    flexWrap: "wrap",
    gap: "36px",
    padding: "56px",
    marginTop: mt,
    justifyContent: "center",
});
const blobSources = [
    blob1,
    blob2,
    blob3,
    blob4,
    blob5,
    blob6,
    blob7,
    blob8,
    blob9,
    blob10,
];
const sampleItems = [
    {
        id: 1,
        imageUrl: "https://m.media-amazon.com/images/I/61S454SgKuL.jpg",
        name: "Kids T-Shirt",
        price: 19.99,
        badgeText: "NEW!",
    },
    {
        id: 2,
        imageUrl:
            "https://ih1.redbubble.net/image.208025150.3864/ra,kids_tee,x750,192033:321fc38aa7,front-pad,600x600,f8f8f8.u3.jpg",
        name: "Little Jacket",
        price: 39.99,
        badgeText: "30% OFF",
    },
    {
        id: 3,
        imageUrl:
            "https://maysharp.us/image/catalog/demo/Product%20Other/05.jpg",
        name: "Sneakers",
        price: 49.99,
        badgeText: "",
    },
    {
        id: 4,
        imageUrl:
            "https://transfigureprintco.com/cdn/shop/files/ptkregshirt.png?v=1717125492",
        name: "Kids Jeans",
        price: 29.99,
        badgeText: "NEW!",
    },
    {
        id: 5,
        imageUrl:
            "https://images.squarespace-cdn.com/content/v1/5b30f70acc8fedb924b39988/1573221875209-GLVI022OP554CTV6241U/SS3011.jpg",
        name: "Kids Jeans",
        price: 69.99,
        badgeText: "",
    },
];
const categoryPlaceholders = [
    {
        badgeText: "INFANTS",
        imageSrc:
            "https://static.zara.net/assets/public/1f8c/703e/2da54cd4b1d2/8697e48c8a54/06224584251-p/06224584251-p.jpg?ts=1748531191850&w=352&f=auto",
    },
    {
        badgeText: "GIRLS",
        imageSrc:
            "https://static.zara.net/assets/public/0f3d/a7ee/556a44b7a91d/adaff394c8fb/04424711756-p/04424711756-p.jpg?ts=1748330388835&w=560&f=auto",
    },
    {
        badgeText: "BOYS",
        imageSrc:
            "https://static.zara.net/assets/public/1339/ebec/65a740fe8647/51c9fcc6a0f5/04110665712-p/04110665712-p.jpg?ts=1743523901675&w=352&f=auto",
    },
];
const SampleGrid = ({marginTop}) => (
    <div style={sampleGridStyle(marginTop)}>
        {sampleItems.map((item) => (
            <Card
                key={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                badgeText={item.badgeText}
            />
        ))}
    </div>
);

function App() {
    const handleClick = () => {
        console.log("Button clicked!");
    };

    return (
        <>
            {/* Top-background */}
            <div className="top-background"/>

            {/* Blob overlays, mapped from blobSources */}
            {blobSources.map((src, idx) => (
                <img
                    key={idx}
                    src={src}
                    alt={`Floating Blob ${idx + 1}`}
                    className={`svg-overlay${idx + 1}`}
                />
            ))}

            <div>
                <CloudNavbar/>

                {/* Hero / Main headline */}
                <div className="app">
                    <motion.h1
                        initial={{y: -100, opacity: 0}}
                        animate={{y: 100, opacity: 1}}
                        transition={{type: "spring", stiffness: 70}}
                        className="app-heading"
                    >
                        EVERY CHILD <Shape type="spike"/> IS UNIQUE{" "}
                        <Shape type="circle"/> AND <br/>
                        DESERVES TO EXPRESS THEIR <br/> INDIVIDUALITY THROUGH{" "}
                        <Shape type="star"/> FASHION
                    </motion.h1>
                </div>

                <ParallaxScene/>
                <CloudLine/>

                {/* Kids Carousel */}
                <div className="kids-carousel-container">
                    <KidsCarousel/>
                </div>

                {/* “SIGNATURE STYLES” Title */}
                <div style={signatureTitleStyle}>
                    <h1 style={signatureTitleH1Style}>SIGNATURE STYLES</h1>
                </div>

                {/* Blue Circle behind */}
                <div style={{marginTop: "-15rem"}}>
                    <BlueCircle diameter={2100}/>
                </div>

                {/* Go Shopping Button */}
                <div style={buttonWrapperStyle}>
                    <GoShoppingButton
                        bgColor="#ebff00"
                        fontColor="#2a4d14"
                        onClick={handleClick}
                    >
                        Go Shopping
                    </GoShoppingButton>
                </div>

                {/* Sample Item Grids (3 times, with different marginTop) */}
                <SampleGrid marginTop="-100rem"/>
                <SampleGrid marginTop="-4rem"/>
                <SampleGrid marginTop="-4rem"/>

                {/* Shop By Category */}
                <div className="app-container">
                    <h2
                        style={{
                            color: "white",
                            textAlign: "center",
                            margin: "5rem 0",
                            fontFamily: "sans-serif",
                        }}
                    >
                        SHOP BY CATEGORY
                    </h2>
                    <div className="card-row">
                        {categoryPlaceholders.map((cat, idx) => (
                            <ProductCard
                                key={idx}
                                badgeText={cat.badgeText}
                                imageSrc={cat.imageSrc}
                                onClick={() => alert(`${cat.badgeText} clicked`)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Thank You / Footer Hero */}
            <div className="app">
                <motion.h1
                    initial={{y: -100, opacity: 0}}
                    animate={{y: 100, opacity: 1}}
                    transition={{type: "spring", stiffness: 70}}
                    className="app-heading"
                >
                    THANKS FOR CHOOSING <Shape type="spike"/>
                    <br/> KIKO ROMANIA <Shape type="circle"/>
                    <br/>
                    <Shape type="star"/> WE LOVE KIDS OF ANY SHAPE! <br/>
                </motion.h1>
            </div>

            {/* Footer */}
            <div className="footer-app">
                <Footer/>
            </div>
        </>
    );
}

export default App;
