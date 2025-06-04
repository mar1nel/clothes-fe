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

import blobnew from "./components/assets/svgs/Group.svg"
import blob2 from "./components/assets/svgs/Misc_01.svg"
import blob3 from "./components/assets/svgs/Misc_02.svg"
import blob4 from "./components/assets/svgs/Highlight_05.svg"
import blob5 from "./components/assets/svgs/Arrow_10.svg"
import blob6 from "./components/assets/svgs/Underline_07.svg"
import blob7 from "./components/assets/svgs/Highlight_08.svg"
import blob8 from "./components/assets/svgs/Highlight_11.svg"
import blob9 from "./components/assets/svgs/Misc_03.svg"
import blob10 from "./components/assets/svgs/Arrow_05.svg"

const sampleItems = [
    {
        id: 1,
        imageUrl:
            'https://m.media-amazon.com/images/I/61S454SgKuL.jpg',
        name: 'Kids T-Shirt',
        price: 19.99,
        badgeText: 'NEW!',
    },
    {
        id: 2,
        imageUrl:
            'https://ih1.redbubble.net/image.208025150.3864/ra,kids_tee,x750,192033:321fc38aa7,front-pad,600x600,f8f8f8.u3.jpg',
        name: 'Little Jacket',
        price: 39.99,
        badgeText: '30% OFF',
    },
    {
        id: 3,
        imageUrl:
            'https://maysharp.us/image/catalog/demo/Product%20Other/05.jpg',
        name: 'Sneakers',
        price: 49.99,
        badgeText: '', // no badge
    },
    {
        id: 4,
        imageUrl:
            'https://transfigureprintco.com/cdn/shop/files/ptkregshirt.png?v=1717125492',
        name: 'Kids Jeans',
        price: 29.99,
        badgeText: 'NEW!',
    }, {
        id: 5,
        imageUrl:
            'https://images.squarespace-cdn.com/content/v1/5b30f70acc8fedb924b39988/1573221875209-GLVI022OP554CTV6241U/SS3011.jpg',
        name: 'Kids Jeans',
        price: 69.99,
        // badgeText: 'NEW!',
    },
];

function App() {

    const handleClick = () => {
        console.log('Button clicked!');
    };

    const placeholder1 = 'https://static.zara.net/assets/public/1f8c/703e/2da54cd4b1d2/8697e48c8a54/06224584251-p/06224584251-p.jpg?ts=1748531191850&w=352&f=auto';
    const placeholder2 = 'https://static.zara.net/assets/public/0f3d/a7ee/556a44b7a91d/adaff394c8fb/04424711756-p/04424711756-p.jpg?ts=1748330388835&w=560&f=auto';
    const placeholder3 = 'https://static.zara.net/assets/public/1339/ebec/65a740fe8647/51c9fcc6a0f5/04110665712-p/04110665712-p.jpg?ts=1743523901675&w=352&f=auto';

    return (
        <>
            <div className="top-background"/>
            <img src={blobnew} alt="Floating Blob" className="svg-overlay1"/>
            <img src={blob2} alt="Floating Blob" className="svg-overlay2"/>
            <img src={blob3} alt="Floating Blob" className="svg-overlay3"/>
            <img src={blob4} alt="Floating Blob" className="svg-overlay4"/>
            <img src={blob5} alt="Floating Blob" className="svg-overlay5"/>
            <img src={blob6} alt="Floating Blob" className="svg-overlay6"/>
            <img src={blob7} alt="Floating Blob" className="svg-overlay7"/>
            <img src={blob8} alt="Floating Blob" className="svg-overlay8"/>
            <img src={blob9} alt="Floating Blob" className="svg-overlay9"/>
            <img src={blob10} alt="Floating Blob" className="svg-overlay10"/>

            <div>
                <CloudNavbar/>

                <div className="app">
                    <motion.h1
                        initial={{y: -100, opacity: 0}}
                        animate={{y: 100, opacity: 1}}
                        transition={{type: "spring", stiffness: 70}}
                    >
                        EVERY CHILD <Shape type="spike"/> IS UNIQUE <Shape type="circle"/>{" "}
                        AND <br/> DESERVES TO EXPRESS THEIR <br/> INDIVIDUALITY THROUGH{" "}
                        <Shape type="star"/> FASHION
                    </motion.h1>
                </div>

                <ParallaxScene/>
                <CloudLine/>

                <div className="kids-carousel-container">
                    <KidsCarousel/>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        top: '225%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'black',
                        textAlign: 'center',
                    }}
                >
                    <h1 style={{fontSize: '4rem', margin: 0}}>SIGNATURE STYLES</h1>
                </div>


                <div style={{marginTop: "-15rem"}}>
                    <BlueCircle diameter={2100}/>
                </div>


                <div style={{
                    display: 'flex',
                    position: "absolute",
                    justifyContent: 'center',
                    marginTop: '-110rem',
                    marginLeft: '50rem'
                }}>
                    <GoShoppingButton bgColor="#ebff00"
                                      fontColor="#2a4d14" onClick={handleClick}>
                        Go Shopping
                    </GoShoppingButton>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '36px',
                        padding: '56px',
                        marginTop: '-100rem',
                        justifyContent: 'center',
                    }}
                >
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
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '36px',
                        padding: '56px',
                        marginTop: '-4rem',
                        justifyContent: 'center',
                    }}
                >
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
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '36px',
                        padding: '56px',
                        marginTop: '-4rem',
                        justifyContent: 'center',
                    }}
                >
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

                <div className="app-container">
                    <h2 style={{color: "white", textAlign: 'center', margin: '5rem 0', fontFamily: 'sans-serif'}}>
                        SHOP BY CATEGORY
                    </h2>

                    <div className="card-row">
                        <ProductCard
                            badgeText="INFANTS"
                            imageSrc={placeholder1}
                            // buttonText="Shop Sale"
                            onClick={() => alert('Shop Sale clicked')}
                        />
                        <ProductCard
                            badgeText="GIRLS"
                            imageSrc={placeholder2}
                            // buttonText="Shop Girl"
                            onClick={() => alert('Shop Girl clicked')}
                        />
                        <ProductCard
                            badgeText="BOYS"
                            imageSrc={placeholder3}
                            // buttonText="Shop Boy"
                            onClick={() => alert('Shop Boy clicked')}
                        />
                    </div>
                </div>
            </div>

            <div className="app">
                <motion.h1
                    initial={{y: -100, opacity: 0}}
                    animate={{y: 100, opacity: 1}}
                    transition={{type: "spring", stiffness: 70}}
                >
                    THANKS FOR CHOOSING <Shape type="spike"/><br/> KIKO ROMANIA <Shape type="circle"/><br/>
                    <Shape type="star"/> WE LOVE KIDS OF ANY SHAPE! <br/>
                </motion.h1>
            </div>

            <div className="footer-app"><Footer/></div>
        </>
    );
}

export default App;
