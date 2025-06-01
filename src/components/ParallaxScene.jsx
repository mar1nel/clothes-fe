import React, {useRef} from 'react';
import {motion, useMotionValue, useScroll, useTransform} from 'framer-motion';
import './ParallaxScene.scss';

import star from './assets/star.png';
import zigzag from './assets/zigzag.png';
import circle from './assets/green-circle.png';
import arch from './assets/red-arch.png';
import kid from './assets/kid.png';

const ParallaxScene = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const containerRef = useRef(null);

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Individual scroll parallax for vertical bounce effect
    const scrollArchY = useTransform(scrollYProgress, [0, 1], [0, 40]);
    const scrollCircleY = useTransform(scrollYProgress, [0, 1], [0, -30]);
    const scrollZigzagY = useTransform(scrollYProgress, [0, 1], [0, 20]);
    const scrollStarY = useTransform(scrollYProgress, [0, 1], [0, -25]);
    const scrollKidY = useTransform(scrollYProgress, [0, 1], [0, 10]);

    const handleMouseMove = (e) => {
        const {innerWidth, innerHeight} = window;
        const x = e.clientX - innerWidth / 2;
        const y = e.clientY - innerHeight / 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    const archStyle = {
        x: useTransform(mouseX, (x) => x * 0.01),
        y: useTransform(mouseY, (y) => y * 0.01),
        translateY: scrollArchY
    };
    const circleStyle = {
        x: useTransform(mouseX, (x) => x * 0.02),
        y: useTransform(mouseY, (y) => y * 0.015),
        translateY: scrollCircleY
    };
    const zigzagStyle = {
        x: useTransform(mouseX, (x) => x * -0.015),
        y: useTransform(mouseY, (y) => y * 0.08),
        translateY: scrollZigzagY
    };
    const starStyle = {
        x: useTransform(mouseX, (x) => x * -0.08),
        y: useTransform(mouseY, (y) => y * -0.015),
        translateY: scrollStarY
    };
    const kidStyle = {
        x: useTransform(mouseX, (x) => x * 0.008),
        y: useTransform(mouseY, (y) => y * 0.008),
        translateY: scrollKidY
    };

    return (
        <div
            ref={containerRef}
            className="parallax-container"
            onMouseMove={handleMouseMove}
        >
            <motion.img
                src={arch}
                className="shape arch"
                alt="arch"
                style={archStyle}
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
            />
            <motion.img
                src={circle}
                className="shape circle"
                alt="circle"
                style={circleStyle}
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.9}}
            />
            <motion.img
                src={zigzag}
                className="shape zigzag"
                alt="zigzag"
                style={zigzagStyle}
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1}}
            />
            <motion.img
                src={star}
                className="shape star"
                alt="star"
                style={starStyle}
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1.1}}
            />
            <motion.img
                src={kid}
                className="kid"
                alt="kid"
                style={kidStyle}
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1}}
            />
            <div className="logo">kikø</div>
        </div>
    );
};

export default ParallaxScene;
