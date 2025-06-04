import React, {useEffect, useMemo, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import './KidsCarousel.scss';

// ─── 1) List of photo URLs ──────────────────────────────────────────────────────
// (Swap these out for your own hosted/CDN URLs if you like.)
export const PhotoEnum = {
    KID_ONE:
        'https://images.pexels.com/photos/13790579/pexels-photo-13790579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    KID_TWO:
        'https://images.pexels.com/photos/26621365/pexels-photo-26621365/free-photo-of-little-boy-in-black-sweater-sitting-on-floor-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    KID_THREE:
        'https://images.pexels.com/photos/28456646/pexels-photo-28456646/free-photo-of-charming-child-in-casual-outfit-studio-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    KID_FOUR:
        'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    KID_FIVE:
        'https://images.pexels.com/photos/7086369/pexels-photo-7086369.jpeg?auto=compress&cs=tinysrgb&w=600',
};
const photos = Object.values(PhotoEnum);

// ─── 2) Utility: random integer between min and max inclusive ────────────────────
const randomInRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

// ─── 3) Build one “config” per photo (URL + random vertical offset + zIndex) ─────
const usePhotoConfigs = () => {
    return useMemo(
        () =>
            photos.map((url) => {
                // Container is 300 px tall; each image is 150 px high → available vertical range is [0, 150].
                const topOffset = randomInRange(0, 150);
                // Random z-index so they can overlap
                const zIndex = randomInRange(1, 5);
                return {url, topOffset, zIndex};
            }),
        []
    );
};

// ─── 4) The Carousel Component ───────────────────────────────────────────────────
const KidsCarousel = () => {
    const configs = usePhotoConfigs();
    // Duplicate the array: “set A” then “set A” again
    const doubled = [...configs, ...configs];

    // Ref to measure the width of exactly “one set” (i.e. configs.length items)
    const measureRef = useRef(null);
    const [setWidth, setSetWidth] = useState(0);

    useEffect(() => {
        if (measureRef.current) {
            // measureRef.current.offsetWidth is actually the width of the entire doubled set,
            // because we’ll attach the ref to a wrapper around “all items”. To get half of that:
            setSetWidth(measureRef.current.offsetWidth / 5);
        }
    }, []);

    // If setWidth is 0 (i.e. before measuring), we won’t animate.
    // Once setWidth is known, animate x from 0 → −setWidth in a loop.
    const animationProps =
        setWidth > 0
            ? {
                initial: {x: 0},
                animate: {x: -setWidth},
                transition: {
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'linear',
                        duration: 100, // ← 20 seconds per full cycle; tweak to speed up/slow down
                    },
                },
            }
            : {};

    return (
        <div className="carousel-viewport">
            <motion.div className="carousel-track" {...animationProps}>
                {/*
          Attach the ref to a wrapper DIV that includes exactly two copies of configs.
          offsetWidth on this wrapper is “width of set A + width of set A = 2 * setWidth.”
        */}
                <div className="carousel-items" ref={measureRef}>
                    {doubled.map((cfg, idx) => (
                        <div
                            key={idx}
                            className="carousel-item"
                            style={{
                                top: `${cfg.topOffset}px`,
                                zIndex: cfg.zIndex,
                            }}
                        >
                            <img
                                src={cfg.url}
                                alt={`kid-${idx % configs.length}`}
                                className="carousel-image"
                            />
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default KidsCarousel;
